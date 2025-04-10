import { getDaysInMonth, getDay, startOfMonth, subMonths } from "date-fns";
import PropTypes from "prop-types";
import { DaySquare } from "./DaySquare";

export const CalendarMonth = ({ selectedDate, setSelectedDate, data, monthIndex }) => {
    const month = new Date(selectedDate.getFullYear(), monthIndex, 1);
    const daysInMonth = getDaysInMonth(month);
    const startDay = getDay(startOfMonth(month)); // 0 = Sunday, 1 = Monday, etc.
    const prevMonth = subMonths(month, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    const previousMonthDays = Array.from({ length: startDay }, (_, i) => ({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - startDay + i + 1),
        previousMonth: true
    }));

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(month.getFullYear(), month.getMonth(), i + 1),
        previousMonth: false
    }));

    const allDays = [...previousMonthDays, ...currentMonthDays];

    return (
        <div className="flex flex-col my-1" key={`month-${monthIndex}`}>
            <div className="flex justify-between items-center">
                <h2 className="text-xs inter-500">
                    {month.toLocaleString('default', { month: 'short' })}
                </h2>
            </div>
            <div className="grid grid-cols-7 p-1 gap-0.5">
                {allDays.map((dayObj, dayIndex) => {
                    return (
                        <DaySquare
                            monthIndex={monthIndex}
                            dayIndex={dayIndex}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            data={data}
                            key={`month-${monthIndex}-day-${dayIndex}`}
                            dayObj={dayObj} />
                    );
                })}
            </div>
        </div>
    )
};

CalendarMonth.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
};