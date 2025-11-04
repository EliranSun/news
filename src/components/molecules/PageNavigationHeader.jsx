import classNames from "classnames";
import PropTypes from "prop-types";
export const PageNavigationHeader = ({
    view,
    setView
}) => {
    return (
        <div className="flex justify-start gap-2 py-5 bg-white dark:bg-black z-10">
            <h1
                className={classNames({
                    "text-sm font-bold w-20 text-center": true,
                    "opacity-50": view !== "feed",
                    "border-b border-slate-300": view === "page"
                })}
                onClick={() => setView("page")}>
                Page
            </h1>
            <h1
                className={classNames({
                    "text-sm font-bold w-20 text-center": true,
                    "opacity-50": view !== "feed",
                    "border-b border-slate-300": view === "feed"
                })}
                onClick={() => setView("feed")}>
                Feed
            </h1>
            <h1
                className={classNames({
                    "text-sm font-bold w-20 text-center": true,
                    "opacity-50": view !== "feeds",
                    "border-b border-slate-300": view === "feeds"
                })}
                onClick={() => setView("feeds")}>
                Feeds
            </h1>
            <h1
                className={classNames({
                    "text-sm font-bold w-20 text-center": true,
                    "opacity-50": view !== "saved",
                    "border-b border-slate-300": view === "saved",
                })}
                onClick={() => setView("saved")}>
                Saved
            </h1>
        </div>
    );
};

PageNavigationHeader.propTypes = {
    view: PropTypes.string,
    setView: PropTypes.func,
};
