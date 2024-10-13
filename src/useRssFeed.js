import { useCallback, useEffect, useState } from "react";
import { getDiffTime, removeUnicode, sanitizeText } from "./utils.js";

export const useRssFeed = () => {
	const [feeds, setFeeds] = useState([]);

	const fetchAndParseFeeds = useCallback(async () => {
		try {
			const url = "https://walak.vercel.app/api/rss";
			const response = await fetch(url);
			const data = (await response.json()) || [];
			const items = [];

			data.forEach((item) => {
				const isRead = localStorage.getItem(item.link) === "read";
				const isSaved = localStorage.getItem(item.link) === "saved";
				const isItemExist = items.some(
					(existingItem) => existingItem.title === item.title
				);

				const props = {
					title: removeUnicode(sanitizeText(item.title)),
					link: item.link,
					description: removeUnicode(sanitizeText(item.description)),
					language: item.language,
					diff: getDiffTime(item.pubDate),
					date: item.pubDate,
					isRead,
					isSaved,
				};

				if (!isItemExist && !isRead) {
					items.push(props);
				}
			});

			const sortedItems = items.sort(
				(a, b) => b.diff.diffTime - a.diff.diffTime
			);
			console.log({ sortedItems });
			setFeeds(sortedItems);
		} catch (error) {
			console.error("Error fetching and parsing feeds:", error);
		}
	}, [isSavedView]);

	useEffect(() => {
		fetchAndParseFeeds();

		setInterval(() => {
			console.log("fetching feeds");
			fetchAndParseFeeds();
		}, 5 * 60 * 1000);
	}, [fetchAndParseFeeds]);

	return { feeds, setFeeds };
};
