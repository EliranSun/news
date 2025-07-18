import { Colors, Calendars, TailwindColorsMap } from "./constants";
import { differenceInDays, isEqual, addDays, startOfDay } from "date-fns";

export const getDaysSinceLastEntry = (data) => {
    if (!data || data.length === 0) {
        return null; // No entries exist
    }

    const validEntries = data.filter(item => item.color !== Colors.Black);

    if (validEntries.length === 0) {
        return null; // No valid entries exist
    }

    const sortedDates = validEntries
        .map(item => new Date(item.date))
        .sort((a, b) => b - a);

    const lastEntryDate = sortedDates[0];
    const today = new Date();

    // Compare only the date part (ignore time)
    const isSameDay = today.toDateString() === lastEntryDate.toDateString();

    if (isSameDay) {
        return 0; // Still today, so 0 hours passed
    }

    const msDiff = today - lastEntryDate;
    const hoursPassed = Math.floor(msDiff / (1000 * 60 * 60));

    return hoursPassed || null;
};


export const getStreakCount = (data, key) => {
    if (!data || data.length === 0) {
        return 0; // No entries exist
    }

    const isAvoid = Object.values(Calendars).find(calendar => calendar.key === key)?.avoid;

    // Filter out entries with "black" color
    const validEntries = data.filter(item => isAvoid
        ? item.color === Colors.Black
        : item.color !== Colors.Black);

    if (validEntries.length === 0) {
        return null; // No valid entries exist
    }

    // Convert all dates to Date objects (using startOfDay to normalize times)
    // and sort in descending order (newest first)
    const dates = validEntries.map(item => startOfDay(new Date(item.date)));

    // Remove any duplicate dates (in case multiple entries on same day)
    const uniqueDates = [...new Set(dates.map(date => date.getTime()))]
        .map(time => new Date(time))
        .sort((a, b) => b - a); // Sort in descending order

    const today = startOfDay(new Date());

    // If most recent entry is before yesterday, no active streak
    if (differenceInDays(today, uniqueDates[0]) > 1) {
        return 0;
    }

    // Count consecutive days starting from the most recent entry
    let streak = 1; // Start with 1 to count the first entry
    let currentDate = uniqueDates[0];

    // Check for consecutive days going backwards
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

export const getHighestStreakCount = (data, key) => {
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

    // fetch("https://walak.vercel.app/api/store-blocks-data", {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         data,
    //         key
    //     })
    // }).then(res => res.json()).then(data => {
    //     console.log("saved to storage", data);
    // }).catch(err => {
    //     console.error("error saving to storage", err);
    // });
};

export const loadFromStorage = (key = "square-calendar") => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading data from storage:', error);
        return [];
    }

    // try {
    //     const res = await fetch(`https://walak.vercel.app/api/store-blocks-data?key=${key}`, {
    //         method: 'GET',
    //     });

    //     const data = await res.json();
    //     return data || [];
    // } catch (err) {
    //     console.error("error loading from storage", err);
    //     return [];
    // }
};

export const getColorsClassList = (color) => {
    return TailwindColorsMap[color] || "";
};

export const exportCalendarData = async () => {
    // Create an object to hold all calendar data
    const allData = {};

    // For each calendar in Calendars, get its data from localStorage
    await Promise.all(Object.values(Calendars).map(async calendar => {
        const key = calendar.key;
        const data = await loadFromStorage(key);
        allData[key] = data;
    }));

    // Convert to JSON string with pretty formatting
    const dataString = JSON.stringify(allData, null, 2);

    // Create a Blob with the data
    const blob = new Blob([dataString], { type: 'application/json' });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-data-${new Date().toJSON()}.json`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
};

export const importCalendarData = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Handle file selection
    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected');
            document.body.removeChild(fileInput);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);

                // Validate the data structure
                if (typeof importedData !== 'object') {
                    throw new Error('Invalid data format');
                }

                // Import data for each calendar
                Object.keys(importedData).forEach(key => {
                    // Check if the calendar exists in our current configuration
                    const calendarExists = Object.values(Calendars).some(cal => cal.key === key);

                    if (calendarExists && Array.isArray(importedData[key])) {
                        // Save the imported data to localStorage
                        saveToStorage(key, importedData[key]);
                    }
                });

                alert('Calendar data imported successfully');
            } catch (error) {
                console.error('Error importing data:', error);
                alert('Failed to import calendar data: ' + error.message);
            }

            // Clean up
            document.body.removeChild(fileInput);
        };

        reader.onerror = () => {
            alert('Error reading file');
            document.body.removeChild(fileInput);
        };

        reader.readAsText(file);
    };

    // Trigger file selection dialog
    fileInput.click();
};

export const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    // return new Date(date1).getTime() === new Date(date2).getTime();
    return new Date(date1).toDateString() === new Date(date2).toDateString();
};

export const contrastColor = ({
    bgColor = '#FFFFFF',
    fgDarkColor = '#000000',
    fgLightColor = '#FFFFFF',
    defaultColor = '#000000',
    threshold = 128,
} = {}) => {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

    let bgColorArray = String(bgColor)
        .toUpperCase()
        .split('')
        .filter(c => hexChars.includes(c))

    switch (bgColorArray.length) {
        case 3:
        case 4:
            bgColorArray = bgColorArray.slice(0, 3).map(c => `${c}${c}`)
            break
        case 6:
        case 8:
            bgColorArray = bgColorArray
                .slice(0, 6)
                .reduce((acc, curr, n, arr) => n % 2 ? [...acc, `${arr[n - 1]}${curr}`] : acc, [])
            break
        default:
            return defaultColor
    }

    const [r, g, b] = bgColorArray.map(h => parseInt(h, 16))
    const yiq = (r * 299 + g * 587 + b * 114) / 1000

    return yiq >= threshold ? fgDarkColor : fgLightColor
};