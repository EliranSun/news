import classNames from "classnames";
import PropTypes from "prop-types";

export const CalendarButton = ({ children, color, isSelected, ...rest }) =>
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
    </button>;

CalendarButton.propTypes = {
    children: PropTypes.node.isRequired,
    isSelected: PropTypes.bool.isRequired,
    color: PropTypes.oneOf(["yellow", "green", "red"]),
};
