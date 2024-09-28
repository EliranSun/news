import {useCallback, useEffect, useState} from "react";
import {XMLParser} from "fast-xml-parser";
import {getDiffTime, removeUnicode, sanitizeText} from "./utils.js";

export const useRssFeed = () => {
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

    return {feeds, setFeeds};
}