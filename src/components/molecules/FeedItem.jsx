import classNames from "classnames";
import PropTypes from "prop-types";
import translate from "translate";
import { useEffect, useState } from "react";

const TITLE_LENGTH_LIMIT = 50;

export const FeedItem = ({ item, onClick = () => { },
 queryResult, onlyTitle, compact, feedName }) => {
    // const [title, setTitle] = useState(item.title);
    
    // useEffect(() => {
    //     if (item.language !== "he") {
    //          translate(item.title, "he")
    //             .then(results => setTitle(results))
    //             .catch(error => console.error(error));
    //     } else {
    //         setTitle(item.title);
    //         }
    // }, [item]);
    
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
                        onClick={() => window.open(item.link, "_blank")}
                        className={classNames({
                            "flex-inline": compact,
                            "text-2xl": onlyTitle,
                            "text-[2.8rem]": !onlyTitle,
                            "font-bold mb-3 w-full": true,
                            "merriweather-bold": item.language.includes("en"),
                            "heebo-900": !item.language.includes("en"),
                        })}>
                            <div className={classNames({
                                "h-fit": onlyTitle,
                            })}>
                        {item.title}
                        </div>
                         {compact ?
                            <div 
                            className={classNames({
                                "flex justify-between w-full gap-1 text-xs font-mono font-light": true
                            })}>
                                <span>{feedName}</span>
                                <span>{item.diff.value}{item.diff.unit}</span>
                            </div> : null}
                    </h1>
                    {(!queryResult ? null : (
                        <p
                            dir={item.language === "he" ? "rtl" : "ltr"}
                            className="text-md mb-3">
                            {queryResult || item.description}
                        </p>
                    )}
                </div>
                {compact ? null : 
                <div className={classNames("font-mono", {
                    "text-right": item.language.includes("he"),
                    "text-left": !item.language.includes("he"),
                    "leading-none text-sm flex w-full justify-between": true,
                })}>
                    <span>{item.feedName}</span>
                    <span>{item.diff.value}{item.diff.unit}</span>
                </div>}
            </div>
        </div>
    );
};

FeedItem.propTypes = {
    onClick: PropTypes.func,
    queryResult: PropTypes.string,
    onlyTitle: PropTypes.bool,
    compact: PropTypes.bool,
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
