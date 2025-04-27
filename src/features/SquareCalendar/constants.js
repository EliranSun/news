export const Colors = {
    // Reds
    Red: "red",
    Crimson: "crimson",
    Maroon: "maroon",
    Coral: "coral",

    // Oranges
    Orange: "orange",

    // Yellows
    Yellow: "yellow",

    // Greens
    Green: "green",
    Sage: "sage",
    Forestgreen: "forestgreen",

    // Blues
    Blue: "blue",
    Lightblue: "lightblue",
    Skyblue: "skyblue",
    Turquoise: "turquoise",
    Navy: "navy",

    // Purples
    Violet: "violet",
    Plum: "plum",
    Purple: "purple",
    Lavender: "lavender",

    // Pinks
    Pink: "pink",
    Rose: "rose",
    Hotpink: "hotpink",

    // Browns / Neutrals
    Brown: "brown",
    Darkgray: "darkgray",

    // Others
    Black: "black",
    Clear: "clear",
}

export const Calendars = {
    // Self - Using vibrant, energetic colors for personal development
    Mood: {
        name: "mood",
        key: "mood-square-tracker",
        colors: [
            Colors.Yellow,
            Colors.Orange,
            Colors.Crimson,
            Colors.Blue,
            Colors.Violet
        ],
        legend: [
            { name: "Great", color: Colors.Yellow },
            { name: "Good", color: Colors.Orange },
            { name: "OK", color: Colors.Crimson },
            { name: "Bad", color: Colors.Blue },
            { name: "Awful", color: Colors.Violet },
        ],
        icon: "🌀",
        category: "self",
        showGamification: false,
    },
    Loneliness: {
        name: "loneliness",
        key: "loneliness-square-tracker",
        colors: [
            Colors.Forestgreen,
            Colors.Green,
            Colors.Turquoise,
        ],
        legend: [
            { name: "Belong", color: Colors.Forestgreen },
            { name: "Neutral", color: Colors.Green },
            { name: "Lonely", color: Colors.Turquoise },
        ],
        icon: "😶‍🌫️",
        category: "self",
        showGamification: false,
    },
    Css: {
        name: "css",
        key: "css-square-calendar",
        colors: [Colors.Yellow, Colors.Black],
        icon: "🎭",
        category: "creative",
        showColorStatus: true,
        yellowAfter: 3,
        redAfter: 10,
    },
    Read: {
        showColorStatus: true,
        yellowAfter: 2,
        redAfter: 5,
        name: "read",
        key: "read-square-calendar",
        colors: [Colors.Sage, Colors.Black],
        icon: "📚",
        category: "creative"
    },
    Game: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "game",
        key: "game-square-calendar",
        colors: [Colors.Violet, Colors.Black],
        icon: "🎮",
        category: "creative"
    },
    Media: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "TV/Film",
        key: "media-square-calendar",
        colors: [Colors.Crimson, Colors.Black],
        icon: "🎬",
        category: "creative"
    },

    // House - Using earthy, practical colors for household tasks
    House: {
        showColorStatus: true,
        yellowAfter: 5,
        redAfter: 10,
        name: "house care",
        key: "house-care-square-calendar",
        colors: [
            Colors.Red,
            Colors.Green,
            Colors.Blue,
            Colors.Yellow,
            Colors.Black
        ],
        legend: [
            { name: "Floor cleaning", color: Colors.Red },
            { name: "Organizing", color: Colors.Green },
            { name: "Dishes", color: Colors.Blue },
            { name: "Towels", color: Colors.Yellow },
        ],
        icon: "🏠",
        category: "house"
    },
    Laundry: {
        showColorStatus: true,
        yellowAfter: 5,
        redAfter: 10,
        name: "laundry",
        key: "laundry-square-calendar",
        colors: [
            Colors.Lightblue, 
            Colors.Skyblue, 
            Colors.Blue,
            Colors.Black
        ],
        legend: [
            { name: "Fold", color: Colors.Lightblue },
            { name: "Wash", color: Colors.Skyblue },
            { name: "Both", color: Colors.Blue },
        ],
        icon: "🧺",
        category: "house"
    },
    /* LaundryFold: {
        showColorStatus: true,
        yellowAfter: 5,
        redAfter: 10,
        name: "fold",
        key: "laundry-fold-square-calendar",
        colors: [Colors.Lightblue, Colors.Black],
        icon: "👕",
        category: "house"
    },*/
    Groceries: {
        showColorStatus: true,
        yellowAfter: 7,
        redAfter: 14,
        name: "groceries",
        key: "groceries-square-calendar",
        colors: [Colors.Forestgreen, Colors.Black],
        icon: "🛒",
        category: "house"
    },
    Cooking: {
        showColorStatus: true,
        yellowAfter: 2,
        redAfter: 5,
        name: "cooking",
        key: "cooking-square-calendar",
        colors: [Colors.Orange, Colors.Black],
        icon: "🍳",
        category: "house"
    },
    ReplaceSheets: {
        showColorStatus: true,
        yellowAfter: 14,
        redAfter: 30,
        name: "sheets",
        key: "replace-sheets-square-calendar",
        colors: [Colors.Lavender, Colors.Black],
        icon: "🛏️",
        category: "house"
    },

    // Wife - Using romantic, warm colors
    Date: {
        showColorStatus: true,
        yellowAfter: 7,
        redAfter: 14,
        name: "date",
        key: "date-square-calendar",
        colors: [Colors.Rose, Colors.Black],
        icon: "💑",
        category: "wife"
    },
    Sex: {
        showColorStatus: true,
        yellowAfter: 14,
        redAfter: 30,
        name: "sex",
        key: "sex-square-calendar",
        colors: [Colors.Hotpink, Colors.Black],
        icon: "❤️",
        category: "wife"
    },
    Weight: {
        showColorStatus: false,
        showGamification: false,
        name: "weight",
        key: "weight-square-calendar",
        colors: [
            Colors.Blue,
            Colors.Green,
            Colors.Yellow,
            Colors.Orange,
            Colors.Red,
        ],
        icon: "⏲️",
        category: "self",
        legend: [
            { name: "70-71", color: Colors.Blue },
            { name: "72-73", color: Colors.Green },
            { name: "74-75", color: Colors.Yellow },
            { name: "76-77", color: Colors.Orange },
            { name: "78-79", color: Colors.Red },
        ],
    },
    Physio: {
        showColorStatus: true,
        showGamification: true,
        name: "physio",
        key: "physiotherapy-square-calendar",
        colors: [
            Colors.Green,
            Colors.Sage,
            Colors.Forestgreen,
            Colors.Black
        ],
        legend: [
         { name: "deadhang", color: Colors.Green },
            { name: "knee", color: Colors.Sage },
            { name: "both", color: Colors.Forestgreen },
        ],
        icon: "🦶",
        category: "self",
    },
    Workout: {
        showColorStatus: true,
        showGamification: true,
        name: "workout",
        key: "workout-square-calendar",
        colors: [
            Colors.Red,
            Colors.Black
        ],
        icon: "🏋",
        category: "self",
    },
    Sleep: {
        showColorStatus: false,
        name: "REM",
        key: "rem-sleep-square-calendar",
        colors: [
            Colors.Lightblue,
            Colors.Skyblue,
            Colors.Blue,
            Colors.Navy,
            Colors.Violet,
            Colors.Purple
        ],
        icon: "💤",
        showGamification: false,
        category: "self",
        legend: [
            { name: "0:00-0:29", label: "horrible", color: Colors.Lightblue },
            { name: "0:30-0:59", label: "bad", color: Colors.Skyblue },
            { name: "1:00-1:29", label: "ok", color: Colors.Blue },
            { name: "1:30-1:59", label: "good", color: Colors.Navy },
            { name: "2:00-2:29", label: "great", color: Colors.Violet },
            { name: "2:30+", label: "fantastic", color: Colors.Purple },
        ],
    },
    SleepDeep: {
        showColorStatus: false,
        name: "DEEP",
        key: "deep-sleep-square-calendar",
        colors: [
            Colors.Lightblue,
            Colors.Skyblue,
            Colors.Blue,
            Colors.Navy,
            Colors.Violet,
            Colors.Purple
        ],
        icon: "💤",
        showGamification: false,
        category: "self",
        legend: [
            { name: "0-14", label: "horrible", color: Colors.Lightblue },
            { name: "15-29", label: "bad", color: Colors.Skyblue },
            { name: "30-44", label: "ok", color: Colors.Blue },
            { name: "45-59", label: "good", color: Colors.Navy },
            { name: "1:00-1:14", label: "great", color: Colors.Violet },
            { name: "1:15+", label: "fantastic", color: Colors.Purple },
        ],
    },
    Protein: {
        showColorStatus: false,
        showGamification: false,
        name: "Protein",
        key: "protein-sleep-square-calendar",
        colors: [
            Colors.Orange,
            Colors.Red,
            Colors.Crimson,
            Colors.Maroon,
        ],
        icon: "🍖",
        category: "self",
        legend: [
            { name: "0-50", color: Colors.Orange },
            { name: "51-100", color: Colors.Red },
            { name: "101-150", color: Colors.Crimson },
            { name: "151-200", color: Colors.Maroon },
        ],
    },
    Trip: {
        showColorStatus: true,
        yellowAfter: 14,
        redAfter: 30,
        name: "trip",
        key: "trip-square-calendar",
        colors: [Colors.Turquoise, Colors.Black],
        icon: "🌲",
        category: "wife"
    },
    LittleThings: {
        showColorStatus: true,
        yellowAfter: 21,
        redAfter: 30,
        name: "gestures",
        key: "little-things-square-calendar",
        colors: [Colors.Coral, Colors.Black],
        icon: "🎁",
        category: "wife"
    },

    // Social - Using friendly, welcoming colors
    Mom: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "mom",
        key: "mom-square-calendar",
        colors: [Colors.Purple, Colors.Black],
        icon: "👩🏾",
        category: "social"
    }, // Woman
    Dad: {
        showColorStatus: true,
        yellowAfter: 15,
        redAfter: 30,
        name: "dad",
        key: "dad-square-calendar",
        colors: [Colors.Navy, Colors.Black],
        icon: "👨🏾",
        category: "social"
    }, // Man
    Grandma: {
        showColorStatus: true,
        yellowAfter: 60,
        redAfter: 90,
        name: "grandma",
        key: "grandma-square-calendar",
        colors: [Colors.Plum, Colors.Black],
        icon: "👵🏾",
        category: "social"
    }, // Elderly woman
    Friends: {
        showColorStatus: true,
        yellowAfter: 10,
        redAfter: 20,
        icon: "👥",
        category: "social",
        name: "friends",
        key: "friends-square-calendar",
        colors: [
            Colors.Black,
            Colors.Yellow,
            Colors.Forestgreen,
            Colors.Hotpink,
            Colors.Coral,
            Colors.Rose,
            Colors.Skyblue,
            Colors.Turquoise,
            Colors.Purple,
            Colors.Violet,
            Colors.Orange,
        ],
        legend: [
            { name: "Ofir", color: Colors.Yellow },
            { name: "Nimrod", color: Colors.Forestgreen },
            { name: "Rotem", color: Colors.Hotpink },
            { name: "Maya", color: Colors.Coral },
            { name: "Liron", color: Colors.Rose },
            { name: "David", color: Colors.Skyblue },
            { name: "Oded", color: Colors.Turquoise },
            { name: "Yarden", color: Colors.Purple },
            { name: "Mika", color: Colors.Violet },
            { name: "Noa", color: Colors.Orange },
        ],
    },

    // avoid - Using darker, muted colors to represent negative activities
    SocialMedia: {
        name: "scrolling",
        key: "social-media-square-calendar",
        colors: [Colors.Darkgray, Colors.Black],
        icon: "📱",
        category: "avoid",
        avoid: true,
    },
    Porn: {
        name: "porn", key: "porn-square-calendar",
        colors: [Colors.Maroon, Colors.Black],
        icon: "⛔",
        category: "avoid",
        avoid: true,
    }, // No entry
    Masturbate: {
        name: "masturbate", key: "masturbate-square-calendar",
        colors: [Colors.Brown, Colors.Black],
        icon: "🚫",
        category: "avoid",
        avoid: true,
    }, // Prohibited
};

