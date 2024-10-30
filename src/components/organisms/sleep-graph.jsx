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

export const SleepGraph = ({ view, date }) => {
	const [graphData, setGraphData] = useState([]);

	// Add new effect to load graph data
	useEffect(() => {
		const last7Days = Array.from({ length: 7 }, (_, i) => {
			const d = subDays(date, 6 - i);
			return d.toISOString().split("T")[0];
		});

		const newGraphData = last7Days.map((dateStr) => {
			const savedData = localStorage.getItem(`sleep-tracker:${dateStr}`);
			if (savedData) {
				const parsed = JSON.parse(savedData);
				return {
					date: dateStr,
					rem: parsed.rem || 0,
					deep: parsed.deep || 0,
					tags: parsed.selectedTags?.length || 0,
				};
			}
			return {
				date: dateStr,
				rem: 0,
				deep: 0,
				tags: 0,
			};
		});

		setGraphData(newGraphData);
	}, [date]);

	return (
		<Card className={view === "analysis" ? "block" : "hidden"}>
			<CardHeader>
				<CardTitle>Sleep Analysis</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer
					width={window.innerWidth - 100}
					height={window.innerHeight - 200}>
					<ComposedChart data={graphData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis yAxisId="left" />
						<YAxis
							yAxisId="right"
							orientation="right"
						/>
						<Tooltip />
						<Legend />
						<Line
							yAxisId="left"
							type="monotone"
							dataKey="rem"
							stroke="#8884d8"
							name="REM %"
						/>
						<Line
							yAxisId="left"
							type="monotone"
							dataKey="deep"
							stroke="#82ca9d"
							name="Deep %"
						/>
						<Bar
							yAxisId="right"
							dataKey="tags"
							fill="#ffc658"
							name="Tags"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
