import classNames from "classnames";
import PropTypes from "prop-types";

export const CalendarButton = ({ children, color, isSelected, ...rest }) =>
    <button
        className={classNames("min-w-20 shrink-0", {
            "bg-gray-800": isSelected,
            "text-white": !color,
            "text-yellow-500": color === "yellow",
            "text-green-500": color === "green",
            "text-red-500": color === "red",
            "text-sm flex": true,
        })} {...rest}>
        {children}
    </button>;

CalendarButton.propTypes = {
    children: PropTypes.node.isRequired,
    isSelected: PropTypes.bool.isRequired,
    color: PropTypes.oneOf(["yellow", "green", "red"]),
};
