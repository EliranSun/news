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
import { ChartCard } from "../molecules/chart-card";

export const SleepNutritionChart = ({ data }) => {
	return (
		<ChartCard title="Sleep & Nutrition Analysis">
			<ResponsiveContainer
				width="100%"
				height={400}>
				<ComposedChart
					data={data}
					margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
					<XAxis
						dataKey="date"
						tick={{ fontSize: 12 }}
					/>
					<YAxis
						yAxisId="left"
						domain={[0, 100]}
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						domain={[0, 350]}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "rgba(255, 255, 255, 0.95)",
							borderRadius: "8px",
							border: "none",
							boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
						}}
					/>
					<Legend
						iconType="circle"
						iconSize={8}
						wrapperStyle={{ paddingTop: "20px" }}
					/>
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
		</ChartCard>
	);
};
