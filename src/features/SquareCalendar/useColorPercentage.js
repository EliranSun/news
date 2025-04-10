import { useMemo } from "react";

export const useColorPercentage = (data, days) => {
    const colorPercentages = useMemo(() => {
        if (!days || days.length === 0 || !data || data.length === 0) {
            return [];
        }

        const dayDates = days.map(day => day.date.toDateString());

        const entries = data.filter(item => {
            const itemDate = new Date(item.date).toDateString();
            return dayDates.includes(itemDate);
        });

        if (entries.length === 0) {
            return [];
        }

        const colorCounts = {};
        entries.forEach(entry => {
            if (entry.color) {
                colorCounts[entry.color] = (colorCounts[entry.color] || 0) + 1;
            }
        });

        return Object.entries(colorCounts).map(([color, count]) => ({
            color,
            percentage: Math.round((count / days.length) * 100),
            count
        })).sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending
    }, [days, data]);

    return colorPercentages;
}