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
            className={classNames("", {
                "bg-gray-800": isSelected,
                "bg-gray-200": !isSelected,
                // "text-white": !color,
                // "border-yellow-500": color === "yellow",
                // "border-green-500": color === "green",
                // "border-red-500": color === "red",
                "text-xs border-2 w-16 text-center": true,
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
