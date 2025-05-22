import PropTypes from "prop-types";
import { contrastColor, getColorsClassList } from "../utils";
import { useMemo } from "react";
import classNames from "classnames";
import { ColorHexMap, TailwindColorsMap } from "../constants";
import { isSameDay } from "date-fns";

export const DaySquare = ({
    dayObj,
    selectedDate,
    onClick,
    onDoubleClick,
    data,
    size = "small",
    isSelected
}) => {
    const isToday = useMemo(() => {
        return isSameDay(dayObj.date, selectedDate);
    }, [dayObj.date, selectedDate]);

    const color = useMemo(() => {
        return data.find(item => isSameDay(new Date(item.date), dayObj.date))?.color;
    }, [data, dayObj.date]);

    const colorClass = useMemo(() => {
        return color && getColorsClassList(color);
    }, [color]);


    return (
        <div
            onClick={() => onClick(dayObj.date)}
            style={{ color: contrastColor({ bgColor: ColorHexMap[color] }) }}
            onDoubleClick={() => onDoubleClick(dayObj.date)}
            className={classNames(colorClass, {
                "text-[7px] flex justify-center items-center": true,
                "size-4 rounded-[2px]": size === "small",
                "size-5 rounded mx-auto": size === "medium",
                "size-9 rounded-md mx-auto": size === "big",
                "bg-stone-200 dark:bg-stone-600": !colorClass,
                "opacity-0": dayObj.previousMonth,
                "border-2 border-black dark:border-white": isToday
            })}>
            {/* {isToday
                ? dayObj.date.toLocaleString('default', { day: 'numeric' })
                : dayObj.note ? "●" : ""} */}
            {dayObj.date.toLocaleString('default', { day: 'numeric' })}
        </div>
    );
}

DaySquare.propTypes = {
    dayObj: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    size: PropTypes.string,
    hasNote: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
};
