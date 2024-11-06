import {
	Line,
	Bar,
	ComposedChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState, useEffect } from "react";

export const SleepGraph = ({ date, data = [] }) => {
	const [graphData, setGraphData] = useState([]);

	// Add new effect to load graph data
	useEffect(() => {
		const newGraphData = data
			.filter((item) => {
				console.log(item);
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
					tags: item.tags?.length || 0,
				};
			});

		setGraphData(newGraphData);
	}, [date, data]);

	console.log(graphData);

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Sleep Analysis...</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer
					width={window.innerWidth * 1.1}
					height={(window.innerHeight * 2) / 3}>
					<ComposedChart
						data={graphData}
						className="py-8 -ml-12">
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
							type="monotone"
							dataKey="carbs"
							stroke="#ffc658"
							name="Carbs"
						/>
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="protein"
							stroke="#82ca9d"
							name="Protein"
						/>
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="fat"
							stroke="#d88884"
							name="Fat"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
