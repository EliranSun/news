import { Loader } from "../atoms/Loader.jsx";
import { FeedItem } from "../molecules/FeedItem.jsx";
import PropTypes from "prop-types";
import ContinuousFeedView from "./ContinuousFeedView.jsx";
import MultipleFeedsView from "./MultipleFeedsView.jsx";

export const View = ({
    items = [],
    view,
    queryResult,
    onItemRead,
    onItemsScroll,
    isLoadingFeeds = true,
}) => {
    // get all items from local storage, then filter them by value "saved"
    const savedItems = JSON.parse(localStorage.getItem("saved-links") || "[]");

    if (isLoadingFeeds) {
        return <Loader />;
    }

    if (view === "saved" && savedItems.length === 0) {
        return (
            <div className="pt-16 pb-40 w-full px-5">
                <h1 className="text-2xl font-bold">No saved items</h1>
            </div>
        );
    }

    if (view === "saved") {
        return (
            <div className="pt-16 pb-40 w-full px-5">
                {savedItems.map((item) => (
                    <FeedItem
                        key={item.link}
                        item={{ ...item, description: "" }}
                        feedName={item.feedName}
                        onlyTitle
                    />
                ))}
            </div>
        )
    }


    if (items.length === 0) {
        return <div className="h-dvh flex justify-center items-center">All done!</div>;
    }

    const nonSavedItems = items?.filter(item => !item.isSaved);

    if (!nonSavedItems) return null;

    if (view === "feeds") {
        return (
            <MultipleFeedsView
                items={nonSavedItems}
                onItemRead={onItemRead}
                queryResult={queryResult} />
        );
    }

    if (view === "page") {
        return (
            <div className="w-full max-w-[700px] m-auto pt-16 px-5">
                <FeedItem
                    item={nonSavedItems[0]}
                    queryResult={queryResult}
                />
            </div>
        );
    }

    return <ContinuousFeedView items={nonSavedItems} onItemsScroll={onItemsScroll} />
};

View.propTypes = {
    items: PropTypes.array,
    queryResult: PropTypes.string,
    view: PropTypes.string,
    onItemRead: PropTypes.func,
    onItemsScroll: PropTypes.func,
};
