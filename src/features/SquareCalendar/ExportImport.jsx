import { exportCalendarData, importCalendarData } from "./utils";

export const ExportImport = () => {
    return (
        <div className="w-full flex gap-2 p-2 rounded-lg">
            <button onClick={exportCalendarData}>
                EXPORT
            </button>
            <button onClick={importCalendarData}>
                IMPORT
            </button>
        </div>
    );
};
