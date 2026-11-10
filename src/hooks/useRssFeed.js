import { useCallback, useEffect, useRef, useState } from "react";
import { getDiffTime, isRead, removeUnicode, sanitizeText } from "../utils.js";

const API_URL = "https://walak.vercel.app/api/rss";
const REFRESH_MS = 5 * 60 * 1000;

const parseItems = (data) => {
    const items = [];
    const titles = new Set();
    const links = new Set();

    (Array.isArray(data) ? data : []).forEach((item) => {
        if (!item?.link || !item?.title) return;

        const title = removeUnicode(sanitizeText(item.title)).trim();
        if (!title || titles.has(title) || links.has(item.link) || isRead(item.link)) return;

        titles.add(title);
        links.add(item.link);
        items.push({
            title,
            link: item.link,
            description: removeUnicode(sanitizeText(item.description || "")).trim(),
            language: item.language || "",
            diff: getDiffTime(item.pubDate),
            feedName: item.feedName || "Unknown",
            date: item.pubDate,
        });
    });

    return items;
};

const refreshAges = (items) => items.map((item) => ({ ...item, diff: getDiffTime(item.date) }));

/**
 * status: "loading" (first load) | "ready" | "error" (first load failed)
 * pending: stories that arrived in a background refresh, held back so the
 * list does not shift under the reader until they ask for them.
 */
export const useRssFeed = () => {
    const [items, setItems] = useState([]);
    const [pending, setPending] = useState([]);
    const [status, setStatus] = useState("loading");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const itemsRef = useRef(items);
    const hasLoadedRef = useRef(false);
    itemsRef.current = items;

    const load = useCallback(async (mode = "background") => {
        const isFirstLoad = !hasLoadedRef.current;
        if (isFirstLoad) setStatus("loading");
        setIsRefreshing(true);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);
            const parsed = parseItems(await response.json());

            if (isFirstLoad) {
                setItems(parsed);
            } else {
                const known = new Set(itemsRef.current.map((item) => item.link));
                const knownTitles = new Set(itemsRef.current.map((item) => item.title));
                const fresh = parsed.filter((item) => !known.has(item.link) && !knownTitles.has(item.title));

                if (mode === "manual") {
                    setItems((prev) => [...refreshAges(prev), ...fresh]);
                    setPending([]);
                } else {
                    setItems(refreshAges);
                    setPending(fresh);
                }
            }

            hasLoadedRef.current = true;
            setStatus("ready");
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error fetching and parsing feeds:", error);
            if (isFirstLoad) setStatus("error");
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        load("initial");
        const interval = setInterval(() => load("background"), REFRESH_MS);
        return () => clearInterval(interval);
    }, [load]);

    const mergePending = useCallback(() => {
        setPending((fresh) => {
            if (fresh.length > 0) {
                setItems((prev) => {
                    const known = new Set(prev.map((item) => item.link));
                    return [...prev, ...fresh.filter((item) => !known.has(item.link))];
                });
            }
            return [];
        });
    }, []);

    const refresh = useCallback(() => load("manual"), [load]);

    return { items, setItems, pending, mergePending, status, isRefreshing, lastUpdated, refresh };
};
