import { useState, useEffect } from "react";
import { useRssFeed } from "./hooks/useRssFeed.js";
import { View } from "./components/organisms/View.jsx";
import { ActionButtons } from "./components/molecules/ActionButtons.jsx";
import { PageNavigationHeader } from "./components/molecules/PageNavigationHeader.jsx";
import { useQueryAI } from "./hooks/useQueryAI.js";

const RssFeedComponent = () => {
	const [view, setView] = useState("feed");
	const [isSweepDataView, setIsSweepDataView] = useState(false);
	const { items, setFeeds, isLoading: isLoadingFeeds } = useRssFeed(view === "saved");
	const [scrolledItems, setScrolledItems] = useState([]);
	const { queryResult, onQueryClick, setQueryResult, isLoading: isLoadingAI, isError } = useQueryAI(items);

	useEffect(() => {
		const updateThemeColor = () => {
			const hour = new Date().getHours();
			const themeColor = hour >= 6 && hour < 18 ? "#FFFFFF" : "#000000"; // White during the day, black at night
			const metaThemeColor = document.querySelector("meta[name=theme-color]");
			if (metaThemeColor) {
				metaThemeColor.setAttribute("content", themeColor);
			} else {
				const newMetaThemeColor = document.createElement("meta");
				newMetaThemeColor.setAttribute("name", "theme-color");
				newMetaThemeColor.setAttribute("content", themeColor);
				document.head.appendChild(newMetaThemeColor);
			}
		};

		updateThemeColor();

		const intervalId = setInterval(updateThemeColor, 60 * 60 * 1000); // Update every hour

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, []);

	console.log({ itemsLength: items.length, scrolledItemsLength: scrolledItems.length });

	return (
		<section className="dark:bg-black">
			<PageNavigationHeader
				view={view}
				setView={setView}
			/>
			<View
				queryResult={queryResult}
				items={items}
				view={view}
				isLoadingFeeds={isLoadingFeeds}
				aiQueryStatus={{
					isLoading: isLoadingAI,
					isError,
				}}
				onItemsScroll={(itemLink) => {
					if (!scrolledItems.includes(itemLink)) {
						setScrolledItems(prev => [...prev, itemLink]);
					}
				}}
				onItemRead={(itemLink) => {
					setFeeds(items.filter((item) => item.link !== itemLink));
					setQueryResult(null);
				}}
			/>
			<ActionButtons
				contextualItems={items}
				unreadItemsCount={items.length - scrolledItems.length}
				setFeeds={setFeeds}
				setQueryResult={setQueryResult}
				isSweepDataView={isSweepDataView}
				setIsSweepDataView={setIsSweepDataView}
				onQueryClick={() => {
					if (view === "feeds") onQueryClick(items);
					else onQueryClick(items.slice(0, 1));
				}}
				aiQueryStatus={{
					isLoading: isLoadingAI,
					isError,
				}}
			/>
		</section>
	);
};

export default RssFeedComponent;
