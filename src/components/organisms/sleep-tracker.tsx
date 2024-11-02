import React, { useState, useEffect } from "react";
import { SleepNavigation } from "./../molecules/SleepNavigation";
import { SleepDayTracker } from "./sleep-day-tracker";
import { SleepGraph } from "./sleep-graph";
import { SleepMetricTracker } from "./sleep-metric-tracker";

export const ViewName = {
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

const fetchDayData = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
		const day = String(date.getDate()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`;
		const url = `https://walak.vercel.app/api/sleep-track?date=${encodeURIComponent(formattedDate)}`;

		fetch(url)
  .then(response => response.json())
  .then(data => {
				alert(JSON.stringify(data));
    return data.data[0];
  })
  .catch(error => alert(error.message));
}

export function SleepTrackerComponent() {
	const [view, setView] = useState(ViewName.DAY);
	const [date, setDate] = useState(new Date());
const [dayData, setDayData] = useState({});

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
data={dayData}
			/>
<button onClick={async () => {
const data = fetchDayData(date);
setDayData(data);
}}>
fetch date data
</button>
			<SleepNavigation
				view={view}
				setView={setView}
			date={date}
				data={dayData}
				handleDateChange={handleDateChange}
			/>
		</div>
	);
}
