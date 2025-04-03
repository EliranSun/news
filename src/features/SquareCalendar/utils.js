import { Colors } from "./constants";
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
        "bg-emerald-700": color === Colors.Forestgreen,
        "bg-sky-400": color === Colors.Skyblue,
        "bg-fuchsia-400": color === Colors.Plum,
        "bg-teal-400": color === Colors.Turquoise,
        "bg-blue-900": color === Colors.Navy,
        "bg-amber-800": color === Colors.Brown,
        "bg-green-200": color === Colors.Sage,
        "bg-violet-500": color === Colors.Violet,
        "bg-red-600": color === Colors.Crimson,
        "bg-blue-300": color === Colors.Lightblue,
        "bg-purple-200": color === Colors.Lavender,
        "bg-rose-500": color === Colors.Rose,
        "bg-pink-600": color === Colors.Hotpink,
        "bg-gray-500": color === Colors.Darkgray,
        "bg-red-900": color === Colors.Maroon,
    }
};