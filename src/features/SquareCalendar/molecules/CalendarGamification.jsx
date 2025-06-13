import { getStreakCount, getHighestStreakCount, getDaysSinceLastEntry } from "../utils"
import { HighscoreBadge } from "../atoms/HighscoreBadge";
import { StreakBadge } from "../atoms/StreakBadge";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarGamification = ({ calendar, size, variant = "default", data = [], hideIcons = false, hideToday = false }) => {
    const streak = useMemo(() => getStreakCount(data, calendar.key), [data, calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(data, calendar.key), [data, calendar.key]);
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(data), [data]);

    if ((!daysSinceLastEntry && !highscore && !streak) || !calendar.showGamification) return null;

    console.log(calendar.name, { daysSinceLastEntry, highscore, streak });

    return (
        <div className={classNames({
            "flex justify-center items-center gap-4 rounded-full": true,
            "bg-stone-300": variant === "default",
            "text-stone-800": variant === "plain",
            "py-2 px-4 text-center": true,
        })}>
            <DaysSinceBadge
                calendar={calendar}
                data={data}
                hideToday={hideToday}
                daysSinceLastEntry={daysSinceLastEntry}
                visible={true}
                withIcon={!hideIcons}
                transparent
                size={size} />
            <StreakBadge
                streak={streak}
                size={size}
                transparent
                visible={streak > 0} />
            <HighscoreBadge
                streak={streak}
                highscore={highscore}
                transparent
                visible={highscore > 0 && highscore > streak}
                size={size} />
        </div>
    );
};

CalendarGamification.propTypes = {
    calendar: PropTypes.object.isRequired,
    size: PropTypes.string,
};