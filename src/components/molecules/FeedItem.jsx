import classNames from "classnames";
import PropTypes from "prop-types";

export const FeedItem = ({ item, onClick = () => { }, queryResult, onlyTitle, compact }) => {
    return (
        <div
            onClick={onClick}
            className={classNames({
                'pb-0': onlyTitle,
                'pb-32': !onlyTitle,
                'text-right': item.language.includes("he"),
                'text-left': !item.language.includes("he"),
                'mt-4 flex justify-between w-full': true,
            })}>
            <div className="w-full flex flex-col justify-between">
                <div>
                    <h1
                        dir={item.language === "he" ? "rtl" : "ltr"}
                        className={classNames({
                            "flex-inline text-base leading-none": compact,
                            "text-2xl": onlyTitle,
                            "text-[2.4rem]": !onlyTitle,
                            "h-18 font-bold mb-3 w-full": true,
                            "merriweather-bold": item.language.includes("en"),
                            "heebo-900": !item.language.includes("en"),
                        })}>
                        {item.title} {compact ?
                            <>-{' '}
                                <span
                                    className={classNames({
                                        "inline-flex gap-1 text-xs font-mono font-light": true,
                                        "flex-row-reverse": item.language.includes("he"),
                                        "flex-row": !item.language.includes("he"),
                                    })}>
                                    <span>{item.diff.value}{item.diff.unit}</span>
                                    <span>{item.language === "he" ? "לפני" : "ago"}</span>
                                </span>
                            </> : null}
                    </h1>
                    {(!queryResult && (onlyTitle || item.title.length >= 90)) ? null : (
                        <p
                            dir={item.language === "he" ? "rtl" : "ltr"}
                            className="text-xs mb-3">
                            {queryResult || item.description}
                        </p>
                    )}
                </div>
                {compact ? null : <p className={classNames("font-mono", {
                    "text-right": item.language.includes("he"),
                    "text-left": !item.language.includes("he"),
                    "leading-none text-xs": compact,
                    "leading-none text-sm": !compact,
                })}>
                    {item.diff.value}
                    {item.diff.unit} ago
                </p>}
            </div>
        </div>
    );
};

FeedItem.propTypes = {
    onClick: PropTypes.func,
    queryResult: PropTypes.string,
    onlyTitle: PropTypes.bool,
    item: PropTypes.shape({
        language: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        diff: PropTypes.shape({
            value: PropTypes.number.isRequired,
            unit: PropTypes.string.isRequired,
        }).isRequired,
        isSaved: PropTypes.bool.isRequired,
    }).isRequired,
};
