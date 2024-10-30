import { useMemo } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import classNames from "classnames";

const getAllLocalStorageKeys = () => {
	const keys = Object.keys(localStorage);
	return keys.filter((key) => key.startsWith("sleep-tracker:"));
};

const MetricCube = ({ value, isHeader, isSelected }) => {
	return (
		<span
			className={classNames(
				"size-10 rounded-sm font-mono text-xs text-black flex items-center justify-center",
				"flex-shrink-0",
				isHeader && "bg-transparent",
				!isHeader && "bg-neutral-200",
				isSelected && "font-black border-2 border-neutral-500"
			)}>
			{value}
		</span>
	);
};

export const SleepMetricTracker = ({ date }) => {
	const allValuesPerMetric = useMemo(() => {
		const keys = getAllLocalStorageKeys();
		const metrics = {
			dates: [],
			rem: [],
			deep: [],
			protein: [],
			carbs: [],
			fat: [],
			calories: [],
		};

		keys.forEach((key) => {
			const data = JSON.parse(localStorage.getItem(key));
			if (data) {
				metrics.dates.push(key.split(":")[1]);
				metrics.rem.push(data.rem || 0);
				metrics.deep.push(data.deep || 0);
				metrics.protein.push(data.protein || 0);
				metrics.carbs.push(data.carbs || 0);
				metrics.fat.push(data.fat || 0);
				metrics.calories.push(data.calories || 0);
			}
		});

		// Sort all arrays based on dates
		const indices = metrics.dates
			.map((_, index) => index)
			.sort((a, b) => new Date(metrics.dates[a]) - new Date(metrics.dates[b]));

		// Create new sorted arrays
		metrics.dates = indices.map((i) => metrics.dates[i]);
		metrics.rem = indices.map((i) => metrics.rem[i]);
		metrics.deep = indices.map((i) => metrics.deep[i]);
		metrics.protein = indices.map((i) => metrics.protein[i]);
		metrics.carbs = indices.map((i) => metrics.carbs[i]);
		metrics.fat = indices.map((i) => metrics.fat[i]);
		metrics.calories = indices.map((i) => metrics.calories[i]);
		return metrics;
	}, []);

	console.log({ allValuesPerMetric });

	const metrics = [
		{ key: "rem", label: "REM" },
		{ key: "deep", label: "DEEP" },
		{ key: "protein", label: "PROTEIN" },
		{ key: "fat", label: "FAT" },
		{ key: "carbs", label: "CARBS" },
		{ key: "calories", label: "CALORIES" },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>METRICS</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="flex flex-col gap-1 overflow-x-auto flex-nowrap w-10/12 ml-auto">
					<div className="flex gap-1">
						{allValuesPerMetric["dates"].map((value, index) => (
							<MetricCube
								isHeader
								// isSelected={date.toISOString().split("T")[0] === value}
								key={`date-${allValuesPerMetric["dates"][index]}-${value}`}
								value={`${value.split("-")[2]}/${value.split("-")[1]}`}
							/>
						))}
					</div>
					{metrics.map(({ key, label }) => (
						<div key={key}>
							<div className="text-[10px] font-semibold h-10 w-12 flex items-center bg-neutral-100 absolute left-6">
								{label}
							</div>
							<div className="flex gap-1 w-full flex-nowrap">
								{allValuesPerMetric[key].map((value, index) => (
									<MetricCube
										key={`${key}-${allValuesPerMetric["dates"][index]}-${value}`}
										value={value}
										isSelected={
											date.toISOString().split("T")[0] ===
											allValuesPerMetric["dates"][index]
										}
									/>
								))}
							</div>
						</div>
					))}
				</CardDescription>
			</CardContent>
		</Card>
	);
};
