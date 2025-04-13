import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarName = ({ calendar, variant }) => {
    return (
        <div className={classNames({
            "flex items-center gap-2 font-mono": true,
            "text-sm": variant === "list",
            "text-lg font-bold": variant !== "list",
        })}>
            <div className="w-6 shrink-0 overflow-hidden flex items-center justify-center">
                {calendar.icon}
            </div>
            <div className="overflow-hidden">
                {calendar.name.toUpperCase()}
            </div>
        </div>
    );
};

CalendarName.propTypes = {
    calendar: PropTypes.object.isRequired,
    variant: PropTypes.string.isRequired,
};
