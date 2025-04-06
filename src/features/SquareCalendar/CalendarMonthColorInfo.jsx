import PropTypes from "prop-types";
import { getColorsClassList } from "./utils";
import { useMemo } from "react";

export const CalendarMonthColorInfo = ({ monthDays, data }) => {
    // Calculate color percentages
    const colorPercentages = useMemo(() => {
        if (!monthDays || monthDays.length === 0 || !data || data.length === 0) {
            return [];
        }

        // Get all dates in the current month
        const monthDayDates = monthDays.map(day => day.date.toDateString());

        // Filter data entries to only include those from the current month
        const monthEntries = data.filter(item => {
            const itemDate = new Date(item.date).toDateString();
            return monthDayDates.includes(itemDate);
        });

        if (monthEntries.length === 0) {
            return [];
        }

        // Count occurrences of each color
        const colorCounts = {};
        monthEntries.forEach(entry => {
            if (entry.color) {
                colorCounts[entry.color] = (colorCounts[entry.color] || 0) + 1;
            }
        });

        // Calculate percentages
        return Object.entries(colorCounts).map(([color, count]) => ({
            color,
            percentage: Math.round((count / monthDays.length) * 100),
            count
        })).sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending
    }, [monthDays, data]);

    if (colorPercentages.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1 justify-center text-[8px] mb-1 px-1">
            {colorPercentages.map(({ color, percentage }) => (
                <div
                    key={color}
                    className="flex items-center gap-1"
                    title={`${color}: ${percentage}%`}
                >
                    <div className={`size-2 rounded-sm ${getColorsClassList(color)}`}></div>
                    <span>{percentage}%</span>
                </div>
            ))}
        </div>
    );
};

CalendarMonthColorInfo.propTypes = {
    monthDays: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};
