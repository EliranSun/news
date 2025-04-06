import { getDaysSinceLastEntry, getStreakCount, getHighestStreakCount } from "./utils"
import { HighscoreBadge } from "./HighscoreBadge";
import { StreakBadge } from "./StreakBadge";
import { DaysSinceBadge } from "./DaysSinceBadge";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const CalendarGamification = ({ calendar }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    if (calendar.showGamification === false) return null;

    return (
        <div className="flex text-center gap-1 items-center w-full">
            <DaysSinceBadge daysSince={daysSinceLastEntry} />
            <StreakBadge streak={streak} />
            <HighscoreBadge highscore={highscore} />
        </div>
    );
};

CalendarGamification.propTypes = {
    calendar: PropTypes.object.isRequired,
};