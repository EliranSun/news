import { ColorButton } from "../atoms/ColorButton";
import PropTypes from "prop-types";
import { useColorPercentage } from "../useColorPercentage";
import { getDaysInMonth } from "date-fns";

export const ColorsButtons = ({ data, calendar, onColorSelect, selectedDate, monthIndex }) => {
    const month = new Date(selectedDate.getFullYear(), monthIndex, 1);
    const daysInMonth = getDaysInMonth(month);
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(month.getFullYear(), month.getMonth(), i + 1),
        previousMonth: false
    }));

    const colorPercentages = useColorPercentage(data, currentMonthDays);

    if (!calendar) return null;

    return (
        <div className="flex items-start overflow-x-auto gap-1 min-h-fit w-full">
            {calendar.colors.map(color =>
                <ColorButton
                    key={color}
                    color={color}
                    legend={calendar.legend?.find(item => item.color === color)}
                    onClick={() => onColorSelect(color)}
                    count={colorPercentages.find(item => item.color === color)?.count}
                    percentage={colorPercentages.find(item => item.color === color)?.percentage}
                />
            )}
            <ColorButton color="⬜️" onClick={() => onColorSelect('clear')} />
        </div>
    )
}

ColorsButtons.propTypes = {
    calendar: PropTypes.object.isRequired,
    onColorSelect: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    monthIndex: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
}

