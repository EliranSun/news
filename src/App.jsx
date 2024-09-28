import { useEffect, useState, useCallback } from "react";
import { XMLParser } from "fast-xml-parser";
import ClearFeedUpToDate from "./ClearFeedUpToDate";

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
	height: "20px",
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

const Buttons = ({ item, onRead }) => {
	const [isRead, setIsRead] = useState(
		localStorage.getItem(item.link) === "read" || false
	);

	return (
		<div
			id={`buttons-${isRead ? "read" : "unread"}`}
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gap: "4px",
				alignItems: "center",
				justifyContent: "end",
			}}>
			<h2
				style={LinkStyle}
				dir="ltr">
				{item.diff.value}
				{item.diff.unit}
			</h2>
			<a
				style={LinkStyle}
				href={item.link}
				rel="noopener noreferrer">
				🔗
			</a>
			<h2
				style={LinkStyle}
				onClick={() => {
					setIsRead(true);
					onRead();
					localStorage.setItem(item.link, "read");
				}}>
				{isRead ? "☑️" : "☐"}
			</h2>
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
					const isRead = localStorage.getItem(item.link) === "read";
					const isItemExist = items.some(
						(existingItem) => existingItem.title === item.title
					);

					if (!isItemExist && !isRead) {
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

	// useEffect(() => {
	// 	const buttons = document.querySelectorAll("#buttons-read");
	// 	if (buttons) {
	// 		console.log(buttons);
	// 		buttons.forEach((button) => {
	// 			button.parentElement.style.display = "none";
	// 		});
	// 	}
	// }, [feeds]);

	if (feeds.length === 0) {
		return (
			<img
				alt="loading"
				src="https://cdn.dribbble.com/users/4072391/screenshots/19660250/media/d31593551e019ea191d9cd69cc542792.gif"
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
					display: "block",
					margin: "0 auto",
				}}
			/>
		);
	}

	return (
		<section
			style={{
				padding: "20px",
				height: "100dvh",
			}}>
			<ClearFeedUpToDate items={feeds} />
			<div
				style={{
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					width: "100%",
					gap: "4px",
					paddingTop: "5px",
					boxSizing: "border-box",
				}}>
				{feeds.map((item, index) => (
					<div
						key={item.link + item.title}
						style={{
							textAlign: item.language === "he" ? "right" : "left",
							maxWidth: "700px",
							width: "100%",
						}}>
						<h1 
													dir={item.language === "he" ? "rtl" : "ltr"}
							style={{ fontSize: "1.1rem" }}>{item.title}</h1>
						<p 
													dir={item.language === "he" ? "rtl" : "ltr"}
							style={{ fontSize: "0.8rem" }}>{item.description}</p>
						<Buttons item={item} onRead={() => setFeeds(feeds.filter(foo => foo.link !== item.link))}/>
					</div>
				))}
			</div>
		</section>
	);
};

export default RssFeedComponent;
