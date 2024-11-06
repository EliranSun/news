import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	ChartBar,
	Fingerprint,
	LineChart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, addDays, subDays } from "date-fns";
import { ViewName } from "../organisms/sleep-tracker";

export const SleepNavigation = ({ view, setView, date, handleDateChange }) => {
	return (
		<div className="container flex items-center w-full">
			<div>
				<Button
					variant="outline"
					className="w-4"
					onClick={() => setView(ViewName.DAY)}>
					<ChartBar />
				</Button>
				<Button
					variant="outline"
					className="w-4"
					onClick={() => setView(ViewName.METRIC)}>
					<Fingerprint />
				</Button>
				<Button
					variant="outline"
					className="w-4"
					onClick={() => setView(ViewName.ANALYSIS)}>
					<LineChart />
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
	);
};
