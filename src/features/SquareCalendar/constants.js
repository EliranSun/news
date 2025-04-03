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
    Mood: { name: "mood", key: "mood-square-tracker", colors: [
    Colors.Yellow, 
    Colors.Orange,
    Colors.Crimson,
    Colors.Maroon,
    Colors.Lavendar
    ], icon: "🎭", category: ""},
    Css: { name: "css", key: "css-square-calendar", colors: [Colors.Yellow, Colors.Black], icon: "💻", category: "self" }, // Code/programming
    Read: { name: "read", key: "read-square-calendar", colors: [Colors.Sage, Colors.Black], icon: "📚", category: "self" }, // Books
    Game: { name: "game", key: "game-square-calendar", colors: [Colors.Violet, Colors.Black], icon: "🎮", category: "self" }, // Gaming
    Media: { name: "TV/Film", key: "media-square-calendar", colors: [Colors.Crimson, Colors.Black], icon: "🎬", category: "self" }, // Movies/TV

    // House - Using earthy, practical colors for household tasks
    Laundry: { name: "laundry", key: "laundry-square-calendar", colors: [Colors.Skyblue, Colors.Black], icon: "🧺", category: "house" }, // Laundry basket
    LaundryFold: { name: "laundry fold", key: "laundry-fold-square-calendar", colors: [Colors.Lightblue, Colors.Black], icon: "👕", category: "house" }, // Folded clothes
    Groceries: { name: "groceries", key: "groceries-square-calendar", colors: [Colors.Forestgreen, Colors.Black], icon: "🛒", category: "house" }, // Shopping cart
    Cooking: { name: "cooking", key: "cooking-square-calendar", colors: [Colors.Orange, Colors.Black], icon: "🍳", category: "house" }, // Cooking
    ReplaceSheets: { name: "replace sheets", key: "replace-sheets-square-calendar", colors: [Colors.Lavender, Colors.Black], icon: "🛏️", category: "house" }, // Bed

    // Wife - Using romantic, warm colors
    Date: { name: "date", key: "date-square-calendar", colors: [Colors.Rose, Colors.Black], icon: "💑", category: "wife" }, // Couple
    Sex: { name: "sex", key: "sex-square-calendar", colors: [Colors.Hotpink, Colors.Black], icon: "❤️", category: "wife" }, // Heart
    Trip: { name: "trip", key: "trip-square-calendar", colors: [Colors.Turquoise, Colors.Black], icon: "🌲", category: "wife" }, // Travel
    LittleThings: { name: "little things for wife", key: "little-things-square-calendar", colors: [Colors.Coral, Colors.Black], icon: "🎁", category: "wife" }, // Gift

    // Social - Using friendly, welcoming colors
    Mom: { name: "mom", key: "mom-square-calendar", colors: [Colors.Purple, Colors.Black], icon: "👩", category: "social" }, // Woman
    Dad: { name: "dad", key: "dad-square-calendar", colors: [Colors.Navy, Colors.Black], icon: "👨", category: "social" }, // Man
    Grandma: { name: "grandma", key: "grandma-square-calendar", colors: [Colors.Plum, Colors.Black], icon: "👵", category: "social" }, // Elderly woman
    Friends: {
        icon: "👥",
        category: "social",
        name: "friends",
        key: "friends-square-calendar",
        legend: [
            { name: "Ofir", color: Colors.Yellow },
            { name: "Oded", color: Colors.Turquoise },
            { name: "Yarden", color: Colors.Purple },
            { name: "Liron", color: Colors.Rose },
            { name: "Maya", color: Colors.Coral },
            { name: "Rotem", color: Colors.Hotpink },
            { name: "Nimrod", color: Colors.Forestgreen },
            { name: "David", color: Colors.Skyblue },
            { name: "Mika", color: Colors.Violet },
            { name: "Noa", color: Colors.Orange },
        ],
        colors: [
            Colors.Yellow,
            Colors.Turquoise,
            Colors.Purple,
            Colors.Rose,
            Colors.Coral,
            Colors.Hotpink,
            Colors.Forestgreen,
            Colors.Skyblue,
            Colors.Violet,
            Colors.Orange,
            Colors.Black,
        ],
    },

    // avoid - Using darker, muted colors to represent negative activities
    SocialMedia: {
        name: "social media", key: "social-media-square-calendar",
        colors: [Colors.Darkgray, Colors.Black],
        icon: "📱",
        category: "avoid"
    },
    Porn: {
        name: "porn", key: "porn-square-calendar",
        colors: [Colors.Maroon, Colors.Black],
        icon: "⛔",
        category: "avoid"
    }, // No entry
    Masturbate: {
        name: "masturbate", key: "masturbate-square-calendar",
        colors: [Colors.Brown, Colors.Black],
        icon: "🚫",
        category: "avoid"
    }, // Prohibited
};
