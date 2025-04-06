import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarName = ({ calendar, daysSinceLastEntry }) => {
    return (
        <div className={classNames({
            "text-red-500": calendar.showColorStatus && (daysSinceLastEntry === null || daysSinceLastEntry > calendar.redAfter),
            "text-yellow-500": calendar.showColorStatus && daysSinceLastEntry > calendar.yellowAfter,
            "text-green-500": calendar.showColorStatus && daysSinceLastEntry <= calendar.yellowAfter,
        })}>
            {calendar.icon} {calendar.name}
        </div>
    );
};

CalendarName.propTypes = {
    calendar: PropTypes.object.isRequired,
    daysSinceLastEntry: PropTypes.number.isRequired,
};
