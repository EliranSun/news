import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

export const getDiffTime = (time) => {
	// return diff in minutes, hours, days
	const now = new Date();
	const date = new Date(time);
	const diffTime = Math.abs(now - date);
	const diffMinutes = Math.round(diffTime / (1000 * 60));
	const diffHours = Math.round(diffTime / (1000 * 60 * 60));
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

	if (diffMinutes < 60) {
		return { value: diffMinutes, unit: "m", diffTime, diffMinutes, diffHours };
	}

	if (diffHours < 24) {
		return { value: diffHours, unit: "h", diffTime, diffMinutes, diffHours };
	}

	return { value: diffDays, unit: "d", diffTime, diffMinutes, diffHours };
};

export function removeUnicode(text) {
	return text
		.replaceAll("&amp;#8226;", "•")
		.replaceAll("&amp;#8217;", "'")
		.replaceAll("&#8226;", "•")
		.replaceAll("#8226;", "•")
		.replaceAll("#8217;", "'")
		.replaceAll("&#8217;", "'")
		.replaceAll("&#34;", '"')
		.replaceAll("&amp;#34;", '"')
		.replaceAll("&ndash;", "-")
		.replaceAll("&#8230;", "...")
		.replaceAll("&quot;", '"')
		.replaceAll("&bull;", "•")
		.replaceAll("&amp;", "&");
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

export const isRtl = (text = "") => /[֐-׿؀-ۿ]/.test(text);

export const formatAge = (diff) => {
	if (!diff || !Number.isFinite(diff.value)) return "";
	if (diff.unit === "m" && diff.value < 1) return "now";
	return `${diff.value}${diff.unit}`;
};

const HOUR = 60 * 60 * 1000;

export const getAgeGroup = (diff) => {
	const age = diff?.diffTime;
	if (!Number.isFinite(age)) return "Undated";
	if (age < HOUR) return "Past hour";
	if (age < 24 * HOUR) return "Past 24 hours";
	if (age < 48 * HOUR) return "Yesterday";
	return "Earlier";
};

export const isRead = (link) => {
	try {
		return localStorage.getItem(link) === "read";
	} catch {
		return false;
	}
};

export const markRead = (link) => {
	try {
		localStorage.setItem(link, "read");
	} catch (error) {
		console.error(error);
	}
};

export const unmarkRead = (link) => {
	try {
		localStorage.removeItem(link);
	} catch (error) {
		console.error(error);
	}
};
