import { useCallback, useState } from "react";

const API_URL = "https://walak.vercel.app/api/rss";

export const useQueryAI = (items = []) => {
    const [queryResult, setQueryResult] = useState("");
    
    const onQueryClick = useCallback(async () => {
        const body = {
            question: items[0].title,
            link: items[0].link,
            title: items[0].title,
        };
        
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(body),
        });
        
        const data = await res.json();
        setQueryResult(data.answer);
    }, [items]);
    
    return { queryResult, onQueryClick, setQueryResult };
};
