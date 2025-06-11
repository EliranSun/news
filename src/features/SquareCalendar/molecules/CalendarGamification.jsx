import { getStreakCount, getHighestStreakCount } from "../utils"
import { HighscoreBadge } from "../atoms/HighscoreBadge";
import { StreakBadge } from "../atoms/StreakBadge";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarGamification = ({ calendar, size, variant = "default" }) => {
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    // if (!calendar.showGamification) return null;

    return (
        <div className={classNames({
            "flex justify-center items-center gap-2 rounded-full": true,
            "bg-stone-800": variant === "default",
            "text-stone-800": variant === "plain",
            "p-2 text-center": true, 
        })}>
            <DaysSinceBadge
                calendar={calendar}
                visible={true}
                transparent
                size={size} />
            <StreakBadge
                streak={streak}
                size={size}
                transparent
                visible={calendar.showGamification} />
            <HighscoreBadge
                streak={streak}
                highscore={highscore}
                transparent
                visible={calendar.showGamification}
                size={size} />
        </div>
    );
};

CalendarGamification.propTypes = {
    calendar: PropTypes.object.isRequired,
    size: PropTypes.string,
};