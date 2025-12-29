import React, { useState, useEffect } from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Brush,
	LineChart,
	Line,
} from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		const { x, y, name } = payload[0].payload;
		return (
			<div
				className="custom-tooltip"
				style={{
					backgroundColor: "#fff",
					padding: "10px",
					border: "1px solid #ccc",
				}}>
				<p>
					<strong>Episode:</strong> {x}
				</p>
				<p>
					<strong>Rating:</strong> {y}
				</p>
				<p>
					<strong>Name:</strong> {name}
				</p>
			</div>
		);
	}
	return null;
};

export const OnePieceLastEpisodesChart = () => {
	const [sortBy, setScoreBy] = useState("score");
	const [dataLimit, setDataLimit] = useState(10);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(
			"https://www.ratingraph.com/show-episodes-graph/17673/average_rating/?_=1727688096966"
		)
			.then((response) => response.json())
			.then((data) => {
				const slicedData = data.data[1].data.slice(-dataLimit);
				setData(slicedData);
			});
	}, [dataLimit]);

	if (data.length === 0) return null;

	console.log(data);

	const xDomain = [data[0].x, "dataMax"];

	return (
		<div className="max-w-screen-lg flex flex-col">
			<div className="flex w-full mb-2">
				<button
					className="w-full"
					onClick={() => setDataLimit(1000)}>
					1000
				</button>
				<button
					className="w-full"
					onClick={() => setDataLimit(100)}>
					100
				</button>
				<button
					className="w-full"
					onClick={() => setDataLimit(50)}>
					50
				</button>
				<button
					className="w-full"
					onClick={() => setDataLimit(10)}>
					10
				</button>
			</div>
			<div className="w-screen md:w-1/3">
				<ResponsiveContainer
					style={{ marginLeft: 0 }}
					width={window.innerWidth / 3 * 2}
					height={window.innerHeight / 3}>
					<LineChart
						margin={{
							top: 20,
							right: 20,
							bottom: 20,
							left: 20,
						}}>
						<CartesianGrid />
						<XAxis
							type="number"
							dataKey="x"
							name="Episode"
							allowDataOverflow={true}
							domain={xDomain} // Set the domain dynamically
						/>
						<YAxis
							type="number"
							dataKey="y"
							name="Rating"
							domain={[0, 10]}
							allowDataOverflow={true}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ strokeDasharray: "3 3" }}
						/>
						<Scatter
							name="Episodes"
							data={data}
							fill="#8884d8"
						/>
						<Line
						dot={false}
							type="natural"
							dataKey="y"
							data={data}
							stroke="#82ca9d"
						/>
						<Brush
							dataKey="x"
							height={30}
							stroke="#8884d8"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="flex w-full mb-2">
				<button
					className="w-full"
					onClick={() => setScoreBy("score")}>
					Score
				</button>
				<button
					className="w-full"
					onClick={() => setScoreBy("episode")}>
					Episode
				</button>
			</div>
			<div className="border h-[50vh] overflow-y-auto  w-full md:w-[50vw] m-auto text-base">
				{[...data]
					.sort((a, b) => {
						if (sortBy === "score") {
							return b.y - a.y;
						}

						return b.episode - a.episode;
					})
					.map((item, index) => (
						<div
							key={item.episode}
							className={`
                        flex gap-2 items-center justify-center
                        ${
													index % 2 === 0
														? "bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
														: ""
												}
                        py-1
                    `}>
							<div className="w-2/12 md:w-1/12 text-center shrink-0">
								{item.episode}
							</div>
							<div className="w-2/12 md:w-1/12 shrink-0">⭐ {item.y}</div>
							<div className="w-7/12 shrink-0">{item.name}</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default OnePieceLastEpisodesChart;
