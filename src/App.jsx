import { useState, useCallback } from "react";
import { useRssFeed } from "./useRssFeed.js";
import { Loader } from "./Loader.jsx";
import { FeedItem } from "./FeedItem.jsx";
import { Button } from "./Button.jsx";
import { ClearFeedUpToDate } from "./ClearFeedUpToDate.jsx";
import classNames from "classnames";
import {
	CheckFat,
	BookmarkSimple,
	Broom,
	Link,
	Robot,
} from "@phosphor-icons/react";

const API_URL = "https://walak.vercel.app/api/rss";

const RoundButton = ({ children, onClick, big }) => {
	return (
		<Button
			className={classNames({
				"size-16 text-[16px]": big,
				"size-10 text-[8px]": !big,
				"relative shadow-md rounded-full": true,
			})}
			onClick={onClick}>
			{children}
		</Button>
	);
};

const NotificationBadge = ({ count }) => {
	return (
		<Button
			className={`absolute -right-2 -top-2 shadow-md size-7 mx-auto border border-slate-300 rounded-full text-[8px]`}>
			{count}
		</Button>
	);
};

const View = ({ items = [], isSavedView, queryResult }) => {
	if (items.length === 0) {
						return <Loader />;
		}
		
		if (isSavedView) {
				return items
				.filter(item => item.isSaved)
				.map((item) => (
						<FeedItem
							key={item.link}
							item={item}
							onlyTitle
						/>
					));
			}
		
		return "heello";
		
};

const RssFeedComponent = () => {
	const { feeds, setFeeds } = useRssFeed();
	const [queryResult, setQueryResult] = useState("");
	const [isSweepDataView, setIsSweepDataView] = useState(false);
 const [isSavedView, setIsSavedView] = useState(false);
	
	const onQueryClick = useCallback(async () => {
		const body = {
			question: feeds[0].title,
			link: feeds[0].link,
			title: feeds[0].title,
		};

		const res = await fetch(API_URL, {
			method: "POST",
			body: JSON.stringify(body),
		});

		const data = await res.json();
		setQueryResult(data.answer);
	}, [feeds]);
	

	return (
		<section className="p-5 h-[100dvh] w-screen">
			<div className="mb-4 flex justify-center gap-4">
				<h1
					className={classNames({
						"text-sm font-bold border-b border-slate-300": true,
						"opacity-50": isSavedView,
					})}
					onClick={() => setIsSavedView(false)}>
					Feed
				</h1>
				<h1
					className={classNames({
						"text-sm font-bold border-b border-slate-300": true,
						"opacity-50": !isSavedView,
					})}
					onClick={() => setIsSavedView(true)}>
					Saved
				</h1>
			</div>
			<div className="w-full">
				<View 
				queryResults={queryResults}
				items={feeds} 
				isSavedView={isSavedView}/>
			</div>
			<div className="fixed bottom-8 inset-x-0 flex justify-center items-center gap-6">
				<RoundButton onClick={() => window.open(feeds[0].link, "_blank")}>
					<Link size={24} />
				</RoundButton>
				<RoundButton onClick={onQueryClick}>
					<Robot size={24} />
				</RoundButton>
				<RoundButton
					big
					onClick={() => {
						localStorage.setItem(feeds[0].link, "read");
						setFeeds(feeds.filter((feed) => feed.link !== feeds[0].link));
						setQueryResult("");
					}}>
					<CheckFat size={24} />
					<NotificationBadge count={feeds.length} />
				</RoundButton>
				<RoundButton
					onClick={() => {
						localStorage.setItem(feeds[0].link, "saved");
						setFeeds(feeds.filter((feed) => feed.link !== feeds[0].link));
						setQueryResult("");
					}}>
					<BookmarkSimple size={24} />
				</RoundButton>
				<RoundButton onClick={() => setIsSweepDataView(!isSweepDataView)}>
					<ClearFeedUpToDate
						items={feeds}
						isActive={isSweepDataView}
					/>
					<Broom size={24} />
				</RoundButton>
			</div>
		</section>
	);
};

export default RssFeedComponent;
