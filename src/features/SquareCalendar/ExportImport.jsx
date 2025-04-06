import { exportCalendarData, importCalendarData } from "./utils";

export const ExportImport = () => {
    return (
        <div className="flex gap-2">
            <button onClick={exportCalendarData}>
                EXPORT
            </button>
            <button onClick={importCalendarData}>
                IMPORT
            </button>
        </div>
    );
};
