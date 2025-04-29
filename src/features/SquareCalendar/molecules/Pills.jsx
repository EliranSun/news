import { Pill } from "../atoms/Pill";
import { subDays, isSameDay, format, subMonths } from "date-fns";
import PropTypes from "prop-types";

export const Pills = ({ type = "day", length = 10, selectedDate, setSelectedDate }) => {
    return (
        <div className="flex gap-1 overflow-x-auto min-h-fit">
            {Array.from({ length }).map((_, index) => {
                const date = type === "day" ? subDays(new Date(), index) : subMonths(new Date(), index);
                const isSelected = isSameDay(date, selectedDate);

                return (
                    <Pill
                        key={format(date, 'yyyy-MM-dd')}
                        isSelected={isSelected}
                        onClick={() => setSelectedDate(date)}
                    >
                        {format(date, type === "day" ? 'MMM d' : 'MMM')}
                    </Pill>
                );
            })}
        </div>
    );
};


Pills.propTypes = {
    type: PropTypes.oneOf(["day", "month"]),
    length: PropTypes.number,
    selectedDate: PropTypes.date,
    setSelectedDate: PropTypes.func
};


