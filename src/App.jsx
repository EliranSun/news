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
		};

		fetchAndParseFeeds();
	}, []);

	console.log({ feeds });

	return (
		<div
			style={{
				// maxWidth: "700px",
				margin: "0 auto",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				gap: "4px",
			}}>
			{feeds.map((item, index) => (
				<div
					style={{ maxWidth: "700px" }}
					key={index}
					dir={item.language === "he" ? "rtl" : "ltr"}>
					<a href={item.link}>
						<h1>{item.title}</h1>
						<h2 dir="ltr">{item.diffMinutes} min ago</h2>
					</a>
				</div>
			))}
		</div>
	);
};

export default RssFeedComponent;
