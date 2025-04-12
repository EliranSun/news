export const Colors = {
    Yellow: "yellow",
    Sage: "sage",
    Violet: "violet",
    Crimson: "crimson",
    Lightblue: "lightblue",
    Lavender: "lavender",
    Rose: "rose",
    Hotpink: "hotpink",
    Forestgreen: "forestgreen",
    Skyblue: "skyblue",
    Plum: "plum",
    Orange: "orange",
    Purple: "purple",
    Coral: "coral",
    Turquoise: "turquoise",
    Navy: "navy",
    Pink: "pink",
    Brown: "brown",
    Black: "black",
    Clear: "clear",
    Red: "red",
    Green: "green",
    Blue: "blue",
    Darkgray: "darkgray",
    Maroon: "maroon",
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
        icon: "🎭",
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
        icon: "💻",
        category: "self",
        showColorStatus: true,
        yellowAfter: 5,
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
        category: "self"
    },
    Game: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "game",
        key: "game-square-calendar",
        colors: [Colors.Violet, Colors.Black],
        icon: "🎮",
        category: "self"
    },
    Media: {
        showColorStatus: true,
        yellowAfter: 30,
        redAfter: 60,
        name: "TV/Film",
        key: "media-square-calendar",
        colors: [Colors.Crimson, Colors.Black],
        icon: "🎬",
        category: "self"
    },

    // House - Using earthy, practical colors for household tasks
    Laundry: {
        showColorStatus: true,
        yellowAfter: 5,
        redAfter: 10,
        name: "laundry",
        key: "laundry-square-calendar",
        colors: [Colors.Skyblue, Colors.Black],
        icon: "🧺",
        category: "house"
    },
    LaundryFold: {
        showColorStatus: true,
        yellowAfter: 5,
        redAfter: 10,
        name: "fold",
        key: "laundry-fold-square-calendar",
        colors: [Colors.Lightblue, Colors.Black],
        icon: "👕",
        category: "house"
    },
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
        name: "weight",
        key: "weight-square-calendar",
        colors: [
            Colors.Blue,
            Colors.Green,
            Colors.Yellow,
            Colors.Orange,
            Colors.Red,
        ],
        icon: "💪",
        category: "self",
        legend: [
            { name: "70-71", color: Colors.Blue },
            { name: "72-73", color: Colors.Green },
            { name: "74-75", color: Colors.Yellow },
            { name: "76-77", color: Colors.Orange },
            { name: "78-79", color: Colors.Red },
        ],
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
        category: "self",
        legend: [
            { name: "0:00-0:29", color: Colors.Lightblue },
            { name: "0:30-0:59", color: Colors.Skyblue },
            { name: "1:00-1:29", color: Colors.Blue },
            { name: "1:30-1:59", color: Colors.Navy },
            { name: "2:00-2:29", color: Colors.Violet },
            { name: "2:30+", color: Colors.Purple },
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
