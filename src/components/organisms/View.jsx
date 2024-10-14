import { Loader } from "../atoms/Loader.jsx";
import { FeedItem } from "../molecules/FeedItem.jsx";
import PropTypes from "prop-types";

export const View = ({ items = [], isSavedView, queryResult }) => {
    if (items.length === 0) {
        return <Loader />;
    }

    if (isSavedView) {
        return (
            <div className="pt-12 pb-40 w-full px-5">
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

    const nonSavedItems = items?.filter(item => !item.isSaved);

    if (!nonSavedItems) return null;

    return (
        <div className="w-full pt-12 px-5">
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