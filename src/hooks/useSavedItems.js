import { useCallback, useState } from "react";

const STORAGE_KEY = "saved-links";

const readSaved = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(parsed) ? parsed.filter((item) => item?.link) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

const writeSaved = (items) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error(error);
    }
};

export const useSavedItems = () => {
    const [saved, setSaved] = useState(readSaved);

    const save = useCallback((item) => {
        setSaved((prev) => {
            if (prev.some((existing) => existing.link === item.link)) return prev;
            const next = [{ ...item, savedAt: Date.now() }, ...prev];
            writeSaved(next);
            return next;
        });
    }, []);

    const unsave = useCallback((link) => {
        setSaved((prev) => {
            const next = prev.filter((item) => item.link !== link);
            writeSaved(next);
            return next;
        });
    }, []);

    return { saved, save, unsave };
};
