import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";

export const SleepGraph = ({ date, data = [] }) => {
	const [graphData, setGraphData] = useState([]);

	console.log(data);

	useEffect(() => {
		const processedData = data.map((item) => {
			console.log(item);

			return {
				date: format(new Date(item.created_at), "MMM d"),
				rem: (item.rem / (item.duration * 60)) * 100,
				deep: (item.deep / (item.duration * 60)) * 100,
				// Add more data points as needed
			};
		});
		setGraphData(processedData);
	}, [data]);

	return (
		<Card className="mt-6 shadow-lg rounded-xl">
			<CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
				<CardTitle className="text-xl font-semibold">Sleep Analysis</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<ResponsiveContainer
					width="100%"
					height={400}>
					<LineChart data={graphData}>
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="rem"
							stroke="#8884d8"
							name="REM Sleep"
						/>
						<Line
							type="monotone"
							dataKey="deep"
							stroke="#82ca9d"
							name="Deep Sleep"
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
