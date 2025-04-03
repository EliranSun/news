
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

