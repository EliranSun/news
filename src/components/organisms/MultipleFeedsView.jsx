import { useMemo } from "react";
import { Button } from "../atoms/Button.jsx";
import markdownit from 'markdown-it';
import PropTypes from "prop-types";
import { Loader } from "../atoms/Loader.jsx";
import { FeedItem } from "../molecules/FeedItem.jsx";

export default function MultipleFeedsView({
    items = [],
    onItemRead,
    queryResult = "",
}) {
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

    const markdownQueryResult = useMemo(() => {
        if (!queryResult) return "";
        return markdownit({
            html: true,
            linkify: true,
            typographer: true
        }).render(queryResult);
    }, [queryResult]);

    if (!itemsPerFeed || Object.keys(itemsPerFeed).length === 0) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col gap-2 py-20 pb-40 w-full p-2 overflow-x-hidden">
            {queryResult &&
                <div dangerouslySetInnerHTML={{ __html: markdownQueryResult }} />}
            {Object.entries(itemsPerFeed)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([feedName, feed]) => (
                    <div key={feedName}
                        className="w-full flex items-center flex-col gap-2 h-fit 
                     px-4 max-w-[700px] m-auto overflow-x-hidden">
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
                            full
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
    );
}

MultipleFeedsView.propTypes = {
    items: PropTypes.array,
    onItemRead: PropTypes.func,
    queryResult: PropTypes.string,
};