import { useCallback, useEffect, useMemo, useState } from "react";
import { getDiffTime, removeUnicode, sanitizeText } from "../utils.js";
import axios from "axios";

// TODO: Client side fetch using axios for 
// "https://www.geektime.co.il/feed/",
// "https://www.geektime.co.il/tag/vmware/feed/"

export const useRssFeed = (isSavedView) => {
    const [feeds, setFeeds] = useState([]);

    const fetchAndParseFeeds = useCallback(async () => {
        try {
            const url = "https://walak.vercel.app/api/rss";
            const response = await fetch(url);
            const data = (await response.json()) || [];
            const items = [];


            try {
                const geekTimeFeed = await axios.get("https://www.geektime.co.il/feed/", {
                    headers: {
                        "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
                        "referrer-policy": "no-referrer",
                        "Cache-Control": "max-age=14400",
                        "Content-Encoding": "br",
                        "cf-cache-status": "DYNAMIC",
                        // "Report-To": "{\"endpoints\":[{\"url\":\"https://a.nel.cloudflare.com/report/v3?s=...\"}],\"group\":\"cf-nel\",\"max_age\":604800}",
                        // "NEL": "{\"success_fraction\":0,\"report_to\":\"cf-nel\",\"max_age\":604800}",
                        // "Server": "cloudflare",
                        // "CF-RAY": "XXXXXXXXXXXXX-YYY",
                        // "Date": "Fri, 18 Oct 2024 10:24:31 GMT",
                        "Content-Type": "application/rss+xml; charset=UTF-8",
                        Accept: "application/rss+xml",
                        // "Transfer-Encoding": "chunked",
                        // "Connection": "keep-alive",
                        // "vary": "Accept-Encoding",
                        // "last-modified": "Fri, 18 Oct 2024 10:24:31 GMT",
                        // "etag": "\"e123456789abcdef\"",
                        // "link": "<https://example.com>; rel=\"preload\"",
                        // "x-cache-status": "HIT",
                        // "x-xss-protection": "1; mode=block",
                        // "x-content-type-options": "nosniff",
                        // "x-frame-options": "SAMEORIGIN"
                    },
                });
                console.log({ geekTimeFeed });
            } catch (error) {
                console.error("Error fetching and parsing feeds:", error);
            }

            data.forEach((item) => {
                const isRead = localStorage.getItem(item.link) === "read";
                const isSaved = localStorage.getItem(item.link) === "saved";
                const isItemExist = items.some(
                    (existingItem) => existingItem.title === item.title
                );

                const props = {
                    title: removeUnicode(sanitizeText(item.title)),
                    link: item.link,
                    description: removeUnicode(sanitizeText(item.description)),
                    language: item.language,
                    diff: getDiffTime(item.pubDate),
                    feedName: item.feedName,
                    date: item.pubDate,
                    isRead,
                    isSaved,
                };

                if (!isItemExist && !isRead) {
                    items.push(props);
                }
            });

            const sortedItems = items.sort(
                (a, b) => b.diff.diffTime - a.diff.diffTime
            );
            console.log({ sortedItems });
            setFeeds(sortedItems);
        } catch (error) {
            console.error("Error fetching and parsing feeds:", error);
        }
    }, [isSavedView]);

    useEffect(() => {
        fetchAndParseFeeds();

        setInterval(() => {
            console.log("fetching feeds");
            fetchAndParseFeeds();
        }, 5 * 60 * 1000);
    }, [fetchAndParseFeeds]);


    const savedItems = useMemo(() => feeds.filter(feed => feed.isSaved), [feeds]);
    const nonSavedItems = useMemo(() => feeds.filter(feed => !feed.isSaved), [feeds]);
    const contextualItems = useMemo(() => {
        if (isSavedView) {
            return savedItems;
        }
        return nonSavedItems;
    }, [isSavedView, savedItems, nonSavedItems]);

    return { items: contextualItems, setFeeds };
};
