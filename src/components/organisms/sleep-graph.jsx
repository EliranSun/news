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
import { subDays } from "date-fns";

export const SleepGraph = ({ date, data = [] }) => {
	const [graphData, setGraphData] = useState([]);

	// Add new effect to load graph data
	useEffect(() => {
		const newGraphData = data.map((item) => {
			return {
				date: item.date,
				rem: (item.rem / 60 / item.duration) * 100 || 0,
				deep: (item.deep / 60 / item.duration) * 100 || 0,
				carbs: item.carbs || 0,
				protein: item.protein || 0,
				fat: item.fat || 0,
				tags: item.tags?.length || 0,
			};
		});

		setGraphData(newGraphData);
	}, [date, data]);

	return (
		<Card className="w-full h-screen">
			<CardHeader>
				<CardTitle>Sleep Analysis</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer>
					<ComposedChart
						data={graphData}
						className="py-8">
						{/* <CartesianGrid strokeDasharray="3 3" /> */}
						<XAxis dataKey="date" />
						<YAxis
							yAxisId="left"
							domain={[0, "dataMax + 10"]}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							domain={[0, "dataMax + 10"]}
						/>
						<Tooltip />
						<Legend />
						<Bar
							yAxisId="left"
							dataKey="deep"
							stackId="sleep"
							fill="#82ca9d"
							name="Deep %"
						/>
						<Bar
							yAxisId="left"
							dataKey="rem"
							stackId="sleep"
							fill="#8884d8"
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
							stroke="#8884d8"
							name="Fat"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
