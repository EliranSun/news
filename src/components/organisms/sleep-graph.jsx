import { useState, useEffect } from "react";
import { tags } from "./sleep-day-tracker";
import { SleepNutritionChart } from "./sleep-nutrition-chart";
import { TemperatureCorrelationChart } from "./temperature-correlation-chart.jsx";
import { SleepTagsChart } from "./sleep-tags-chart.jsx";

export const SleepGraph = ({ date, data = [] }) => {
	const [graphData, setGraphData] = useState([]);
	const [uniqueTags, setUniqueTags] = useState([]);

	useEffect(() => {
		const newGraphData = data
			.filter((item) => {
				return Number(item.rem) && Number(item.deep);
			})
			.map((item) => ({
				date: item.date,
				rem: item.rem ? (item.rem / 60 / item.duration) * 100 : 0,
				deep: item.deep ? (item.deep / 60 / item.duration) * 100 : 0,
				carbs: item.carbs || 0,
				protein: item.protein || 0,
				wristTemp: item.wrist_temperature || 0,
				fat: item.fat || 0,
				tags: item.tags || [],
			}));

		const allTags = new Set();
		newGraphData.forEach((item) => {
			item.tags.forEach((tag) =>
				allTags.add({
					label: tag,
					emoji: tags.find((t) => t.label === tag)?.emoji,
				})
			);
		});

		setUniqueTags(Array.from(allTags));
		setGraphData(newGraphData);
	}, [date, data]);

	return (
		<div className="flex flex-col gap-6 my-6 h-screen overflow-y-auto pb-40">
			{/* <SleepNutritionChart data={graphData} />
			<TemperatureCorrelationChart data={graphData} /> */}
			<SleepTagsChart
				data={graphData}
				uniqueTags={uniqueTags}
			/>
		</div>
	);
};
