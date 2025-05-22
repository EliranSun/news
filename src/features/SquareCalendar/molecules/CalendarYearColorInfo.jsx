import PropTypes from "prop-types";
import { getColorsClassList } from "../utils";
import { useColorPercentage } from "../useColorPercentage";
import { getDaysInYear } from "date-fns";

export const CalendarYearColorInfo = ({ data, selectedDate = new Date() }) => {
    const year = new Date(selectedDate.getFullYear(), 0, 1);
    const daysInYear = getDaysInYear(year);
    const currentYearDays = Array.from({ length: daysInYear }, (_, i) => ({
        date: new Date(year.getFullYear(), year.getMonth(), i + 1),
        previousMonth: false
    }));

    const colorPercentages = useColorPercentage(data, currentYearDays);

    if (colorPercentages.length === 0) {
        return null;
    }

    return (
        <div className="flex gap-1 w-full justify-center">
            {colorPercentages.map(({ color, percentage }) => (
                <div
                    key={color}
                    className="flex items-center gap-1 text-[8px] inter-500"
                    title={`${color}: ${percentage}%`}>
                    <div className={`size-2 ${getColorsClassList(color)}`}></div>
                    <span>{percentage}%</span>
                </div>
            ))}
        </div>
    )
};

CalendarYearColorInfo.propTypes = {
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date),
};