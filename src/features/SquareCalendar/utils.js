import { Colors, Calendars } from "./constants";
import { differenceInDays, isEqual, addDays, startOfDay } from "date-fns";

export const getDaysSinceLastEntry = (key = "square-calendar") => {
    const data = loadFromStorage(key);

    if (!data || data.length === 0) {
        return null; // No entries exist
    }

    // Filter out entries with "black" color
    const validEntries = data.filter(item => item.color !== Colors.Black);

    if (validEntries.length === 0) {
        return null; // No valid entries exist
    }

    // Find the most recent date entry
    const sortedDates = validEntries
        .map(item => new Date(item.date))
        .sort((a, b) => b - a); // Sort in descending order (newest first)

    const lastEntryDate = sortedDates[0];
    const today = new Date();

    return differenceInDays(today, lastEntryDate);
};

export const getStreakCount = (key = "square-calendar") => {
    const data = loadFromStorage(key);

    if (!data || data.length === 0) {
        return 0; // No entries exist
    }

    const isAvoid = Object.values(Calendars).find(calendar => calendar.key === key)?.avoid;

    // Filter out entries with "black" color
    const validEntries = data.filter(item => isAvoid
        ? item.color === Colors.Black
        : item.color !== Colors.Black);

    if (validEntries.length === 0) {
        return 0; // No valid entries exist
    }

    // Convert all dates to Date objects (using startOfDay to normalize times)
    // and sort in descending order (newest first)
    const dates = validEntries.map(item => startOfDay(new Date(item.date)));

    // Remove any duplicate dates (in case multiple entries on same day)
    const uniqueDates = [...new Set(dates.map(date => date.getTime()))]
        .map(time => new Date(time))
        .sort((a, b) => b - a); // Sort in descending order

    const today = startOfDay(new Date());

    // Start counting streak from most recent entry
    let currentDate = uniqueDates[0];
    let streak = 1;

    // If most recent entry is before yesterday, no active streak
    if (differenceInDays(today, currentDate) > 1) {
        return 0;
    }

    // Check for consecutive days
    for (let i = 1; i < uniqueDates.length; i++) {
        const expectedPrevDate = startOfDay(addDays(currentDate, -1));
        const actualPrevDate = uniqueDates[i];

        // If the dates are consecutive
        if (isEqual(expectedPrevDate, actualPrevDate)) {
            streak++;
            currentDate = actualPrevDate;
        } else {
            // Streak is broken
            break;
        }
    }

    return streak;
};

export const getHighestStreakCount = (key = "square-calendar") => {
    const data = loadFromStorage(key);

    if (!data || data.length === 0) {
        return 0; // No entries exist
    }

    const isAvoid = Object.values(Calendars).find(calendar => calendar.key === key)?.avoid;

    // Filter out entries with "black" color
    const validEntries = data.filter(item => isAvoid
        ? item.color === Colors.Black
        : item.color !== Colors.Black);

    if (validEntries.length === 0) {
        return 0; // No valid entries exist
    }

    // Convert all dates to Date objects (using startOfDay to normalize times)
    const dates = validEntries.map(item => startOfDay(new Date(item.date)));

    // Remove any duplicate dates (in case multiple entries on same day)
    const uniqueDates = [...new Set(dates.map(date => date.getTime()))]
        .map(time => new Date(time))
        .sort((a, b) => a - b); // Sort in ascending order

    if (uniqueDates.length === 0) {
        return 0;
    }

    let highestStreak = 1;
    let currentStreak = 1;

    // Iterate through sorted dates to find consecutive sequences
    for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = uniqueDates[i - 1];
        const currentDate = uniqueDates[i];

        // Check if dates are consecutive (1 day apart)
        if (differenceInDays(currentDate, prevDate) === 1) {
            currentStreak++;
        } else {
            // Streak broken, check if it was the highest
            highestStreak = Math.max(highestStreak, currentStreak);
            currentStreak = 1;
        }
    }

    // Check one more time in case the highest streak is the current one
    highestStreak = Math.max(highestStreak, currentStreak);

    return highestStreak;
}

export const saveToStorage = (key = "square-calendar", data) => {
    localStorage.setItem(key, JSON.stringify(data));

}; export const loadFromStorage = (key = "square-calendar") => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading data from storage:', error);
        return [];
    }
};

const TailwindColorsMap = {
    [Colors.Clear]: "bg-transparent border",
    [Colors.Black]: "bg-neutral-700",
    [Colors.Red]: "bg-red-500",
    [Colors.Green]: "bg-green-500",
    [Colors.Blue]: "bg-blue-500",
    [Colors.Yellow]: "bg-yellow-500",
    [Colors.Purple]: "bg-purple-500",
    [Colors.Orange]: "bg-orange-500",
    [Colors.Coral]: "bg-orange-300",
    [Colors.Pink]: "bg-pink-500",
    [Colors.Forestgreen]: "bg-emerald-800",
    [Colors.Skyblue]: "bg-sky-400",
    [Colors.Plum]: "bg-fuchsia-500",
    [Colors.Turquoise]: "bg-teal-400",
    [Colors.Navy]: "bg-blue-800",
    [Colors.Brown]: "bg-amber-600",
    [Colors.Sage]: "bg-green-400",
    [Colors.Violet]: "bg-violet-500",
    [Colors.Crimson]: "bg-red-600",
    [Colors.Lightblue]: "bg-blue-200",
    [Colors.Lavender]: "bg-purple-200",
    [Colors.Rose]: "bg-rose-500",
    [Colors.Hotpink]: "bg-pink-600",
    [Colors.Darkgray]: "bg-gray-500",
    [Colors.Maroon]: "bg-red-900",
};

export const getColorsClassList = (color) => {
    return TailwindColorsMap[color] || "";
};