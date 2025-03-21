import { useCallback } from "react";

export const ClearFeedUpToDate = ({ items = [], isActive = false }) => {
	const handleClear = useCallback(
		(hours = 1) => {
			const currentTime = new Date();
			const clearTime = new Date(
				currentTime.getTime() - hours * 60 * 60 * 1000
			).getTime();

			const clearedItems = items.filter((item) => {
				const itemTime = new Date(item.date).getTime();
				return itemTime <= clearTime;
			});

			clearedItems.forEach((item) => {
				const isSaved = localStorage.getItem(item.link) === "saved";
				if (isSaved) {
					localStorage.setItem(item.link, "read");
				}
			});

			window.location.reload();
		},
		[items]
	);

	if (!isActive) return null;

	return (
		<div className="absolute bottom-10 flex flex-col w-fit">
			<button
				className="rounded-full h-10"
				onClick={() => handleClear(1)}>
				1h
			</button>
			<button
				className="rounded-full h-10"
				onClick={() => handleClear(8)}>
				8h
			</button>
			<button
				className="rounded-full h-10"
				onClick={() => handleClear(24)}>
				24h
			</button>
		</div>
	);
};