export const TailwindColorsMap = {
    [Colors.Clear]: "bg-transparent border",
    [Colors.Black]: "bg-gray-600",
    [Colors.Red]: "bg-red-500",
    [Colors.Green]: "bg-green-500",
    [Colors.Yellow]: "bg-yellow-500",
    [Colors.Orange]: "bg-orange-500",
    [Colors.Coral]: "bg-orange-300",
    [Colors.Pink]: "bg-pink-500",
    
    [Colors.Forestgreen]: "bg-emerald-600",
    [Colors.Plum]: "bg-fuchsia-500",
    [Colors.Turquoise]: "bg-teal-400",
    [Colors.Brown]: "bg-amber-600",
    [Colors.Sage]: "bg-green-400",

    // Blue & Purple
    [Colors.Lightblue]: "bg-blue-200",
    [Colors.Skyblue]: "bg-sky-300",
    [Colors.Blue]: "bg-blue-400",
    [Colors.Navy]: "bg-blue-600",
    [Colors.Violet]: "bg-violet-500",
    [Colors.Purple]: "bg-purple-700",

    [Colors.Crimson]: "bg-red-600",
    [Colors.Lavender]: "bg-purple-300",
    [Colors.Rose]: "bg-rose-500",
    [Colors.Hotpink]: "bg-pink-600",
    [Colors.Darkgray]: "bg-gray-300",
    [Colors.Maroon]: "bg-red-900",
};

