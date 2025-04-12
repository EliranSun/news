import classNames from "classnames";
import { Calendars } from "../constants";
import { getDaysSinceLastEntry } from "../utils";
import { ExportImport } from '../atoms/ExportImport';
import { useMemo } from "react";
import PropTypes from "prop-types";
import { CalendarName } from "../atoms/CalendarName";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";


const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer flex items-center justify-between
            w-full overflow-hidden odd:bg-gray-200 dark:odd:bg-gray-800">
            <CalendarName
                calendar={calendar}
                daysSinceLastEntry={daysSinceLastEntry} />
            <DaysSinceBadge
                showToday
                daysSince={daysSinceLastEntry}
                withIcon={false} />
        </div>
    );
};

CalendarItem.propTypes = {
    calendar: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export const CalendarsList = ({ onClick, onClose }) => {
    // Group calendars by category
    const groupedCalendars = Object.values(Calendars).reduce((acc, calendar) => {
        if (!acc[calendar.category]) {
            acc[calendar.category] = [];
        }
        acc[calendar.category].push({
            ...calendar,
        });
        return acc;
    }, {});

    return (
        <div className={classNames({
            "font-mono": true,
            "backdrop-brightness-50 backdrop-blur": true,
            "w-screen h-full space-y-4": true,
            "fixed p-2 top-0 left-0 flex justify-center items-center z-10": true,
            "flex-col": Object.keys(groupedCalendars).length > 1,
            "flex-row": Object.keys(groupedCalendars).length <= 1
        })}>
            <button
                className="absolute top-10 inset-x-0 m-auto 
                text-2xl font-mono
                rounded-full size-20 p-2"
                onClick={onClose}>
                X
            </button>
            <div className={classNames({
                "w-full p-2": true,
                "bg-white dark:bg-black": true,
                "grid grid-cols-2 gap-2 auto-rows-auto": true,
                "border border-black dark:border-white rounded-lg": true,
                "overflow-y-auto": true,
                "max-h-[80vh]": true
            })}>
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div
                        key={category}
                        className={classNames({
                            "w-full p-2 rounded-lg flex flex-col": true,
                            "bg-gray-100 dark:bg-gray-900": true
                        })}>
                        <h3 className="font-bold">{category}</h3>
                        <div className="flex-grow">
                            {calendars.map((calendar) => (
                                <CalendarItem
                                    key={calendar.key}
                                    calendar={calendar}
                                    onClick={onClick} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <ExportImport />
        </div>
    );
};

CalendarsList.propTypes = {
    onClick: PropTypes.func.isRequired
};
