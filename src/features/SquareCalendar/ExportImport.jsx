import { exportCalendarData, importCalendarData } from "./utils";

export const ExportImport = () => {
    return (
        <div className="w-full flex flex-col gap-2 bg-gray-200 dark:bg-gray-900 p-2 rounded-lg">
            <button onClick={exportCalendarData}>
                EXPORT
            </button>
            <button onClick={importCalendarData}>
                IMPORT
            </button>
        </div>
    );
};
