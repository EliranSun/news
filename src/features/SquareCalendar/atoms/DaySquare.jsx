import PropTypes from "prop-types";
import { getColorsClassList } from "../utils";
import { useMemo } from "react";
import classNames from "classnames";

export const DaySquare = ({ dayObj, selectedDate, setSelectedDate, data, size = "small" }) => {
    const isToday = dayObj.date.toDateString() === selectedDate.toDateString();
    const colorClass = useMemo(() => {
        const color = data.find(item => new Date(item.date).toDateString() === dayObj.date.toDateString())?.color;
        return color && getColorsClassList(color);
    }, [data, dayObj.date]);

    return (
        <div
            onClick={() => setSelectedDate(dayObj.date)}
            className={classNames(colorClass, {
                "border-2 border-amber-500": Boolean(dayObj.note),
                "text-[8px] flex justify-center items-center": true,
                "size-4 rounded-[2px]": size === "small",
                "size-12 rounded-md": size === "big",
                "bg-gray-100 dark:bg-gray-900": !dayObj.previousMonth && !isToday && !colorClass,
                "opacity-0": dayObj.previousMonth,
                "border-2 border-black dark:border-white": !dayObj.previousMonth && isToday,
            })}>
            {(!dayObj.previousMonth && isToday)
                ? dayObj.date.toLocaleString('default', { day: 'numeric' })
                : null}
        </div>
    );
}

DaySquare.propTypes = {
    dayObj: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
    dayIndex: PropTypes.number.isRequired,
};
