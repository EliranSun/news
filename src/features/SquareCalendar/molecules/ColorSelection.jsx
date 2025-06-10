import PropTypes from "prop-types";
import { isSameDay } from "date-fns";
import { contrastColor } from "../utils";
import { ColorHexMap, TailwindColorsMap } from "../constants";
import classNames from "classnames";

export const ColorSelection = ({ calendar, data, selectedDate, updateData }) => {
    return calendar.colors.map((color, index) => {
        const legendEntry = calendar.legend?.find(l => l.color === color);
        const label = legendEntry?.name || legendEntry?.label || color;
        const selectedColor = data.find(item => isSameDay(item.date, selectedDate))?.color || color;

        return (
            <button
                key={index}
                style={{ color: contrastColor({ bgColor: ColorHexMap[color] }) }}
                onClick={() => {
                    updateData({ color, date: selectedDate, data, calendar });
                }}
                className={classNames(`p-4 h-10 flex items-center 
                            justify-center rounded-md ${TailwindColorsMap[color]}`, {
                    "border-4 border-stone-800 dark:border-stone-200 shadow-md": selectedColor !== color
                })}>
                {label}
            </button>
        )
    });
};

ColorSelection.propTypes = {
    calendar: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    updateData: PropTypes.func.isRequired
};