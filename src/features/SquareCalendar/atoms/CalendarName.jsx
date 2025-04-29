import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarName = ({ calendar, variant, date, withDate = false }) => {
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
            {withDate && (
                <span className="text-lg font-bold">
                    {date
                        ? `${new Date(date).getFullYear()} ${new Date(date).toLocaleDateString('en-US', { month: 'long' })}`
                        : `${new Date().getFullYear()} ${new Date().getMonth()}`}
                </span>
            )}
        </div>
    );
};

CalendarName.propTypes = {
    calendar: PropTypes.object.isRequired,
    variant: PropTypes.string,
    withDate: PropTypes.bool,
};
