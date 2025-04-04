import classNames from "classnames";
import { Calendars } from "./constants";
import { getDaysSinceLastEntry, getStreakCount, getHighestStreakCount } from "./utils";
import { useMemo } from "react";
import PropTypes from "prop-types";

const Foo = ({ children }) => {
    return (
        <div className="w-full flex gap-0 items-center justify-center overflow-hidden text-sm">
            {children}
        </div>
    )
}
const Streak = ({ streak }) => {
    return (
        <Foo>
            {streak > 0 &&
                <>
                    <span className="w-10">{streak}d</span>
                    <span>🔥</span>
                </>
            }
        </Foo>
    )
};

const Highscore = ({ highscore }) => {
    return (
        <Foo>
            {highscore > 0 &&
                <>
                    <span className="w-10">{highscore}d</span>
                    <span>🏆</span>
                </>
            }
        </Foo>
    )
};

const DaysSince = ({ daysSince }) => {
    if (daysSince === null) return null;

    return (
        <Foo>
            <span className="w-10">{daysSince === 0 ? "↓" : `${daysSince}d`}</span>
            <span>🔄</span>
        </Foo>
    )
};

const EntryName = ({ calendar, daysSinceLastEntry }) => {
    return (
        <div className={classNames({
            "text-red-500": calendar.showColorStatus && (daysSinceLastEntry === null || daysSinceLastEntry > calendar.redAfter),
            "text-yellow-500": calendar.showColorStatus && daysSinceLastEntry > calendar.yellowAfter,
            "text-green-500": calendar.showColorStatus && daysSinceLastEntry <= calendar.yellowAfter,
        })}>
            {calendar.icon} {calendar.name}
        </div>
    );
};

const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer grid grid-cols-2 gap-0 py-2
            w-full px-4 overflow-hidden even:bg-gray-100 dark:even:bg-gray-900">
            <EntryName calendar={calendar} daysSinceLastEntry={daysSinceLastEntry} />
            <div className="grid grid-cols-3 gap-1 text-center items-center justify-center w-full">
                <DaysSince daysSince={daysSinceLastEntry} />
                <Streak streak={streak} />
                <Highscore highscore={highscore} />
            </div>
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
            "fixed p-4 top-0 left-0 flex justify-center items-center w-full z-10 h-full dark:bg-black": true,
            "flex-col": Object.keys(groupedCalendars).length > 1,
            "flex-row": Object.keys(groupedCalendars).length <= 1
        })}>
            <div className="h-fit bg-white border space-y-8 rounded-lg border-black dark:border-white p-4 overflow-y-auto">
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div className="" key={category}>
                        <h3 className="text-2xl font-bold">{category}</h3>
                        {calendars.map((calendar) => (
                            <CalendarItem key={calendar.key} calendar={calendar} onClick={onClick} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
