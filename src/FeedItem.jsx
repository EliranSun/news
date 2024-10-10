import { useCallback, useState } from "react";
import { Buttons } from "./Buttons.jsx";
import { Button } from "./Button.jsx";

const API_URL = "https://walak.vercel.app/api/rss";

export const FeedItem = ({ item, onRead, onClick }) => {
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
			onClick={onClick}
			className={`
                ${item.language.includes("he") ? "text-right" : "text-left"}
                max-w-[700px] my-5 flex gap-4 justify-between
                w-full
            `}>
			<div className="w-full flex flex-col justify-between">
				<div>
					<h1
						dir={item.language === "he" ? "rtl" : "ltr"}
						className="text-lg h-18 font-bold mb-3">
						{item.title}
					</h1>
					<p
						dir={item.language === "he" ? "rtl" : "ltr"}
						className="text-sm h-16 text-ellipsis overflow-y-auto mb-3">
						{queryResult || item.description}
					</p>
				</div>
				<Buttons
					item={item}
					onQueryClick={() => onQueryClick(question)}
				/>
			</div>
		</div>
	);
};
