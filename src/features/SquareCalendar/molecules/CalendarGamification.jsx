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

    return (
        <div className="flex w-full bg-stone-700 py-1 h-10 rounded-md text-center gap-1 justify-center items-center">
            <DaysSinceBadge
                calendar={calendar}
                visible={calendar.showGamification}
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