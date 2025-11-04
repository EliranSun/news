import { useState, useEffect } from "react";
import { useRssFeed } from "./hooks/useRssFeed.js";
import { View } from "./components/organisms/View.jsx";
import { ActionButtons } from "./components/molecules/ActionButtons.jsx";
import { PageNavigationHeader } from "./components/molecules/PageNavigationHeader.jsx";
import { useQueryAI } from "./hooks/useQueryAI.js";
import PhysicsDemo from "./features/SquareCalendar/organism/PhysicsDemo.jsx";

const RssFeedComponent = () => {
	const [view, setView] = useState("feed");
	const [isSweepDataView, setIsSweepDataView] = useState(false);
	const { items, setFeeds, isLoading: isLoadingFeeds } = useRssFeed(view === "saved");
	const [scrolledItems, setScrolledItems] = useState([]);
	const {
		queryResult,
		onQueryClick,
		setQueryResult,
		isLoading: isLoadingAI,
		isError
	} = useQueryAI(items);

	useEffect(() => {
		setScrolledItems([]);
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
					console.log({ itemLink, scrolledItems });
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
				setFeeds={setFeeds}
				setQueryResult={setQueryResult}
				isSweepDataView={isSweepDataView}
				setIsSweepDataView={setIsSweepDataView}
				unreadItemsCount={items.length - scrolledItems.length <= 0
					? 0 : items.length - scrolledItems.length}
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

// Physics demo component wrapper
export const PhysicsDemoWrapper = () => {
	return <PhysicsDemo />;
};

export default RssFeedComponent;
