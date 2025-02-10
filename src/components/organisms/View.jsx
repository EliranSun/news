import { Loader } from "../atoms/Loader.jsx";
import { FeedItem } from "../molecules/FeedItem.jsx";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Button } from "../atoms/Button.jsx";

const MultipleFeedsView = ({ items = [], onItemRead }) => {
    const itemsPerFeed = useMemo(() => {
        const feeds = {};
        items.forEach((item) => {
            feeds[item.feedName] = [
                ...(feeds[item.feedName] || []),
                item
            ];
        });

        return feeds;
    }, [items]);

    console.log(items[0]);

    if (!itemsPerFeed || Object.keys(itemsPerFeed).length === 0) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col gap-2 py-20 w-full p-2">
            {Object.entries(itemsPerFeed)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([feedName, feed]) => (
                    <div key={feedName}
                        className="flex items-center flex-row-reverse gap-8 h-fit 
                     px-4">
                        <FeedItem
                            key={feed[0].link}
                            feedName={feedName}
                            item={{
                                ...feed[0],
                                title: `${feed[0].title}`
                            }}
                            onlyTitle
                            compact
                        />
                        
                        <Button 
                            onClick={() => {
                            localStorage.setItem(feed[0].link, "read");
                            onItemRead(feed[0].link);
                        }}
                            className="size-16 rounded-lg">
                            {feed.length}
                        </Button>
                    </div>
                ))}
        </div>
    )
};

export const View = ({
    items = [],
    view,
    queryResult,
    onItemRead,
}) => {
    if (items.length === 0) {
        return <Loader />;
    }

    if (view === "saved") {
        return (
            <div className="pt-16 pb-40 w-full px-5">
                {items
                    .filter(item => item.isSaved)
                    .map((item) => (
                        <FeedItem
                            key={item.link}
                            item={item}
                            feedName={item.feedName}
                            onlyTitle
                        />
                    ))}
            </div>
        )
    }



    const nonSavedItems = items?.filter(item => !item.isSaved);

    if (!nonSavedItems) return null;

    if (view === "feeds") {
        return (
            <MultipleFeedsView items={nonSavedItems} onItemRead={onItemRead} />
        );
    }

    return (
        <div className="w-full pt-16 px-5">
            <FeedItem
                item={nonSavedItems[0]}
                queryResult={queryResult}
            />
        </div>
    );
};

View.propTypes = {
    items: PropTypes.array,
    queryResult: PropTypes.string,
    view: PropTypes.string,
};
