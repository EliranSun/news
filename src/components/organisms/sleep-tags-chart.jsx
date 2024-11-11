import { useEffect, useState } from "react";
import {
	Bar,
	ComposedChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Scatter,
} from "recharts";
import { ChartCard } from "../molecules/chart-card";
import { Button } from "../ui/button";

export const SleepTagsChart = ({ data, uniqueTags }) => {
	const [selectedTags, setSelectedTags] = useState(
		new Set(uniqueTags.map((t) => t.label))
	);

	const toggleTag = (tag) => {
		const newSelectedTags = new Set(selectedTags);
		if (newSelectedTags.has(tag)) {
			newSelectedTags.delete(tag);
		} else {
			newSelectedTags.add(tag);
		}
		setSelectedTags(newSelectedTags);
	};

	const filteredData = data.map((item) => ({
		...item,
		tags: item.tags.filter((tag) => selectedTags.has(tag)),
		tagEmojis: item.tags
			.filter((tag) => selectedTags.has(tag))
			.map((tag) => uniqueTags.find((t) => t.label === tag)?.emoji || ""),
	}));

	const [tags, setTags] = useState([]);

	useEffect(() => {
		// set unique values for tags
		let newTags = [];
		uniqueTags.forEach((item) => {
			if (!newTags.includes(`${item.emoji} ${item.label}`)) {
				newTags.push(`${item.emoji} ${item.label}`);
			}
		});
		setTags(newTags);
	}, [uniqueTags]);

	console.log({ selectedTags });

	return (
		<ChartCard
			// title="Sleep Quality by Tags"
			subtitle={
				<div className="flex flex-wrap gap-2 mt-2">
					{tags.map((tag) => {
						console.log({ tag });
						return (
							<Button
								key={tag}
								size="sm"
								variant={selectedTags.has(tag) ? "default" : "outline"}
								onClick={() => toggleTag(tag)}
								className="px-3 py-1">
								{tag}
							</Button>
						);
					})}
				</div>
			}>
			<ResponsiveContainer
				width="100%"
				height={400}>
				<ComposedChart
					data={filteredData}
					margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
					<XAxis
						dataKey="date"
						tick={{ fontSize: 12 }}
					/>
					<YAxis
						domain={[0, 60]}
						label={{
							value: "Sleep Quality %",
							angle: -90,
							position: "insideLeft",
						}}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "rgba(255, 255, 255, 0.95)",
							borderRadius: "8px",
							border: "none",
							boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
						}}
						formatter={(value, name, props) => {
							console.log({
								value,
								name,
								props,
							});
							if (name === "tags") {
								return [props.payload.tags.join(", "), "Tags"];
							}

							return [`${String(value).slice(1)}%`, name];
						}}
					/>
					<Legend
						iconType="circle"
						iconSize={8}
						wrapperStyle={{ paddingTop: "20px" }}
					/>
					<Bar
						dataKey="deep"
						stackId="sleep"
						fill="#b0e0e6"
						name="Deep %"
					/>
					<Bar
						dataKey="rem"
						stackId="sleep"
						fill="#9370db"
						name="REM %"
					/>
					<Scatter
						dataKey="tagEmojis"
						fill="#8884d8"
						name="Tags"
						shape={(props) => {
							const { cx, cy, payload } = props;
							return (
								<text
									x={cx}
									y={cy - 10}
									textAnchor="middle"
									fontSize="14px">
									{payload.tagEmojis.join(" ")}
								</text>
							);
						}}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</ChartCard>
	);
};
