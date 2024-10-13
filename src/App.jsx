import { useState, useCallback } from "react";
import { useRssFeed } from "./useRssFeed.js";
import { Loader } from "./Loader.jsx";
import { FeedItem } from "./FeedItem.jsx";
import { Button } from "./Button.jsx";
import { ClearFeedUpToDate } from "./ClearFeedUpToDate.jsx";
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
			className={`relative shadow-md size-${big ? 16 : 12} rounded-full text-[${
				big ? 16 : 8
			}px]`}
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

const RssFeedComponent = () => {
	const { feeds, setFeeds } = useRssFeed();
	const [queryResult, setQueryResult] = useState("");
	const [isSweepDataView, setIsSweepDataView] = useState(false);

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

	if (feeds.length === 0) {
		return <Loader />;
	}

	return (
		<section className="p-5 h-[100dvh]">
			{/*  className="animate-pulse" */}
			<div>
				<FeedItem
					item={feeds[0]}
					listLength={feeds.length}
					queryResult={queryResult}
				/>
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
					}}>
					<CheckFat size={24} />
					<NotificationBadge count={feeds.length} />
				</RoundButton>
				<RoundButton
					onClick={() => {
						localStorage.setItem(feeds[0].link, "saved");
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
