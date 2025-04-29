import classNames from "classnames";
import { CalendarItem } from "./CalendarItem";
import PropTypes from "prop-types";
export const CalendarList = ({ calendars, onClick, category }) => {
    return (
        <div
            className={classNames({
                "p-2 rounded-xl gap-1 flex flex-col": true,
                "bg-gray-100 dark:bg-gray-900": true
            })}>
            <h3 className="font-bold">
                {category}
            </h3>
            {calendars.map((calendar) => (
                <CalendarItem
                    key={calendar.key}
                    calendar={calendar}
                    onClick={onClick} />
            ))}
        </div>
    );
};

CalendarList.propTypes = {
    calendars: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
};