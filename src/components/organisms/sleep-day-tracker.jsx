import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { ProgressBar } from "../ui/progress-bar";
import { SleepTags } from "../molecules/SleepTags";
import { format } from "date-fns";

const feelings = ["Foggy", "Exhausted", "Tired", "Refreshed", "Sharp"];

export const SleepDayTracker = ({ date, data: initData }) => {
	const [data, setData] = useState({
		rem: Number(initData?.rem),
		deep: Number(initData?.deep),
		protein: Number(initData?.protein),
		carbs: Number(initData?.carbs),
		fat: Number(initData?.fat),
		sleepStart: initData?.sleep_start,
		sleepEnd: initData?.sleep_end,
		calories: 0,
		selectedTags: [],
		feeling: "",
		id: "",
		date: "",
		duration: "",
		wristTemp: "",
	});

	useEffect(() => {
		// const dateKey = date.toISOString().split("T")[0];
		// const data = localStorage.getItem(`sleep-tracker:${dateKey}`);

		// if (data) {
		// 	const parsedData = JSON.parse(data);
		// 	setData((prev) => ({
		// 		...prev,
		// 		rem: parsedData.rem ?? 0,
		// 		deep: parsedData.deep ?? 0,
		// 		calories: parsedData.calories ?? 0,
		// 		protein: parsedData.protein ?? 0,
		// 		carbs: parsedData.carbs ?? 0,
		// 		fat: parsedData.fat ?? 0,
		// 		selectedTags:
		// 			parsedData.selectedTags.length > 0 ? parsedData.selectedTags : [],
		// 		feeling: parsedData.feeling ?? "",
		// 	}));
		// }

		setData({
			rem: 0,
			deep: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
			sleepStart: "",
			sleepEnd: "",
			selectedTags: [],
			feeling: "",
			id: "",
			date: "",
			duration: "",
			wristTemp: "",
		});
	}, [date]);

	useEffect(() => {
		setData((prev) => ({
			...prev,
			id: initData?.id,
			date: initData?.created_at,
			duration: initData?.duration ?? 0,
			rem: initData?.rem ?? 0,
			deep: initData?.deep ?? 0,
			protein: initData?.protein ?? 0,
			carbs: initData?.carbs ?? 0,
			fat: initData?.fat ?? 0,
			sleepStart: initData?.sleep_start ?? "",
			sleepEnd: initData?.sleep_end ?? "",
			tags: initData?.tags ?? [],
			feeling: initData?.feeling ?? "",
			wristTemp: initData?.wrist_temperature?.toFixed(4) ?? "-",
		}));
	}, [initData]);

	const setValue = (key, value) => {
		setData((prev) => ({
			...prev,
			[key]: value,
		}));

		const storageKey = `sleep-tracker:${date.toISOString().split("T")[0]}`;
		const newData = { ...data, [key]: value };
		localStorage.setItem(storageKey, JSON.stringify(newData));
	};

	const dayName = useMemo(() => {
		if (!data.date) return "";
		const dateString = data.date.slice(0, 10);
		const [year, month, day] = dateString.split("-");
		return format(new Date(`${year}-${month}-${day}`), "EEEE, MMM dd");
	}, [data.date]);

	return (
		<Card className="w-full md:w-1/3 shadow-lg rounded-xl overflow-hidden">
			<CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
				<CardTitle className="text-xl font-semibold">{dayName}</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<div className="space-y-6">
					<div>
						<Label htmlFor="duration">Sleep Duration (hrs)</Label>
						<Input
							id="duration"
							type="number"
							value={data.duration}
							onChange={(e) => setValue("duration", e.target.value)}
							placeholder="e.g., 8"
						/>
					</div>
					<div>
						<Label>Sleep Stages</Label>
						<ProgressBar
							label="REM Sleep"
							value={(data.rem / (data.duration * 60)) * 100}
							color="bg-purple-500"
						/>
						<ProgressBar
							label="Deep Sleep"
							value={(data.deep / (data.duration * 60)) * 100}
							color="bg-blue-500"
						/>
					</div>
					<div>
						<Label>Daily Macros Intake</Label>
						<div className="flex gap-4">
							<Input
								id="protein"
								type="number"
								value={data.protein}
								onChange={(e) => setValue("protein", e.target.value)}
								placeholder="Protein (g)"
							/>
							<Input
								id="carbs"
								type="number"
								value={data.carbs}
								onChange={(e) => setValue("carbs", e.target.value)}
								placeholder="Carbs (g)"
							/>
							<Input
								id="fat"
								type="number"
								value={data.fat}
								onChange={(e) => setValue("fat", e.target.value)}
								placeholder="Fat (g)"
							/>
						</div>
					</div>
					<div>
						<Label>How do you feel today?</Label>
						<Select
							value={data.feeling}
							onValueChange={(value) => {
								setValue("feeling", value);
								// Update feeling via API if necessary
							}}>
							<SelectTrigger>
								<SelectValue placeholder="Select your feeling" />
							</SelectTrigger>
							<SelectContent>
								{feelings.map((feeling) => (
									<SelectItem
										key={feeling}
										value={feeling}>
										{feeling}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<SleepTags
						id={data.id}
						tags={data.tags}
						sleepStart={data.sleepStart}
						selectedTags={data.tags}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

SleepDayTracker.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	data: PropTypes.object.isRequired,
};
