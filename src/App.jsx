import { useEffect, useState, useCallback } from "react";
import { XMLParser } from "fast-xml-parser";

const RssFeedComponent = () => {
	const [feeds, setFeeds] = useState([]);

	const fetchAndParseFeeds = useCallback(async () => {
		try {
			const parser = new XMLParser();
			const url = `https://walak.vercel.app/api/rss?time=${new Date().getTime()}`;
			const response = await fetch(url);
			const text = await response.text();
			const result = parser.parse(text);
			console.log({ result });
			const items = [];

			result?.rss?.forEach((feed) => {
				feed.channel.item.forEach((item) => {
					const now = new Date();
					const date = new Date(item.pubDate);
					const diffTime = Math.abs(now - date);
					const diffMinutes = Math.ceil(diffTime / (1000 * 60));

					items.push({
						title: item.title,
						link: item.link,
						language: feed.channel?.language,
						diffMinutes,
						date: item.pubDate,
					});
				});
			});

			setFeeds(items.sort((a, b) => a.diffMinutes - b.diffMinutes));
		} catch (error) {
			console.error("Error fetching and parsing feeds:", error);
		}
	}, []);

	useEffect(() => {
		fetchAndParseFeeds();

		setInterval(() => {
			console.log("fetching feeds");
			fetchAndParseFeeds();
		}, 1000 * 10);
	}, [fetchAndParseFeeds]);

	return (
		<div
			style={{
				margin: "0 auto",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				gap: "4px",
			}}>
			{new Date().toLocaleTimeString()}
			{feeds.map((item, index) => (
				<div
					style={{ maxWidth: "700px", padding: "0 16px" }}
					key={index}
					dir={item.language === "he" ? "rtl" : "ltr"}>
					<a href={item.link}>
						<h1 style={{ fontSize: "1.5rem" }}>{item.title}</h1>
						<h2
							style={{ fontSize: "0.9rem" }}
							dir="ltr">
							{item.diffMinutes} min ago
						</h2>
					</a>
				</div>
			))}
		</div>
	);
};

export default RssFeedComponent;
