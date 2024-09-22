import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const RssFeedComponent = () => {
	const [feeds, setFeeds] = useState([]);

	useEffect(() => {
		const parser = new XMLParser();

		const fetchAndParseFeeds = async () => {
			try {
				const url = "https://walak.vercel.app/api/rss";
				const response = await fetch(url);
				const text = await response.text();
				const result = parser.parse(text);
				console.log({ result });

				const items = result?.rss?.channel?.item
					.map((item) => {
						const now = new Date();
						const date = new Date(item.pubDate);
						const diffTime = Math.abs(now - date);
						const diffMinutes = Math.ceil(diffTime / (1000 * 60));

						return {
							title: item.title,
							link: item.link,
							language: result?.rss?.channel?.language,
							diffMinutes,
							date: item.pubDate,
						};
					})
					.sort((a, b) => a.diffMinutes - b.diffMinutes);

				setFeeds(items);
			} catch (error) {
				console.error("Error fetching and parsing feeds:", error);
			}
		};

		fetchAndParseFeeds();
	}, []);

	console.log({ feeds });

	return (
		<div>
			{feeds.map((item, index) => (
				<div
					key={index}
					dir={item.language === "en" ? "ltr" : "rtl"}>
					<h1>{item.title}</h1>
					<h2 dir="ltr">{item.diffMinutes} min ago</h2>
				</div>
			))}
		</div>
	);
};

export default RssFeedComponent;
