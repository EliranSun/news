import classNames from "classnames";
import { Calendars } from "./constants";
import { getDaysSinceLastEntry } from "./utils";
import { ExportImport } from './ExportImport';
import { useMemo } from "react";
import PropTypes from "prop-types";
import { CalendarName } from "./CalendarName";
import { DaysSinceBadge } from "./DaysSinceBadge";


const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer flex items-center justify-between
            w-full px-4 overflow-hidden even:bg-gray-100 dark:even:bg-gray-900">
            <CalendarName calendar={calendar} daysSinceLastEntry={daysSinceLastEntry} />
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
            "w-screen h-full": true,
            "fixed p-4 top-0 left-0 flex justify-center items-center  z-10": true,
            "flex-col": Object.keys(groupedCalendars).length > 1,
            "flex-row": Object.keys(groupedCalendars).length <= 1
        })}>
            <div className="h-fit bg-white grid grid-cols-2 gap-2 dark:bg-black border w-12/12
            rounded-lg border-black dark:border-white p-4 overflow-y-auto">
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div className="w-full" key={category}>
                        <h3 className="text-2xl font-bold">{category}</h3>
                        {calendars.map((calendar) => (
                            <CalendarItem
                                key={calendar.key}
                                calendar={calendar}
                                onClick={onClick} />
                        ))}
                    </div>
                ))}
                <ExportImport />
            </div>
        </div>
    );
};
