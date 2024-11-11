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

export const TemperatureCorrelationChart = ({ data }) => {
	return (
		<ChartCard title="Temperature & Sleep Correlation">
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
						label={{
							value: "Sleep %",
							angle: -90,
							position: "insideLeft",
						}}
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						domain={[30, 40]}
						label={{
							value: "Temperature °C",
							angle: 90,
							position: "insideRight",
						}}
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
						dataKey="wristTemp"
						stroke="#ff7300"
						name="Wrist Temperature"
						dot={false}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</ChartCard>
	);
};
