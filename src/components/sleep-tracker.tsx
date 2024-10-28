import { useEffect, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
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
import { Checkbox } from "./ui/checkbox";
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

// Mock data for the graph
const graphData = [
	{ date: "2023-05-01", rem: 20, deep: 30, tags: 3 },
	{ date: "2023-05-02", rem: 25, deep: 35, tags: 5 },
	{ date: "2023-05-03", rem: 22, deep: 32, tags: 2 },
	{ date: "2023-05-04", rem: 28, deep: 38, tags: 4 },
	{ date: "2023-05-05", rem: 26, deep: 36, tags: 6 },
];

const tags = [
	{ label: "No screen 1 hour", emoji: "📵" },
	{ label: "No food 2 hours", emoji: "🍽️" },
	{ label: "No water 3 hours", emoji: "💧" },
	{ label: "8 hours sleep", emoji: "⏰" },
	{ label: "Magnesium", emoji: "💊" },
	{ label: "Late train", emoji: "🚂" },
	{ label: "Poop before", emoji: "💩" },
	{ label: "Shower before", emoji: "🚿" },
	{ label: "Dreams", emoji: "💭" },
	{ label: "Mind at ease", emoji: "🧘" },
	{ label: "Snoring", emoji: "😴" },
	{ label: "Same schedule", emoji: "📅" },
	{ label: "Late coffee", emoji: "☕" },
	{ label: "Alcohol", emoji: "🍷" },
];

const feelings = ["Foggy", "Exhausted", "Tired", "Refreshed"];

export function SleepTrackerComponent() {
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
			setSelectedTags(parsedData.selectedTags ?? []);
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
		setDate(newDate);
	};

	const handleTagChange = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	return (
		<div className="container mx-auto p-4 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Sleep Tracker</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between mb-4">
						<Button
							variant="outline"
							onClick={() => handleDateChange(subDays(date, 1))}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Popover>
							<PopoverTrigger asChild>
								<Button variant="outline">
									<CalendarIcon className="mr-2 h-4 w-4" />
									{format(date, "PPP")}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={date}
									onSelect={handleDateChange}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<Button
							variant="outline"
							onClick={() => handleDateChange(addDays(date, 1))}>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="rem">REM (%)</Label>
								<Input
									id="rem"
									type="number"
									value={rem}
									onChange={(e) => setRem(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="deep">Deep (%)</Label>
								<Input
									id="deep"
									type="number"
									value={deep}
									onChange={(e) => setDeep(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="calories">Calories Net</Label>
								<Input
									id="calories"
									type="number"
									value={calories}
									onChange={(e) => setCalories(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="protein">Protein (g)</Label>
								<Input
									id="protein"
									type="number"
									value={protein}
									onChange={(e) => setProtein(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="carbs">Carbs (g)</Label>
								<Input
									id="carbs"
									type="number"
									value={carbs}
									onChange={(e) => setCarbs(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="fat">Fat (g)</Label>
								<Input
									id="fat"
									type="number"
									value={fat}
									onChange={(e) => setFat(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
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
						</div>
					</div>

					<div className="mt-6">
						<Label>Tags</Label>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
							{tags.map((tag) => (
								<div
									key={tag.label}
									className="flex items-center space-x-2">
									<Checkbox
										id={tag.label}
										checked={selectedTags.includes(tag.label)}
										onCheckedChange={() => handleTagChange(tag.label)}
									/>
									<label
										htmlFor={tag.label}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										{tag.emoji} {tag.label}
									</label>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Sleep Analysis</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer
						width="100%"
						height={400}>
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
		</div>
	);
}
