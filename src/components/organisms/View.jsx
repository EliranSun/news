import { Loader } from "../atoms/Loader.jsx";
import { FeedItem } from "../molecules/FeedItem.jsx";
import PropTypes from "prop-types";
import { useMemo } from "react";

const MultipleFeedsView = ({ items = [] }) => {
    const itemsPerFeed = useMemo(() => {
        const feeds = {};
        items.forEach((item) => {
            feeds[item.feedName] = [
                ...(feeds[item.feedName] || []),
                item
            ];
        });
    }, [items]);
    
    return (
            <div className="flex flex-col gap-2 pt-16 pb-40 w-full px-5">
                {itemsPerFeed
                    .map((feed) => (
                        <FeedItem
                            key={feed[0].link}
                            item={feed[0]}
                            onlyTitle
                        />
                    ))}
            </div>
        )
};

export const View = ({ 
items = [], 
isSavedView, 
isMultipleFeedsView,
queryResult 
}) => {
    if (items.length === 0) {
        return <Loader />;
    }

    if (isSavedView) {
        return (
            <div className="pt-16 pb-40 w-full px-5">
                {items
                    .filter(item => item.isSaved)
                    .map((item) => (
                        <FeedItem
                            key={item.link}
                            item={item}
                            onlyTitle
                        />
                    ))}
            </div>
        )
    }
    
    if (isMultipleFeedsView) {
        return (
        <MultipleFeedsView items={items} />
        }

    const nonSavedItems = items?.filter(item => !item.isSaved);

    if (!nonSavedItems) return null;

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
    isSavedView: PropTypes.bool,
    queryResult: PropTypes.string,
};