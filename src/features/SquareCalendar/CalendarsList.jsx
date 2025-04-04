import classNames from "classnames";
import { Calendars } from "./constants";
import { getDaysSinceLastEntry, getStreakCount, getHighestStreakCount } from "./utils";
import { useMemo } from "react";

const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    return (
        <div
            className="cursor-pointer grid grid-cols-2 gap-2 text-sm w-full"
            onClick={() => onClick(calendar)}>
            <div className="">{calendar.icon} {calendar.name}</div>
            <div className="grid grid-cols-3 gap-3 text-center">
                <div className="w-fit flex gap-0">{streak > 0 &&
                    <><span className="w-10">{streak}d</span><span>🔥</span></>}</div>
                <div className="w-fit flex gap-0">{highscore > 0 &&
                    <><span className="w-10">{highscore}d</span><span>🏆</span></>}</div>
                {daysSinceLastEntry !== null &&
                    <div className="w-fit flex gap-0">
                        <span className="w-10">{daysSinceLastEntry === 0
                            ? "↓"
                            : `${daysSinceLastEntry}00d`}
                        </span>
                        <span>🔄</span>
                    </div>}
            </div>
        </div>
    );
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
            "fixed top-0 left-0 flex justify-center items-center w-full z-10 h-full dark:bg-black": true,
            "flex-col": Object.keys(groupedCalendars).length > 1,
            "flex-row": Object.keys(groupedCalendars).length <= 1
        })}>
            <div className="h-fit bg-white border space-y-2 rounded-lg border-black dark:border-white p-4 overflow-y-auto">
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div key={category}>
                        <h3 className="text-xl font-bold">{category}</h3>
                        {calendars.map((calendar) => (
                            <CalendarItem key={calendar.key} calendar={calendar} onClick={onClick} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
