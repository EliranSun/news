import PropTypes from "prop-types";
import classNames from "classnames";

export const CalendarName = ({ calendar, variant, date = new Date(), withDate = false }) => {
    return (
        <div className={classNames({
            "flex items-center gap-2 font-mono text-black dark:text-white": true,
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
                    {new Date(date).getFullYear()}
                </span>
            )}
        </div>
    );
};

CalendarName.propTypes = {
    calendar: PropTypes.object.isRequired,
    variant: PropTypes.string,
    withDate: PropTypes.bool,
    date: PropTypes.object,
};
