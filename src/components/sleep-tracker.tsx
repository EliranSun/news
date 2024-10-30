import React, { useEffect, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	ChartBar,
} from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
// import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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

export function SleepTrackerComponent() {
	const [view, setView] = useState("tracker");
	const [date, setDate] = useState(new Date());
	const [rem, setRem] = useState(0);
	const [deep, setDeep] = useState(0);
	const [calories, setCalories] = useState(0);
	const [protein, setProtein] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [fat, setFat] = useState(0);
	const [selectedTags, setSelectedTags] = useState([]);
	const [feeling, setFeeling] = useState("");
	const [graphData, setGraphData] = useState([]);

	// Move the loading effect first and make it run only once on component mount
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
	}, [date]); // Only depends on date changes now

	// Add a condition to prevent saving empty/initial state
	useEffect(() => {
		const dateKey = date.toISOString().split("T")[0];
		// Only save if we have some actual data to save
		if (
			rem ||
			deep ||
			calories ||
			protein ||
			carbs ||
			fat ||
			selectedTags.length ||
			feeling
		) {
			localStorage.setItem(
				`sleep-tracker:${dateKey}`,
				JSON.stringify({
					rem,
					deep,
					calories,
					protein,
					carbs,
					fat,
					selectedTags,
					feeling,
				})
			);
		}
	}, [date, rem, deep, calories, protein, carbs, fat, selectedTags, feeling]);

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

	const handleDateChange = (newDate) => {
		// reset all metrics
		// setRem(0);
		// setDeep(0);
		// setCalories(0);
		// setProtein(0);
		// setCarbs(0);
		// setFat(0);
		// setSelectedTags([]);
		// setFeeling("");
		setDate(newDate);
	};

	const handleTagChange = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	return (
		<div className="container py-2 px-4 w-full fixed inset-0">
			<Card className={view === "tracker" ? "block" : "hidden"}>
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
									{/* <Checkbox
										id={tag.label}
										checked={selectedTags.includes(tag.label)}
										onCheckedChange={() => handleTagChange(tag.label)}
									/> */}
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

			<div className="container flex items-center my-4 w-full">
				<div>
					<Button
						variant="outline"
						className="w-4"
						onClick={() =>
							setView(view === "analysis" ? "tracker" : "analysis")
						}>
						{view === "tracker" ? <ChartBar /> : <CalendarIcon />}
					</Button>
					<Button
						variant="outline"
						className="w-2"
						onClick={() => handleDateChange(subDays(date, 1))}>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						className="w-2"
						onClick={() => handleDateChange(addDays(date, 1))}>
						<ChevronRight />
					</Button>
				</div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="mr-2 w-fit">
							<CalendarIcon />
							{format(date, "PP")}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleDateChange}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
