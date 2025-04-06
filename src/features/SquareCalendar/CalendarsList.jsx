import classNames from "classnames";
import { Calendars } from "./constants";
import { getDaysSinceLastEntry } from "./utils";
import { ExportImport } from './ExportImport';
import { useMemo } from "react";
import PropTypes from "prop-types";
import { CalendarName } from "./CalendarName";


const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer grid grid-cols-2 gap-0 py-2
            w-full px-4 overflow-hidden even:bg-gray-100 dark:even:bg-gray-900">
            <CalendarName calendar={calendar} daysSinceLastEntry={daysSinceLastEntry} />
        </div>
    );
};

CalendarItem.propTypes = {
    calendar: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export const CalendarsList = ({ onClick }) => {
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
            "fixed p-4 top-0 left-0 flex justify-center items-center w-full z-10 h-full ": true,
            "flex-col": Object.keys(groupedCalendars).length > 1,
            "flex-row": Object.keys(groupedCalendars).length <= 1
        })}>
            <ExportImport />
            <div className="h-fit bg-white dark:bg-black border space-y-8 rounded-lg border-black dark:border-white p-4 overflow-y-auto">
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div className="" key={category}>
                        <h3 className="text-2xl font-bold">{category}</h3>
                        {calendars.map((calendar) => (
                            <CalendarItem
                                key={calendar.key}
                                calendar={calendar}
                                onClick={onClick} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
