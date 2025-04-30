import { Colors, ColorHexMap, TailwindColorsMap } from "../SquareCalendar/constants";

export const Hours = new Array(24)
    .fill(0)
    .map((_, hour) => {
        return hour < 10 ? `0${hour}:00` : `${hour}:00`;
    }); // every 60 minutes

export const START_HOUR = 7;
export const END_HOUR = 21;

export const HourlyActivitiesMap = [
    {
        "id": 1,
        "activity": "Chill",
        "hex": ColorHexMap[Colors.Purple],
        "color": TailwindColorsMap[Colors.Purple],
        "icon": "🥤"
    },
    {
        "id": 2,
        "activity": "Bonella",
        "hex": ColorHexMap[Colors.Maroon],
        "color": TailwindColorsMap[Colors.Maroon],
        "icon": "🍷"
    },
    {
        "id": 3,
        "activity": "CSS",
        "hex": ColorHexMap[Colors.Yellow],
        "color": TailwindColorsMap[Colors.Yellow],
        "icon": "💻"
    },
    {
        "id": 4,
        "activity": "Read",
        "hex": ColorHexMap[Colors.Green],
        "color": TailwindColorsMap[Colors.Green],
        "icon": "📚"
    },
    {
        "id": 5,
        "activity": "Entertainment",
        "hex": ColorHexMap[Colors.Blue],
        "color": TailwindColorsMap[Colors.Blue],
        "icon": "🎥"
    },
    {
        "id": 6,
        "activity": "Prepare",
        "hex": ColorHexMap[Colors.Red],
        "color": TailwindColorsMap[Colors.Red],
        "icon": "🍳"
    },
    {
        "id": 7,
        "activity": "WebDev",
        "hex": ColorHexMap[Colors.Orange],
        "color": TailwindColorsMap[Colors.Orange],
        "icon": "🌐"
    },
];
