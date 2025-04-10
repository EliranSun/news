import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarName = ({ calendar }) => {
    return (
        <div className={classNames("flex text-lg font-bold font-mono")}>
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
    daysSinceLastEntry: PropTypes.number.isRequired,
};
