import { useMemo } from "react";
import { getDaysSinceLastEntry } from "../utils";
import { CalendarName } from "../atoms/CalendarName";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import PropTypes from "prop-types";

export const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer flex items-center justify-between gap-2
            w-full overflow-hidden odd:bg-gray-200 dark:odd:bg-gray-800">
            <CalendarName
                calendar={calendar}
                variant="list"
                daysSinceLastEntry={daysSinceLastEntry} />
            <DaysSinceBadge
                showToday
                // transparent
                calendar={calendar}
                hoursSince={daysSinceLastEntry}
                withIcon={false} />
        </div>
    );
};

CalendarItem.propTypes = {
    calendar: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

