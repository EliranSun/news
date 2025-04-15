import { getDaysSinceLastEntry, getStreakCount, getHighestStreakCount } from "../utils"
import { HighscoreBadge } from "../atoms/HighscoreBadge";
import { StreakBadge } from "../atoms/StreakBadge";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const CalendarGamification = ({ calendar }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    // if (calendar.showGamification === false)
    //     return null;

    return (
        <div className="flex text-center gap-1 items-center">
            <StreakBadge
                streak={streak}
                showValue={calendar.showGamification} />
            <HighscoreBadge
                streak={streak}
                highscore={highscore}
                showValue={calendar.showGamification} />
            <DaysSinceBadge
                calendar={calendar}
                showValue={calendar.showGamification}
                hoursSince={daysSinceLastEntry} />
        </div>
    );
};

CalendarGamification.propTypes = {
    calendar: PropTypes.object.isRequired,
};