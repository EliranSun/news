import { useMemo } from "react";
import { getDaysSinceLastEntry } from "./utils";

export const useDaysSinceColor = (calendar) => {
    const color = useMemo(() => {
        const hoursSinceLast = getDaysSinceLastEntry(calendar.key) || 0;
        const daysSinceLast = hoursSinceLast / 24;
        const isRed = (daysSinceLast >= calendar.redAfter) || !daysSinceLast;
        const isYellow = daysSinceLast >= calendar.yellowAfter && !isRed;

        return {
            isRed,
            isYellow,
        }
    }, [calendar]);

    return color;
};