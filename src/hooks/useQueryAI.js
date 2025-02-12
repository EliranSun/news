import { useCallback, useState } from "react";

const API_URL = "https://walak.vercel.app/api/rss";

export const useQueryAI = (items = []) => {
    const [queryResult, setQueryResult] = useState("");
    
    const onQueryClick = useCallback(async () => {
        const body = items.map(item => {
            return {
                question: item.title,
                link: item.link,
                title: item.title,
            };
        });
        
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(body),
        });
        
        const data = await res.json();
        setQueryResult(data.answer);
    }, [items]);
    
    return { queryResult, onQueryClick, setQueryResult };
};
