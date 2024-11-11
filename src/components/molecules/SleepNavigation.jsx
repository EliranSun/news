import {
	CalendarIcon,
	ChartBar,
	PieChart,
	Sun,
	Moon,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes"; // If using next-themes or similar
import { format } from "date-fns";

export const SleepNavigation = ({ view, setView, date, handleDateChange }) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="w-full flex-wrap flex justify-between items-center py-4">
			<div className="flex items-center gap-2">
				<Button
					variant={view === "day" ? "solid" : "ghost"}
					onClick={() => setView("day")}>
					<CalendarIcon className="mr-2" /> Day View
				</Button>
				<Button
					variant={view === "metric" ? "solid" : "ghost"}
					onClick={() => setView("metric")}>
					<ChartBar className="mr-2" /> Metrics
				</Button>
				<Button
					variant={view === "analysis" ? "solid" : "ghost"}
					onClick={() => setView("analysis")}>
					<PieChart className="mr-2" /> Analysis
				</Button>
			</div>
			<div className="flex items-center gap-2">
				<Button onClick={() => handleDateChange(subDays(date, 1))}>
					<ChevronLeft />
				</Button>
				<Button variant="outline">
					<CalendarIcon className="mr-2" />
					{format(date, "MMM d, yyyy")}
				</Button>
				<Button onClick={() => handleDateChange(addDays(date, 1))}>
					<ChevronRight />
				</Button>
				<Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
					{theme === "light" ? <Moon /> : <Sun />}
				</Button>
			</div>
		</div>
	);
};
