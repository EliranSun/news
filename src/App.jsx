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
			const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const themeColor = isDarkMode ? "#000000" : "#FFFFFF";
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

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const themeChangeHandler = () => updateThemeColor();
		mediaQuery.addListener(themeChangeHandler);

		return () => {
			mediaQuery.removeListener(themeChangeHandler); // Cleanup listener on component unmount
		};
	}, []);

	useEffect(() => {
		setScrolledItems(0);
	}, [items]);

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
				unreadItemsCount={items.length - scrolledItems.length <= 0 ? 0 : items.length - scrolledItems.length}
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
