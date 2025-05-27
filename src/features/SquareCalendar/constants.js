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
};

export const Categories = {
    Self: "self",
    Wife: "wife",
    Creative: "creative",
    House: "house",
    Friends: "friends",
    Avoid: "avoid",
    Shemesh: "shemesh",
    Family: "family"
};

export const Calendars = {
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
            Colors.Purple,
            Colors.Black,
        ],
        icon: "💤",
        showGamification: false,
        category: Categories.Self,
        legend: [
            { name: "0", label: "horrible", color: Colors.Lightblue },
            { name: "30", label: "bad", color: Colors.Skyblue },
            { name: "100", label: "ok", color: Colors.Blue },
            { name: "130", label: "good", color: Colors.Navy },
            { name: "200", label: "great", color: Colors.Violet },
            { name: "230+", label: "fantastic", color: Colors.Purple },
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
            Colors.Purple,
                        Colors.Black,
        ],
        icon: "💤",
        showGamification: false,
        category: Categories.Self,
        legend: [
            { name: "0", label: "horrible", color: Colors.Lightblue },
            { name: "15", label: "bad", color: Colors.Skyblue },
            { name: "30", label: "ok", color: Colors.Blue },
            { name: "45", label: "good", color: Colors.Navy },
            { name: "100", label: "great", color: Colors.Violet },
            { name: "115+", label: "fantastic", color: Colors.Purple },
        ],
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
        category: Categories.Self,
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
            { name: "DH", color: Colors.Green },
            { name: "knee", color: Colors.Sage },
            { name: "both", color: Colors.Forestgreen },
        ],
        icon: "🦶",
        category: Categories.Self,
    },
    Workout: {
        showColorStatus: true,
        showGamification: false,
        name: "workout",
        key: "workout-square-calendar",
        colors: [
            Colors.Red,
            Colors.Black
        ],
        icon: "🏋",
        category: Categories.Self,
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
            { name: "BEL", color: Colors.Forestgreen },
            { name: "NEU", color: Colors.Green },
            { name: "LON", color: Colors.Turquoise },
        ],
        icon: "😶‍🌫️",
        category: Categories.Self,
        showGamification: false,
    },
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
        category: Categories.Self,
        showGamification: false,
    },
    Css: {
        name: "css",
        key: "css-square-calendar",
        colors: [Colors.Yellow, Colors.Black],
        icon: "🎭",
        category: Categories.Creative,
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
        category: Categories.Creative
    },
    Draw: {
        showColorStatus: true,
        yellowAfter: 2,
        redAfter: 5,
        name: "draw",
        key: "draw-square-calendar",
        colors: [Colors.Sage, Colors.Black],
        icon: "🎨",
        category: Categories.Creative
    },
    Write: {
        showColorStatus: true,
        yellowAfter: 2,
        redAfter: 5,
        name: "write",
        key: "write-square-calendar",
        colors: [Colors.Sage, Colors.Black],
        icon: "✍️",
        category: Categories.Creative
    },
    Game: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "game",
        key: "game-square-calendar",
        colors: [Colors.Violet, Colors.Black],
        icon: "🎮",
        category: Categories.Creative,
        showGamification: false,
    },
    Media: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "TV/Film",
        key: "media-square-calendar",
        colors: [Colors.Crimson, Colors.Black],
        icon: "🎬",
        category: Categories.Creative,
        showGamification: false,
    },

    // House - Using earthy, practical colors for household tasks
    House: {
        showColorStatus: true,
        yellowAfter: 5,
        redAfter: 10,
        icon: "🏠",
        category: Categories.House,
        showGamification: false,
        name: "house care",
        key: "house-care-square-calendar",
        legend: [
            { name: "floor", color: Colors.Red },
            { name: "organize", color: Colors.Green },
            { name: "dishes", color: Colors.Blue },
            { name: "towels", color: Colors.Yellow },
            { name: "clean", color: Colors.Purple },
        ],
        colors: [
            Colors.Red,
            Colors.Green,
            Colors.Blue,
            Colors.Yellow,
            Colors.Purple,
            Colors.Black
        ],
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
        category: Categories.House,
        showGamification: false,
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
        category: Categories.House,
        showGamification: false,
    },
    Cooking: {
        showColorStatus: true,
        yellowAfter: 2,
        redAfter: 5,
        name: "cooking",
        key: "cooking-square-calendar",
        colors: [Colors.Orange, Colors.Black],
        icon: "🍳",
        category: Categories.House,
        showGamification: false,
    },
    ReplaceSheets: {
        showColorStatus: true,
        yellowAfter: 14,
        redAfter: 30,
        name: "sheets",
        key: "replace-sheets-square-calendar",
        colors: [Colors.Lavender, Colors.Black],
        icon: "🛏️",
        category: Categories.House,
        showGamification: false,
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
        category: Categories.Wife,
        showGamification: false,
    },
    Sex: {
        showColorStatus: true,
        yellowAfter: 14,
        redAfter: 30,
        name: "sex",
        key: "sex-square-calendar",
        colors: [Colors.Hotpink, Colors.Black],
        icon: "❤️",
        category: Categories.Wife,
        showGamification: false,
    },
    /* Protein: {
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
        category: Categories.Self,
        legend: [
            { name: "0", color: Colors.Orange },
            { name: "50", color: Colors.Red },
            { name: "100", color: Colors.Crimson },
            { name: "150+", color: Colors.Maroon },
        ],
    },*/
    Trip: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 14,
        redAfter: 30,
        name: "trip",
        key: "trip-square-calendar",
        colors: [Colors.Turquoise, Colors.Black],
        icon: "🌲",
        category: Categories.Wife,
    },
    LittleThings: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 21,
        redAfter: 30,
        name: "gestures",
        key: "little-things-square-calendar",
        colors: [Colors.Coral, Colors.Black],
        icon: "🎁",
        category: Categories.Wife,
    },
    Mom: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "mom",
        key: "mom-square-calendar",
        icon: "👩🏾",
        category: Categories.Family,
        colors: [
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "Visit", color: Colors.Purple },
            { name: "Call", color: Colors.Lavender },
        ]
    },
    Dad: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 15,
        redAfter: 30,
        name: "dad",
        key: "dad-square-calendar",
        category: Categories.Family,
        icon: "👨🏾",
        colors: [
            Colors.Navy,
            Colors.Blue,
            Colors.Black
        ],
        legend: [
            { name: "Visit", color: Colors.Navy },
            { name: "Call", color: Colors.Blue },
        ]
    },
    Grandma: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 60,
        redAfter: 90,
        name: "grandma",
        key: "grandma-square-calendar",
        colors: [
            Colors.Plum,
            Colors.Purple,
            Colors.Black
        ],
        legend: [
            { name: "Visit", color: Colors.Plum },
            { name: "Call", color: Colors.Purple },
        ],
        icon: "👵🏾",
        category: Categories.Family,
    },
    Mor: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "mor",
        key: "mor-square-calendar",
        icon: "🌳",
        category: Categories.Family,
        colors: [
            Colors.Purple,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Purple },
        ]
    },
    Nadav: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "nadav",
        key: "nadav-square-calendar",
        icon: "🌳",
        category: Categories.Family,
        colors: [
            Colors.Purple,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Purple },
        ]
    },
    Or: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "or",
        key: "or-square-calendar",
        icon: "☀️",
        category: Categories.Shemesh,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Shahar: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "shahar",
        key: "shahar-square-calendar",
        icon: "☀️",
        category: Categories.Shemesh,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Sahar: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "sahar",
        key: "sahar-square-calendar",
        icon: "☀️",
        category: Categories.Shemesh,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Yahel: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "yahel",
        key: "yahel-square-calendar",
        icon: "☀️",
        category: Categories.Shemesh,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Ofek: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "ofek",
        key: "ofek-square-calendar",
        icon: "☀️",
        category: Categories.Shemesh,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Avshalom: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "avshalom",
        key: "avshalom-square-calendar",
        icon: "☀️",
        category: Categories.Shemesh,
        colors: [
            Colors.Violet,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
        ]
    },
    Rotem: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "rotem",
        key: "rotem-square-calendar",
        icon: "⭐️",
        category: Categories.Friends,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Maya: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "maya",
        key: "maya-square-calendar",
        icon: "👺",
        category: Categories.Friends,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Nimrod: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "nimrod",
        key: "nimrod-square-calendar",
        icon: "🪩",
        category: Categories.Friends,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "Call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    Ofir: {
        showColorStatus: true,
        showGamification: false,
        yellowAfter: 30,
        redAfter: 60,
        name: "ofir",
        key: "ofir-square-calendar",
        icon: "🧠",
        category: Categories.Friends,
        colors: [
            Colors.Violet,
            Colors.Purple,
            Colors.Lavender,
            Colors.Black
        ],
        legend: [
            { name: "PM", color: Colors.Violet },
            { name: "call", color: Colors.Purple },
            { name: "meet", color: Colors.Lavender },
        ]
    },
    /* Friends: {
        showColorStatus: true,
        showGamification: false,
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
    },*/
    SocialMedia: {
        name: "scrolling",
        key: "social-media-square-calendar",
        colors: [Colors.Darkgray, Colors.Black],
        icon: "📱",
        category: Categories.Avoid,
        avoid: true,
        showGamification: true,
    },
    Porn: {
        name: "porn", key: "porn-square-calendar",
        colors: [Colors.Maroon, Colors.Black],
        icon: "⛔",
        category: Categories.Avoid,
        avoid: true,
        showGamification: true,
    },
    Masturbate: {
        name: "masturbate", key: "masturbate-square-calendar",
        colors: [Colors.Brown, Colors.Black],
        icon: "🚫",
        category: Categories.Avoid,
        avoid: true,
        showGamification: true,
    },
    Lie: {
        name: "lie",
        key: "lie-square-calendar",
        colors: [Colors.Brown, Colors.Black],
        icon: "🤥",
        category: Categories.Avoid,
        avoid: true,
        showGamification: true,
    },
};

export const TailwindColorsMap = {
    [Colors.Clear]: "bg-transparent",
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

