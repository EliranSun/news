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

const LinkStyle = {
	width: "20px",
	height: "10px",
	// border: "1px solid black",
	backgroundColor: "#ededed",
	borderRadius: "4px",
	fontSize: "0.6rem",
	padding: "6px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function removeUnicode(text) {
	return text.replaceAll("&#8226;", "•").replaceAll("&bull;", "•");
}

function sanitizeText(text) {
	return text.replace(/<[^>]*>/g, "");
}

function isToday(date) {
	const diff = getDiffTime(date);
	if (diff.unit === "m") {
		return true;
	}

	if (diff.unit !== "d") {
		return diff.value < 5;
	}

	return false;
}

const Buttons = ({ item }) => {
	const [isRead, setIsRead] = useState(
		localStorage.getItem(item.link) === "read" || false
	);

	return (
		<div
			id={`buttons-${isRead ? "read" : "unread"}`}
			style={{
				display: "flex",
				gap: "8px",
				alignItems: "center",
				justifyContent: "end",
			}}>
			<h2
				style={LinkStyle}
				onClick={() => {
					setIsRead(true);
					localStorage.setItem(item.link, "read");
				}}>
				{isRead ? "☑️" : "☐"}
			</h2>
			<h2
				style={LinkStyle}
				dir="ltr">
				{item.diff.value}
				{item.diff.unit}
			</h2>
			<a
				style={LinkStyle}
				href={item.link}
				target="_blank"
				rel="noopener noreferrer">
				🔗
			</a>
		</div>
	);
};

const RssFeedComponent = () => {
	const [feeds, setFeeds] = useState([]);

	const fetchAndParseFeeds = useCallback(async () => {
		try {
			const parser = new XMLParser();
			const url = "https://walak.vercel.app/api/rss";
			const response = await fetch(url);
			const text = await response.text();
			const result = parser.parse(text);
			const items = [];
			const channels = [];

			result?.rss?.forEach((feed) => {
				channels.push(feed.channel.title);
				feed.channel.item.forEach((item) => {
					const isItemExist = items.some(
						(existingItem) => existingItem.title === item.title
					);

					if (!isItemExist && isToday(item.pubDate)) {
						items.push({
							title: removeUnicode(sanitizeText(item.title)),
							link: item.link,
							description: removeUnicode(sanitizeText(item.description)),
							language: feed.channel?.language,
							diff: getDiffTime(item.pubDate),
							date: item.pubDate,
						});
					}
				});
			});

			const sortedItems = items.sort(
				(a, b) => b.diff.diffTime - a.diff.diffTime
			);
			console.log({ channels, sortedItems });
			setFeeds(sortedItems);
		} catch (error) {
			console.error("Error fetching and parsing feeds:", error);
		}
	}, []);

	useEffect(() => {
		fetchAndParseFeeds();

		setInterval(() => {
			console.log("fetching feeds");
			fetchAndParseFeeds();
		}, 60 * 1000);
	}, [fetchAndParseFeeds]);

	useEffect(() => {
		const buttons = document.querySelectorAll("#buttons-read");
		if (buttons) {
			console.log(buttons);
			buttons.forEach((button) => {
				button.parentElement.style.display = "none";
			});
		}
	}, [feeds]);

	return (
		<section
			style={{
				padding: "20px",
			}}>
			<span
				style={{
					position: "fixed",
					top: "10px",
					left: "18px",
					color: "black",
					backgroundColor: "white",
					padding: "4px",
					borderRadius: "4px",
				}}>
				{new Date().toLocaleTimeString()}
			</span>
			<div
				style={{
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
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
						<h1 style={{ fontSize: "1.1rem" }}>{item.title}</h1>
						<p style={{ fontSize: "0.8rem" }}>{item.description}</p>
						<Buttons item={item} />
					</div>
				))}
			</div>
		</section>
	);
};

export default RssFeedComponent;
