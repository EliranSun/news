import { Pill } from "../atoms/Pill";
import { subDays, isSameDay, format, subMonths, isSameMonth, isSameWeek } from "date-fns";
import PropTypes from "prop-types";

export const DateStrip = ({ type = "day", length = 10, selectedDate, setSelectedDate }) => {
    return (
        <div className="flex gap-1 overflow-x-auto min-h-fit
        py-2 bg-stone-50 dark:bg-stone-900">
            {Array.from({ length }).map((_, index) => {
                const date = type === "day" ? subDays(new Date(), index) : type === "week" ? subDays(new Date(), index * 7) : subMonths(new Date(), index);
                const isSelected = type === "day" ? isSameDay(date, selectedDate) : type === "week" ? isSameWeek(date, selectedDate) : isSameMonth(date, selectedDate);

                return (
                    <Pill
                        key={format(date, 'yyyy-MM-dd')}
                        isSelected={isSelected}
                        onClick={() => setSelectedDate(date)}
                    >
                        {format(date, type === "day" ? 'MMM d' : type === "week" ? 'MMM d' : 'MMMM')}
                    </Pill>
                );
            })}
        </div>
    );
};


DateStrip.propTypes = {
    type: PropTypes.oneOf(["day", "month"]),
    length: PropTypes.number,
    selectedDate: PropTypes.date,
    setSelectedDate: PropTypes.func
};


