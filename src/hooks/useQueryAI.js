import { useCallback, useRef, useState } from "react";

const API_URL = "https://walak.vercel.app/api/rss";

/**
 * status: "idle" | "loading" | "error"
 * result: { answer, count, title } | null
 */
export const useQueryAI = () => {
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState("idle");
    const requestRef = useRef(0);

    const ask = useCallback(async (items = []) => {
        if (items.length === 0) return;

        const requestId = ++requestRef.current;
        setStatus("loading");
        setResult(null);

        const body = items.map((item) => ({
            question: item.title,
            link: item.link,
            title: item.title,
            description: item.description,
            source: item.feedName,
        }));

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`Brief request failed: ${res.status}`);
            const data = await res.json();
            if (requestId !== requestRef.current) return;
            if (!data?.answer) throw new Error("Brief came back empty");

            setResult({
                answer: data.answer,
                count: items.length,
                title: items.length === 1 ? items[0].title : null,
            });
            setStatus("idle");
        } catch (error) {
            console.error(error);
            if (requestId === requestRef.current) setStatus("error");
        }
    }, []);

    const clear = useCallback(() => {
        requestRef.current++;
        setResult(null);
        setStatus("idle");
    }, []);

    return { result, status, ask, clear };
};
