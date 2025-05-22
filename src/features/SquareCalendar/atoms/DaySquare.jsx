import PropTypes from "prop-types";
import { contrastColor, getColorsClassList } from "../utils";
import { useMemo, useContext, useRef, useEffect } from "react";
import classNames from "classnames";
import { ColorHexMap, TailwindColorsMap } from "../constants";
import { isSameDay } from "date-fns";
import { PointerContext } from "../PointerContext";

export const DaySquare = ({
    dayObj,
    selectedDate,
    onClick,
    onDoubleClick,
    data,
    size = "small",
    isSelected,
    infoState
}) => {
    // const ref = useRef(null);
    const { setPointerX, setPointerY } = useContext(PointerContext);
    const isToday = useMemo(() => {
        return isSameDay(dayObj.date, selectedDate);
    }, [dayObj.date, selectedDate]);

    const color = useMemo(() => {
        return data.find(item => isSameDay(new Date(item.date), dayObj.date))?.color;
    }, [data, dayObj.date]);

    const colorClass = useMemo(() => {
        return color && getColorsClassList(color);
    }, [color]);

    // useEffect(() => {
    //     if (ref.current) {
    //         ref.current.addEventListener("mousedown", event => {
    //             event.preventDefault();
    //             event.stopPropagation();

    //             console.log("mousedown");

    //         });

    //         ref.current.addEventListener("mouseup", (event) => {
    //             event.preventDefault();
    //             event.stopPropagation();

    //             setPointerX(null);
    //             setPointerY(null);
    //         });
    //     }
    // }, [ref, setPointerX, setPointerY]);


    return (
        <div
            // ref={ref}
            onClick={event => {
                setPointerX(event.clientX);
                setPointerY(event.clientY);
                onClick(dayObj.date);
            }}
            style={{ color: contrastColor({ bgColor: ColorHexMap[color] }) }}
            // onDoubleClick={() => onDoubleClick(dayObj.date)}
            className={classNames(colorClass, {
                "text-[7px] flex justify-center items-center": true,
                "size-4 rounded-[2px]": size === "small",
                "size-5 rounded mx-auto": size === "medium",
                "size-9 rounded-md mx-auto": size === "big",
                "bg-stone-200 dark:bg-stone-600": !colorClass,
                "opacity-0": dayObj.previousMonth,
                "border-2 border-black dark:border-white": isToday
            })}>
            {infoState === "days"
                ? dayObj.date.toLocaleString('default', { day: 'numeric' })
                : infoState === "notes"
                    ? dayObj.note ? "●" : ""
                    : ""}
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
