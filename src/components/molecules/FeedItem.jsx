import classNames from "classnames";
import PropTypes from "prop-types";

export const FeedItem = ({ item, onClick = () => {}, queryResult, onlyTitle }) => {
    return (
        <div
            onClick={onClick}
            className={`
				${onlyTitle ? "pb-0" : "pb-32"}
				${item.language.includes("he") ? "text-right" : "text-left"}
				mt-4 flex gap-4 justify-between w-full
			`}>
            <div className="w-full flex flex-col justify-between">
                <div>
                    <h1
                        dir={item.language === "he" ? "rtl" : "ltr"}
                        className={classNames({
                            "text-2xl": onlyTitle,
                            "text-5xl": !onlyTitle,
                            "h-18 font-bold mb-3 w-full": true,
                            "merriweather-bold": item.language.includes("en"),
                            "heebo-900": !item.language.includes("en"),
                        })}>
                        {item.title}
                    </h1>
                    {(!queryResult && (onlyTitle || item.title.length >= 90)) ? null : (
                        <p
                            dir={item.language === "he" ? "rtl" : "ltr"}
                            className="text-sm mb-3">
                            {queryResult || item.description}
                        </p>
                    )}
                </div>
                <p className="text-sm font-mono">
                    {item.diff.value}
                    {item.diff.unit} ago
                </p>
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
