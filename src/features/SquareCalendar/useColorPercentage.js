import { useMemo } from "react";
export const useColorPercentage = (data, monthDays) => {
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

    return colorPercentages;
}