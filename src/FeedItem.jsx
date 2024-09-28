import { useCallback, useState } from "react";
import {Buttons} from "./Buttons.jsx";

const API_URL = "https://walak.vercel.app/api/rss";

export const FeedItem = ({ item, onRead }) => {
    const [queryResult, setQueryResult] = useState(null);

    const onQueryClick = useCallback(async (question) => {
        const body = {
            question: question,
            link: item.link,
            title: item.title,
        };

        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setQueryResult(data.answer);
    }, []);

    return (
        <div
            className={`
                ${item.language === "he" ? "text-right" : "text-left"}
                max-w-[700px] my-4
                w-full
            `}>
            <h1
                dir={item.language === "he" ? "rtl" : "ltr"}
                className="text-lg font-bold">{item.title}</h1>
            <p
                dir={item.language === "he" ? "rtl" : "ltr"}
                className="text-sm mb-3">
                    {queryResult || item.description}
                    </p>
            <Buttons
                item={item}
                onRead={onRead}
                onQueryClick={onQueryClick}
            />
        </div>
    );
}