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
import { useState } from "react";

export const SleepNavigation = ({ view, setView, date, handleDateChange }) => {
	const viewArray = Object.values(ViewName);
	const [index, setIndex] = useState(viewArray.indexOf(view));

	return (
		<div className="container flex items-center fixed bottom-6 left-3 w-full">
			<div>
				<Button
					variant="outline"
					className="w-4"
					onClick={() => {
						setIndex((prev) => (prev + 1) % viewArray.length);
						setView(viewArray[index]);
					}}>
					{view === ViewName.DAY ? <ChartBar /> : null}
					{view === ViewName.METRIC ? <Fingerprint /> : null}
					{view === ViewName.ANALYSIS ? <LineChart /> : null}
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
	);
};
