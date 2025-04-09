import PropTypes from "prop-types";
import classNames from "classnames";
import { upperFirst } from "lodash";
export const CalendarName = ({ calendar, daysSinceLastEntry }) => {
    const yellow = calendar.yellowAfter * 24;
    const red = calendar.redAfter * 24;

    return (
        <div className={classNames("flex", {
            "text-green-500": calendar.showColorStatus &&
                daysSinceLastEntry < yellow,
            "text-yellow-500": calendar.showColorStatus &&
                daysSinceLastEntry >= yellow,
            "text-red-500":
                calendar.showColorStatus && (
                    daysSinceLastEntry === null ||
                    daysSinceLastEntry > red
                ),
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
