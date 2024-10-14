import { useState, useEffect } from "react";
import { useRssFeed } from "./hooks/useRssFeed.js";
import { View } from "./components/organisms/View.jsx";
import { ActionButtons } from "./components/molecules/ActionButtons.jsx";
import { PageNavigationHeader } from "./components/molecules/PageNavigationHeader.jsx";
import { useQueryAI } from "./hooks/useQueryAI.js";

const RssFeedComponent = () => {
	const [isSavedView, setIsSavedView] = useState(false);
	const [isSweepDataView, setIsSweepDataView] = useState(false);
	const { items, setFeeds } = useRssFeed(isSavedView);
	const { queryResult, onQueryClick, setQueryResult } = useQueryAI(items);

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

	return (
		<section className="h-[100dvh] w-screen">
			<PageNavigationHeader
				isSavedView={isSavedView}
				setIsSavedView={setIsSavedView}
			/>
			<View
				queryResult={queryResult}
				items={items}
				isSavedView={isSavedView}
			/>
			<ActionButtons
				contextualItems={items}
				setFeeds={setFeeds}
				setQueryResult={setQueryResult}
				isSweepDataView={isSweepDataView}
				setIsSweepDataView={setIsSweepDataView}
				onQueryClick={onQueryClick}
			/>
		</section>
	);
};

export default RssFeedComponent;
