import { Loader } from "../../Loader.jsx";
import { FeedItem } from "../../FeedItem.jsx";

export const View = ({ items = [], isSavedView, queryResult }) => {
    if (items.length === 0) {
        return <Loader/>;
    }
    
    if (isSavedView) {
        return (
            <div className="pb-40">
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
        <FeedItem
            item={nonSavedItems[0]}
            queryResult={queryResult}
        />
    );
    
};