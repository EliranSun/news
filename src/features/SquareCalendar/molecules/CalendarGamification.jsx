import { getDaysSinceLastEntry, getStreakCount, getHighestStreakCount } from "../utils"
import { HighscoreBadge } from "../atoms/HighscoreBadge";
import { StreakBadge } from "../atoms/StreakBadge";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const CalendarGamification = ({ calendar, size }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    // if (!calendar.showGamification) return null;

    return (
        <div className="flex w-full text-center gap-1 justify-center items-center">
            <DaysSinceBadge
                calendar={calendar}
                visible={true}
                transparent
                hoursSince={daysSinceLastEntry}
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