import classNames from "classnames";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { getDaysSinceLastEntry } from "./utils";

export const CalendarButton = ({ children, calendar, isSelected, ...rest }) => {
    const color = useMemo(() => {
        const hoursSinceLast = getDaysSinceLastEntry(calendar.key);
        return ((hoursSinceLast / 24) >= calendar.redAfter || !hoursSinceLast) ? "red" :
            (hoursSinceLast / 24) >= calendar.yellowAfter ? "yellow" :
                "green"
    }, [calendar]);

    return (
        <button
            className={classNames("", {
                "bg-gray-800": isSelected,
                "text-white": !color,
                "border-yellow-500": color === "yellow",
                "border-green-500": color === "green",
                "border-red-500": color === "red",
                "text-sm flex border": true,
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
