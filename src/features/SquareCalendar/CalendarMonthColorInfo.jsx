import PropTypes from "prop-types";
import { getColorsClassList } from "./utils";
import { useColorPercentage } from "./useColorPercentage";
import { getDaysInMonth } from "date-fns";

const MonthColorInfo = ({ data, monthIndex, selectedDate, monthName }) => {
    const month = new Date(selectedDate.getFullYear(), monthIndex, 1);
    const daysInMonth = getDaysInMonth(month);
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(month.getFullYear(), month.getMonth(), i + 1),
        previousMonth: false
    }));

    const colorPercentages = useColorPercentage(data, currentMonthDays);

    if (colorPercentages.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="">{monthName}</h2>
        {colorPercentages.map(({ color, percentage }) => (
            <div
                key={color}
                className="flex items-center gap-1"
                title={`${color}: ${percentage}%`}>
                <div className={`size-4 rounded-sm ${getColorsClassList(color)}`}></div>
                <span>{percentage}%</span>
            </div>
        )}
        </>
    );
};

MonthColorInfo.propTypes = {
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    monthName: PropTypes.string.isRequired
};

export const CalendarMonthColorInfo = ({ data, selectedDate }) => {

    return (
        <div className="flex flex-col gap-1 justify-center mb-1 px-1">
            {new Array(12).fill(0).map((_, monthIndex) => {
                const monthName = new Date(selectedDate.getFullYear(), monthIndex, 1)
                    .toLocaleString('default', { month: 'short' });

                return (
                    <div key={monthIndex} className="flex items-center gap-3">
                        <MonthColorInfo
                            data={data}
                            monthName={monthName}
                            monthIndex={monthIndex}
                            selectedDate={selectedDate}
                        />
                    </div>
                )
            })}
        </div>
    );
};

CalendarMonthColorInfo.propTypes = {
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired
};
