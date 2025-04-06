import { getDaysSinceLastEntry, getStreakCount, getHighestStreakCount } from "./utils"
import { Highscore, Streak, DaysSince } from "./CalendarsList";

export const CalendarGamification = ({ calendar }) => {
     const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);
    const streak = useMemo(() => getStreakCount(calendar.key), [calendar.key]);
    const highscore = useMemo(() => getHighestStreakCount(calendar.key), [calendar.key]);

    return (
        <div className="grid grid-cols-3 gap-1 text-center items-center justify-center w-full">
                <DaysSince daysSince={daysSinceLastEntry} />
                <Streak streak={streak} />
                <Highscore highscore={highscore} />
        </div>
    );
};