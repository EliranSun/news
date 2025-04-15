import PropTypes from "prop-types";
import { getColorsClassList } from "../utils";
import { useColorPercentage } from "../useColorPercentage";
import { getDaysInMonth } from "date-fns";

const MonthColorInfo = ({ data, monthIndex, selectedDate, monthName }) => {
    const month = new Date(selectedDate.getFullYear(), monthIndex, 1);
    const daysInMonth = getDaysInMonth(month);
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(month.getFullYear(), month.getMonth(), i + 1),
        previousMonth: false
    }));

    const colorPercentages = useColorPercentage(data, currentMonthDays);

    return (
        <div className="flex items-center justify-center gap-2 font-mono text-[8px] h-5">
            {colorPercentages.map(({ color, percentage }) => (
                <div
                    key={color}
                    className="flex flex-col items-center gap-0 font-mono text-[8px]"
                    title={`${color}: ${percentage}%`}>
                    <div className={`size-2 rounded-sm ${getColorsClassList(color)}`}></div>
                    <span>{percentage}%</span>
                </div>
            ))}
        </div>
    );
};

MonthColorInfo.propTypes = {
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    monthName: PropTypes.string.isRequired
};

export const CalendarMonthColorInfo = ({ data, selectedDate, showInfo }) => {
    const monthName = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
        .toLocaleString('default', { month: 'short' });

    return (
        <div className={`${showInfo ? 'opacity-100' : 'opacity-0'}`}>
            <MonthColorInfo
                data={data}
                monthName={monthName}
                monthIndex={selectedDate.getMonth()}
                selectedDate={selectedDate}
            />
        </div>
    );
};

CalendarMonthColorInfo.propTypes = {
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired
};
