import { useState } from "react";

const ClearFeedUpToDate = ({ items = [] }) => {
	const handleClear = (hours = 1) => {
		const currentTime = new Date();
		const clearTime = new Date(
			currentTime.getTime() - hours * 60 * 60 * 1000
		).getTime();

		const clearedItems = items.filter((item) => {
			const itemTime = new Date(item.date).getTime();
			console.log({
				itemTime,
				clearTime,
			});
			return itemTime <= clearTime;
		});

		console.log({
			clearedItems,
		});

		clearedItems.forEach((item) => {
			localStorage.setItem(item.link, "read");
		});

		window.location.reload();
	};

	return (
		<div
			style={{
				marginBottom: "20px",
				display: "grid",
				gridTemplateColumns: "repeat(4, 1fr)",
				gap: "10px",
			}}>
			<button onClick={() => handleClear(0)}>&#8734;</button>
			<button onClick={() => handleClear(10 / 60)}>10m</button>
			<button onClick={() => handleClear(1)}>1h</button>
			<button onClick={() => handleClear(24)}>24h</button>
		</div>
	);
};

export default ClearFeedUpToDate;