export const ColorHexMap = {
    [Colors.Clear]: "#FFFFFF",
    [Colors.Black]: "#404040",
    [Colors.Red]: "#EF4444",
    [Colors.Green]: "#22C55E",
    [Colors.Yellow]: "#EAB308",
    [Colors.Orange]: "#F97316",
    [Colors.Coral]: "#FDBA74",
    [Colors.Pink]: "#EC4899",
    [Colors.Forestgreen]: "#065F46",
    [Colors.Plum]: "#D946EF",
    [Colors.Turquoise]: "#2DD4BF",
    [Colors.Brown]: "#D97706",
    [Colors.Sage]: "#4ADE80",

    // Blue & Purple
    [Colors.Lightblue]: "#BFDBFE",
    [Colors.Skyblue]: "#BAE6FD",
    [Colors.Blue]: "#60A5FA",
    [Colors.Navy]: "#2563EB",
    [Colors.Violet]: "#8B5CF6",
    [Colors.Purple]: "#581C87",

    [Colors.Crimson]: "#DC2626",
    [Colors.Lavender]: "#E9D5FF",
    [Colors.Rose]: "#F43F5E",
    [Colors.Hotpink]: "#DB2777",
    [Colors.Darkgray]: "#6B7280",
    [Colors.Maroon]: "#7F1D1D",
};

