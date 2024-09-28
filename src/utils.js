export const getDiffTime = (time) => {
    // return diff in minutes, hours, days
    const now = new Date();
    const date = new Date(time);
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.round(diffTime / (1000 * 60));
    const diffHours = Math.round(diffTime / (1000 * 60 * 60));
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return {value: diffMinutes, unit: "m", diffTime};
    }

    if (diffHours < 24) {
        return {value: diffHours, unit: "h", diffTime};
    }

    return {value: diffDays, unit: "d", diffTime};
};

export function removeUnicode(text) {
    return text.replaceAll("&#8226;", "•").replaceAll("&bull;", "•");
}

export function sanitizeText(text) {
    return text.replace(/<[^>]*>/g, "");
}

function isToday(date) {
    const diff = getDiffTime(date);
    if (diff.unit === "m") {
        return true;
    }

    if (diff.unit !== "d") {
        return diff.value < 5;
    }

    return false;
}