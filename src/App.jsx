import ClearFeedUpToDate from "./ClearFeedUpToDate";
import { useRssFeed } from "./useRssFeed.js";
import { Loader } from "./Loader.jsx";
import { FeedItem } from "./FeedItem.jsx";
import { Button } from "./Button.jsx";
import { useState } from "react";

const currentHour = new Date().getHours();

const RssFeedComponent = () => {
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);
	const { feeds, setFeeds } = useRssFeed();

	if (feeds.length === 0) {
		return <Loader />;
	}

	return (
		<section
			style={{
				padding: "20px",
				height: "100dvh",
			}}>
			<ClearFeedUpToDate items={feeds} />
			<div className="mx-auto flex flex-col items-start w-full gap-1 pt-1 box-border">
				{feeds.map((item, index) => {
					return (
						<div
							key={item.link + item.title}
							className={`
								p-2 rounded-md
								${index === selectedItemIndex ? "outline outline-1 outline-slate-300" : ""}`}>
							<FeedItem
								item={item}
								onClick={() => setSelectedItemIndex(index)}
								onRead={() => {
									setFeeds(feeds.filter((feed) => feed.link !== item.link));
								}}
							/>
						</div>
					);
				})}
			</div>
			<Button
				className={`shadow-lg fixed bottom-10 ${
					currentHour > 18 ? "left-0" : "right-0"
				} right-0 size-16 m-4 rounded-full`}
				onClick={() => {
					localStorage.setItem(feeds[selectedItemIndex].link, "read");
					setFeeds(
						feeds.filter((feed) => feed.link !== feeds[selectedItemIndex].link)
					);
				}}>
				✔️
			</Button>
		</section>
	);
};

export default RssFeedComponent;
