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
	const [rem, setRem] = useState(0);
	const [deep, setDeep] = useState(0);
	const [calories, setCalories] = useState(0);
	const [protein, setProtein] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [fat, setFat] = useState(0);
	const [selectedTags, setSelectedTags] = useState([]);
	const [feeling, setFeeling] = useState("");

	const handleTagChange = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	useEffect(() => {
		const dateKey = date.toISOString().split("T")[0];
		const data = localStorage.getItem(`sleep-tracker:${dateKey}`);
		if (data) {
			const parsedData = JSON.parse(data);
			setRem(parsedData.rem ?? 0);
			setDeep(parsedData.deep ?? 0);
			setCalories(parsedData.calories ?? 0);
			setProtein(parsedData.protein ?? 0);
			setCarbs(parsedData.carbs ?? 0);
			setFat(parsedData.fat ?? 0);
			setSelectedTags(
				parsedData.selectedTags.length > 0 ? parsedData.selectedTags : []
			);
			setFeeling(parsedData.feeling ?? "");
		}
	}, [date]);

	return (
		<Card>
			<CardContent>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-2">
					<div className="space-y-1">
						<Label htmlFor="rem">REM (%)</Label>
						<Input
							id="rem"
							type="text"
							value={rem}
							onChange={(e) => setRem(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="deep">Deep (%)</Label>
						<Input
							id="deep"
							type="text"
							value={deep}
							onChange={(e) => setDeep(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="calories">Calories Net</Label>
						<Input
							id="calories"
							type="text"
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="protein">Protein (g)</Label>
						<Input
							id="protein"
							type="text"
							value={protein}
							onChange={(e) => setProtein(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="carbs">Carbs (g)</Label>
						<Input
							id="carbs"
							type="text"
							value={carbs}
							onChange={(e) => setCarbs(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="fat">Fat (g)</Label>
						<Input
							id="fat"
							type="text"
							value={fat}
							onChange={(e) => setFat(e.target.value)}
						/>
					</div>
				</div>
				<div className="space-y-1">
					<Label>How do I feel?</Label>
					<Select
						value={feeling}
						onValueChange={setFeeling}>
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
									"bg-black text-white": selectedTags.includes(tag.label),
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
