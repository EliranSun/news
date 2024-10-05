import { useCallback, useState } from "react";
import { Buttons } from "./Buttons.jsx";
import { Button } from "./Button.jsx";

const API_URL = "https://walak.vercel.app/api/rss";

export const FeedItem = ({ item, onRead }) => {
	const [queryResult, setQueryResult] = useState(null);
	const [question, setQuestion] = useState("");

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
                ${item.language.includes("he") ? "text-right" : "text-left"}
                max-w-[700px] my-4 flex gap-4 justify-between
                w-full border-b border-gray-200 pb-8
            `}>
			<div className="w-full flex flex-col justify-between">
				<div>
					<h1
						dir={item.language === "he" ? "rtl" : "ltr"}
						className="text-lg h-32 text-ellipsis overflow-hidden font-bold">
						{item.title}
					</h1>
					<p
						dir={item.language === "he" ? "rtl" : "ltr"}
						className="text-sm h-20 text-ellipsis overflow-hidden mb-3">
						{queryResult || item.description}
					</p>
				</div>
				<Buttons
					item={item}
					onRead={onRead}
					onQueryClick={() => onQueryClick(question)}
				/>
			</div>
		</div>
	);
};
