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
import { useState, useEffect } from "react";

import classNames from "classnames";
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

const feelings = ["Foggy", "Exhausted", "Tired", "Refreshed"];

export const SleepDayTracker = ({ date }) => {
	const [data, setData] = useState({
		rem: 0,
		deep: 0,
		calories: 0,
		protein: 0,
		carbs: 0,
		fat: 0,
		selectedTags: [],
		feeling: "",
	});

	const handleTagChange = (tag) => {
		setData((prev) => ({
			...prev,
			selectedTags: prev.selectedTags.includes(tag)
				? prev.selectedTags.filter((t) => t !== tag)
				: [...prev.selectedTags, tag],
		}));
		localStorage.setItem(
			`sleep-tracker:${date.toISOString().split("T")[0]}`,
			JSON.stringify(data)
		);
	};

	useEffect(() => {
		const dateKey = date.toISOString().split("T")[0];
		const data = localStorage.getItem(`sleep-tracker:${dateKey}`);
		if (data) {
			const parsedData = JSON.parse(data);
			setData((prev) => ({
				...prev,
				rem: parsedData.rem ?? 0,
				deep: parsedData.deep ?? 0,
				calories: parsedData.calories ?? 0,
				protein: parsedData.protein ?? 0,
				carbs: parsedData.carbs ?? 0,
				fat: parsedData.fat ?? 0,
				selectedTags:
					parsedData.selectedTags.length > 0 ? parsedData.selectedTags : [],
				feeling: parsedData.feeling ?? "",
			}));
		}
	}, [date]);

	const setValue = (key, value) => {
		setData((prev) => ({
			...prev,
			[key]: value,
		}));

		const storageKey = `sleep-tracker:${date.toISOString().split("T")[0]}`;
		const newData = { ...data, [key]: value };
		localStorage.setItem(storageKey, JSON.stringify(newData));
	};

	return (
		<Card>
			<CardContent>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
					<div className="space-y-1">
						<Label htmlFor="rem">REM (%)</Label>
						<Input
							id="rem"
							type="text"
							value={data.rem}
							onChange={(e) => setValue("rem", e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="deep">Deep (%)</Label>
						<Input
							id="deep"
							type="text"
							value={data.deep}
							onChange={(e) => setValue("deep", e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="calories">Calories Net</Label>
						<Input
							id="calories"
							type="text"
							value={data.calories}
							onChange={(e) => setValue("calories", e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="protein">Protein (g)</Label>
						<Input
							id="protein"
							type="text"
							value={data.protein}
							onChange={(e) => setValue("protein", e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="carbs">Carbs (g)</Label>
						<Input
							id="carbs"
							type="text"
							value={data.carbs}
							onChange={(e) => setValue("carbs", e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="fat">Fat (g)</Label>
						<Input
							id="fat"
							type="text"
							value={data.fat}
							onChange={(e) => setValue("fat", e.target.value)}
						/>
					</div>
				</div>
				<div className="space-y-1">
					<Label>How do I feel?</Label>
					<Select
						value={data.feeling}
						onValueChange={(value) => setValue("feeling", value)}>
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
					<Label>Tags</Label>
					<div className="flex flex-wrap gap-1 mt-2">
						{tags.map((tag) => (
							<div
								key={tag.label}
								onClick={() => handleTagChange(tag.label)}
								className={classNames({
									"flex items-center border rounded-md p-1": true,
									"bg-black text-white": data.selectedTags.includes(tag.label),
								})}>
								<label
									htmlFor={tag.label}
									className="text-xs font-medium leading-none 
                      peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									{tag.emoji} {tag.label}
								</label>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};