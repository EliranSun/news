import classNames from "classnames";

export const PageNavigationHeader = ({
    isSavedView,
    setIsSavedView
}) => {
    return (
        <div className="mb-4 flex justify-center gap-4 fixed top-0 py-8 bg-white dark:bg-black w-full z-10">
            <h1
                className={classNames({
                    "text-sm font-bold border-b border-slate-300 w-20 text-center": true,
                    "opacity-50": isSavedView,
                })}
                onClick={() => setIsSavedView(false)}>
                Feed
            </h1>
            <h1
                className={classNames({
                    "text-sm font-bold border-b border-slate-300 w-20 text-center": true,
                    "opacity-50": !isSavedView,
                })}
                onClick={() => setIsSavedView(true)}>
                Saved
            </h1>
        </div>
    );
};
