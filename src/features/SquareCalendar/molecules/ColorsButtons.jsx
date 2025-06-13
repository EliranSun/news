import { ColorButton } from "../atoms/ColorButton";
import PropTypes from "prop-types";
import { useColorPercentage } from "../useColorPercentage";
import { getDaysInMonth } from "date-fns";
import classNames from "classnames";
import { useMemo } from "react";

export const ColorsButtons = ({
    data,
    calendar,
    onColorSelect,
    selectedColorClass,
    selectedDate,
    monthIndex,
    display = "default"
}) => {
    const month = useMemo(() => new Date(selectedDate.getFullYear(), monthIndex, 1), [selectedDate, monthIndex]);
    const daysInMonth = useMemo(() => getDaysInMonth(month), [month]);
    const currentMonthDays = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(month.getFullYear(), month.getMonth(), i + 1),
        previousMonth: false
    })), [month, daysInMonth]);

    const colorPercentages = useColorPercentage(data, currentMonthDays);

    if (!calendar) return null;

    return (
        <div className={classNames("flex items-start overflow-x-auto h-fit w-full", {
            "gap-1 flex-nowrap": display === "compact",
            "gap-1 flex-wrap": display === "default"
        })}>
            {calendar.colors.map(color =>
                <ColorButton
                    key={color}
                    color={color}
                    display={display}
                    selectedColorClass={selectedColorClass}
                    legend={calendar.legend?.find(item => item.color === color)}
                    onClick={() => onColorSelect(color)}
                    count={colorPercentages.find(item => item.color === color)?.count}
                    percentage={colorPercentages.find(item => item.color === color)?.percentage}
                />
            )}
            <ColorButton
                color="⬜️"
                display={display}
                onClick={() => onColorSelect('clear')} />
        </div>
    )
}

ColorsButtons.propTypes = {
    calendar: PropTypes.object.isRequired,
    onColorSelect: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    monthIndex: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    selectedColorClass: PropTypes.string.isRequired
}

