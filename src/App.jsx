import ClearFeedUpToDate from "./ClearFeedUpToDate";
import {useRssFeed} from "./useRssFeed.js";
import {Loader} from "./Loader.jsx";
import {FeedItem} from "./FeedItem.jsx";

const RssFeedComponent = () => {
	const {feeds, setFeeds} = useRssFeed();

	if (feeds.length === 0) {
		return (
			<Loader/>
		);
	}

	return (
		<section
			style={{
				padding: "20px",
				height: "100dvh",
			}}>
			<ClearFeedUpToDate items={feeds} />
			<div className="mx-auto flex flex-col items-start w-full gap-1 pt-1 box-border">
				{feeds.map((item) =>  {
					return (
						<FeedItem
							key={item.link + item.title}
							item={item}
							onRead={() => {
								setFeeds(feeds.filter((feed) => feed.link !== item.link));
							}}/>
					)
				})}
			</div>
		</section>
	);
};

export default RssFeedComponent;
