import {
	Line,
	Bar,
	ComposedChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";

export const SleepGraph = ({ date, data = [] }) => {
	const [graphData, setGraphData] = useState([]);
	const [uniqueTags, setUniqueTags] = useState([]);

	useEffect(() => {
		const newGraphData = data
			.filter((item) => {
				return Number(item.rem) && Number(item.deep);
			})
			.map((item) => {
				return {
					date: item.date,
					rem: item.rem ? (item.rem / 60 / item.duration) * 100 : 0,
					deep: item.deep ? (item.deep / 60 / item.duration) * 100 : 0,
					carbs: item.carbs || 0,
					protein: item.protein || 0,
					fat: item.fat || 0,
					tags: item.tags || [],
				};
			});

		const allTags = new Set();
		newGraphData.forEach((item) => {
			item.tags.forEach((tag) => allTags.add(tag));
		});

		setUniqueTags(Array.from(allTags));
		setGraphData(newGraphData);
	}, [date, data]);

	console.log(graphData);

	return (
		<div className="flex flex-col gap-4 my-4 h-screen overflow-y-auto pb-40">
			<Card className="">
				<CardHeader>
					<CardTitle>Macros & Sleep</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<ResponsiveContainer
						width="100%"
						height={(window.innerHeight * 1) / 2}>
						<ComposedChart
							data={graphData}
							className="py-8 mx-auto">
							{/* <CartesianGrid strokeDasharray="3 3" /> */}
							<XAxis dataKey="date" />
							<YAxis
								yAxisId="left"
								domain={[0, 100]}
							/>
							<YAxis
								yAxisId="right"
								orientation="right"
								domain={[0, 350]}
							/>
							<Tooltip />
							<Legend />
							<Bar
								yAxisId="left"
								dataKey="deep"
								stackId="sleep"
								fill="#b0e0e6"
								name="Deep %"
							/>
							<Bar
								yAxisId="left"
								dataKey="rem"
								stackId="sleep"
								fill="#9370db"
								name="REM %"
							/>

							<Line
								yAxisId="right"
								type="natural"
								dataKey="carbs"
								stroke="#ffc658"
								name="Carbs"
							/>
							<Line
								yAxisId="right"
								type="natural"
								dataKey="protein"
								stroke="#82ca9d"
								name="Protein"
							/>
							<Line
								yAxisId="right"
								type="natural"
								dataKey="fat"
								stroke="#d88884"
								name="Fat"
							/>
						</ComposedChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
			<Card className="">
				<CardHeader>
					<CardTitle>Tags & Sleep</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<ResponsiveContainer
						width="100%"
						height={(window.innerHeight * 1) / 2}>
						<ComposedChart
							data={graphData}
							className="py-8 mx-auto">
							<XAxis dataKey="date" />
							<YAxis
								yAxisId="left"
								domain={[0, 100]}
							/>
							<YAxis
								yAxisId="right"
								orientation="right"
								domain={[0, uniqueTags.length]}
							/>
							<Tooltip />
							<Legend />
							<Bar
								yAxisId="left"
								dataKey="deep"
								stackId="sleep"
								fill="#b0e0e6"
								name="Deep %"
							/>
							<Bar
								yAxisId="left"
								dataKey="rem"
								stackId="sleep"
								fill="#9370db"
								name="REM %"
							/>
							{uniqueTags.map((tag, index) => (
								<Line
									key={tag}
									yAxisId="right"
									type="monotone"
									dataKey={(data) =>
										data.tags.includes(tag) ? index + 0.5 : 0
									}
									stroke={`hsl(${(index * 360) / uniqueTags.length}, 70%, 50%)`}
									name={tag}
									dot={{
										fill: `hsl(${(index * 360) / uniqueTags.length}, 70%, 50%)`,
										r: 4,
									}}
									strokeWidth={0}
								/>
							))}
						</ComposedChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
};
