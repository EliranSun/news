import PropTypes from "prop-types";

export const ViewToggle = ({ currentView, onViewChange }) => {
    return (
        <div className="flex justify-center mt-2 mb-4">
            <div className="inline-flex rounded-lg bg-stone-200 dark:bg-stone-700 p-1 gap-2">
                <button
                    onClick={() => onViewChange("feed")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                        ${currentView === "feed"
                            ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                            : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600"}`}
                >
                    Categories
                </button>
                <button
                    onClick={() => onViewChange("weekly")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                        ${currentView === "weekly"
                            ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm"
                            : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600"}`}
                >
                    Weekly
                </button>
            </div>
        </div>
    );
};

ViewToggle.propTypes = {
    currentView: PropTypes.oneOf(["feed", "weekly"]).isRequired,
    onViewChange: PropTypes.func.isRequired
}; 