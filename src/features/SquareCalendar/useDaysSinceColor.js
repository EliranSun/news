import { useMemo } from "react";
import { getDaysSinceLastEntry } from "./utils";

export const useDaysSinceColor = (calendar) => {
    const color = useMemo(() => {
        if (!calendar) return { isRed: false, isYellow: false };

        const hoursSinceLast = getDaysSinceLastEntry(calendar.key);
        const daysSinceLast = hoursSinceLast === null ? null : hoursSinceLast / 24;
        const isRed = (daysSinceLast >= calendar.redAfter) || daysSinceLast === null;
        const isYellow = daysSinceLast >= calendar.yellowAfter && !isRed;

        return {
            isRed,
            isYellow,
        }
    }, [calendar]);

    return color;
};