import React, { useState } from "react";
import { SleepNavigation } from "./../molecules/SleepNavigation";
import { SleepDayTracker } from "./sleep-day-tracker";
import { SleepGraph } from "./sleep-graph";
import { SleepMetricTracker } from "./sleep-metric-tracker";

const ViewName = {
	DAY: "day",
	METRIC: "metric",
	ANALYSIS: "analysis",
};

const View = ({ view, ...rest }) => {
	switch (view) {
		case ViewName.DAY:
			return <SleepDayTracker {...rest} />;

		case ViewName.METRIC:
			return <SleepMetricTracker {...rest} />;

		case ViewName.ANALYSIS:
			return <SleepGraph {...rest} />;
	}
};

export function SleepTrackerComponent() {
	const [view, setView] = useState(ViewName.DAY);
	const [date, setDate] = useState(new Date());

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

	return (
		<div className="container py-2 px-4 w-full fixed inset-0">
			<View
				view={view}
				date={date}
			/>
			<SleepNavigation
				view={view}
				setView={setView}
				date={date}
				handleDateChange={handleDateChange}
			/>
		</div>
	);
}
