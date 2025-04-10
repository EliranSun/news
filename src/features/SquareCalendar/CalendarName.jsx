import PropTypes from "prop-types";
import classNames from "classnames";
import { upperFirst } from "lodash";
import { useMemo } from "react";
import { getDaysSinceLastEntry } from "./utils"

export const CalendarName = ({ calendar, daysSinceLastEntry }) => {
    const color = useMemo(() => {
        const hoursSinceLast = getDaysSinceLastEntry(calendar.key) || 0;
        const daysSinceLast = hoursSinceLast / 24;
        console.log({ 
            key: calendar.key, 
            daysSinceLast, 
            redAfter: calendar.redAfter,
            yellowAfter: calendar.yellowAfter,
        });
        
        const isRed = (daysSinceLast >= calendar.redAfter) || !daysSinceLast;
        const isYellow = daysSinceLast >= calendar.yellowAfter;
    
        return isRed ? "red" : isYellow ? "yellow" : "green";
    }, [calendar]);
    
    return (
        <div className={classNames("flex", {
            "text-green-500": calendar.showColorStatus && color === "green",
            "text-yellow-500": calendar.showColorStatus && color === "yellow",
            "text-red-500": calendar.showColorStatus && color === "red",
        })}>
            <div className="w-6 shrink-0 overflow-hidden flex items-center justify-center text-sm">
                {calendar.icon}
            </div>
            <div className="overflow-hidden">
                {upperFirst(calendar.name)}
            </div>
        </div>
    );
};

CalendarName.propTypes = {
    calendar: PropTypes.object.isRequired,
    daysSinceLastEntry: PropTypes.number.isRequired,
};
