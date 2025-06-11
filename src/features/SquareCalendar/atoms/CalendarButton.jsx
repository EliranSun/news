import classNames from "classnames";
import PropTypes from "prop-types";
// import { useMemo } from "react";
// import { getDaysSinceLastEntry } from "./utils";

export const CalendarButton = ({ children, calendar, isSelected, ...rest }) => {
    // const color = useMemo(() => {
    //     const hoursSinceLast = getDaysSinceLastEntry(calendar.key) || 0;
    //     const daysSinceLast = hoursSinceLast / 24;
    //     console.log({
    //         key: calendar.key,
    //         daysSinceLast,
    //         redAfter: calendar.redAfter,
    //         yellowAfter: calendar.yellowAfter,
    //     });

    //     const isRed = (daysSinceLast >= calendar.redAfter) || !daysSinceLast;
    //     const isYellow = daysSinceLast >= calendar.yellowAfter;

    //     return isRed ? "red" : isYellow ? "yellow" : "green";
    // }, [calendar]);

    return (
        <button
            className={classNames("w-full flex gap-2", {
                "bg-stone-800 text-white border-stone-200": isSelected,
                "text-sm border-2 text-left": true,
            })} {...rest}>
            {children}
        </button>
    );
}

CalendarButton.propTypes = {
    children: PropTypes.node.isRequired,
    isSelected: PropTypes.bool.isRequired,
    calendar: PropTypes.object.isRequired,
};
