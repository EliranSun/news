import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { useState, useEffect, useMemo } from "react";
import { SleepTags } from "../molecules/SleepTags";
import { format } from "date-fns";
const tags = [
	{ label: "Screen 1h", emoji: "📵" },
	{ label: "Food 2h", emoji: "🍽️" },
	{ label: "Water 3s", emoji: "💧" },
	{ label: "8 hours", emoji: "⏰" },
	{ label: "Magnesium", emoji: "💊" },
	{ label: "Late train", emoji: "💪" },
	{ label: "Poop", emoji: "💩" },
	{ label: "Shower", emoji: "🚿" },
	{ label: "Dreams", emoji: "💭" },
	{ label: "At ease", emoji: "🧘" },
	{ label: "Snoring", emoji: "😴" },
	{ label: "Schedule", emoji: "📅" },
	{ label: "Late coffee", emoji: "☕" },
	{ label: "Alcohol", emoji: "🍷" },
];

const feelings = ["Foggy", "Exhausted", "Tired", "Refreshed", "Sharp"];

const FEELING_API_URL = "https://walak.vercel.app/api/sleep-track/feeling";

export const SleepDayTracker = ({ date, data: initData }) => {
	const [data, setData] = useState({
		rem: Number(initData?.rem),
		deep: Number(initData?.deep),
		protein: Number(initData?.protein),
		carbs: Number(initData?.carbs),
		fat: Number(initData?.fat),
		calories: 0,
		selectedTags: [],
		feeling: "",
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
			selectedTags: [],
			feeling: "",
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
			tags: initData?.tags ?? [],
			feeling: initData?.feeling ?? "",
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
		const dateString = data.date?.slice(0, 10);
		const day = dateString.split("-")[2];
		const month = dateString.split("-")[1];
		const year = dateString.split("-")[0];
		return format(new Date(`${year}-${month}-${day}`), "EEEE");
	}, [data.date]);

	return (
		<Card className="w-full md:w-[20%] shrink-0">
			<CardContent>
				<div className="flex flex-col gap-2">
					<div className="text-xs font-medium">
						{/* {format(new Date(data.date), "MMM dd")} */}
						{dayName} {data.date?.slice(0, 10)}
					</div>
					<div className="flex gap-2 items-center">
						<div className="space-y-1">
							<Label htmlFor="rem">Duration</Label>
							<Input
								id="rem"
								type="text"
								value={data.duration?.slice(0, 4)}
								onChange={(e) => setValue("duration", e.target.value)}
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="rem">REM</Label>
							<Input
								id="rem"
								type="text"
								value={((data.rem / 60 / data.duration) * 100)?.toFixed(2)}
								onChange={(e) => setValue("rem", e.target.value)}
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="deep">Deep</Label>
							<Input
								id="deep"
								type="text"
								value={data.deep}
								onChange={(e) => setValue("deep", e.target.value)}
							/>
						</div>
					</div>
					{/* <div className="space-y-1">
						<Label htmlFor="calories">Calories</Label>
						<Input
							id="calories"
							type="text"
							value={data.calories}
							onChange={(e) => setValue("calories", e.target.value)}
						/>
					</div> */}
					<div className="flex gap-2 items-center">
						<div className="space-y-1">
							<Label htmlFor="protein">Protein</Label>
							<Input
								id="protein"
								type="text"
								value={data.protein}
								onChange={(e) => setValue("protein", e.target.value)}
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="carbs">Carbs</Label>
							<Input
								id="carbs"
								type="text"
								value={data.carbs}
								onChange={(e) => setValue("carbs", e.target.value)}
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="fat">Fat</Label>
							<Input
								id="fat"
								type="text"
								value={data.fat}
								onChange={(e) => setValue("fat", e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="space-y-1">
					<Label>How do I feel?</Label>
					<Select
						value={data.feeling}
						onValueChange={(value) => {
							setValue("feeling", value);
							fetch(FEELING_API_URL, {
								method: "POST",
								body: JSON.stringify({
									id: data.id,
									feeling: value,
								}),
							});
						}}>
						<SelectTrigger>
							<SelectValue placeholder="Select how you feel" />
						</SelectTrigger>
						<SelectContent>
							{feelings.map((f) => (
								<SelectItem
									key={f}
									value={f}>
									{f}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="mt-2">
					<SleepTags
						id={data.id}
						tags={tags}
						selectedTags={data.tags}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

SleepDayTracker.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	data: PropTypes.shape({
		rem: PropTypes.string,
		deep: PropTypes.string,
		protein: PropTypes.string,
		carbs: PropTypes.string,
		fat: PropTypes.string,
		selectedTags: PropTypes.arrayOf(PropTypes.string),
		feeling: PropTypes.string,
	}),
};
