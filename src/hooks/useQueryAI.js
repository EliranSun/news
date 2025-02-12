import { useCallback, useState } from "react";

const API_URL = "https://walak.vercel.app/api/rss";

export const useQueryAI = (items = []) => {
    const [queryResult, setQueryResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const onQueryClick = useCallback(async () => {
        setIsLoading(true);
        const body = items.map(item => {
            return {
                question: item.title,
                link: item.link,
                title: item.title,
                description: item.description,
                source: item.feedName,
            };
        });
        
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(body),
            });
            
            const data = await res.json();
    
            setIsLoading(false);
            setQueryResult(data.answer);
        } catch (error) {
            console.error(error);
            setIsError(true);

            setTimeout(() => setIsError(false), 8);
        }
    }, [items]);
    
    return { queryResult, onQueryClick, setQueryResult, isLoading, isError };
};
