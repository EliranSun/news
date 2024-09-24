import { useEffect, useState, useCallback } from "react";
import { XMLParser } from "fast-xml-parser";

const getDiffTime = (time) => {
	// return diff in minutes, hours, days
	const now = new Date();
	const date = new Date(time);
	const diffTime = Math.abs(now - date);
	const diffMinutes = Math.round(diffTime / (1000 * 60));
	const diffHours = Math.round(diffTime / (1000 * 60 * 60));
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

	if (diffMinutes < 60) {
		return { value: diffMinutes, unit: "m", diffTime };
	}

	if (diffHours < 24) {
		return { value: diffHours, unit: "h", diffTime };
	}

	return { value: diffDays, unit: "d", diffTime };
};

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
					items.push({
						title: item.title,
						link: item.link,
						description: item.description,
						language: feed.channel?.language,
						diff: getDiffTime(item.pubDate),
						date: item.pubDate,
					});
				});
			});

			setFeeds(items.sort((a, b) => a.diff.diffTime - b.diff.diffTime));
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
		<section style={{
			padding: "20px"
		}}>
			<span style={{ position: "fixed", top: "10px", left: "18px", backgroundColor: "white", padding: "4px", borderRadius: "4px" }}>{new Date().toLocaleTimeString()}</span>
			<div
				style={{
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					// justifyContent: "center",
					// alignItems: "center",
					width: "100%",
					gap: "4px",
					paddingTop: "20px",
					boxSizing: "border-box",
				}}>
				{feeds.map((item, index) => (
					<div
						style={{
							textAlign: item.language === "he" ? "right" : "left",
							maxWidth: "700px",
						}}
						key={item.link + item.title}
						dir={item.language === "he" ? "rtl" : "ltr"}>
						<a href={item.link}>
							<h1 style={{ fontSize: "1.5rem" }}>{item.title}</h1>
							<p>{item.description}</p>
							<h2
								style={{ fontSize: "0.9rem" }}
								dir="ltr">
								{item.diff.value}{item.diff.unit}
							</h2>
						</a>
					</div>
				))}
			</div>
		</section>
	);
};

export default RssFeedComponent;
