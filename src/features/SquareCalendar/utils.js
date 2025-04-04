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

export const getColorsClassList = (color) => {
    return {
        "bg-transparent border": color === Colors.Clear,
        "bg-neutral-700": color === Colors.Black,
        "bg-red-500": color === Colors.Red,
        "bg-green-500": color === Colors.Green,
        "bg-blue-500": color === Colors.Blue,
        "bg-yellow-500": color === Colors.Yellow,
        "bg-purple-500": color === Colors.Purple,
        "bg-orange-500": color === Colors.Orange,
        "bg-orange-300": color === Colors.Coral,
        "bg-pink-500": color === Colors.Pink,
        "bg-emerald-800": color === Colors.Forestgreen,
        "bg-sky-400": color === Colors.Skyblue,
        "bg-fuchsia-500": color === Colors.Plum,
        "bg-teal-400": color === Colors.Turquoise,
        "bg-blue-800": color === Colors.Navy,
        "bg-amber-600": color === Colors.Brown,
        "bg-green-400": color === Colors.Sage,
        "bg-violet-500": color === Colors.Violet,
        "bg-red-600": color === Colors.Crimson,
        "bg-blue-200": color === Colors.Lightblue,
        "bg-purple-200": color === Colors.Lavender,
        "bg-rose-500": color === Colors.Rose,
        "bg-pink-600": color === Colors.Hotpink,
        "bg-gray-500": color === Colors.Darkgray,
        "bg-red-900": color === Colors.Maroon,
    }
};