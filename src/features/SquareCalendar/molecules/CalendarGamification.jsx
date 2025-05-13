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
        <div className="flex bg-stone-700 p-1 rounded text-center gap-1 items-center">
            <StreakBadge
                streak={streak}
                size={size}
                visible={calendar.showGamification} />
            <HighscoreBadge
                streak={streak}
                highscore={highscore}
                visible={calendar.showGamification}
                size={size} />
            <DaysSinceBadge
                calendar={calendar}
                visible={true}
                transparent
                hoursSince={daysSinceLastEntry}
                size={size} />
        </div>
    );
};

CalendarGamification.propTypes = {
    calendar: PropTypes.object.isRequired,
    size: PropTypes.string,
};