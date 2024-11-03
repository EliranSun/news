import React, { useEffect, useState } from "react";
import { SleepNavigation } from "./../molecules/SleepNavigation";
import { SleepDayTracker } from "./sleep-day-tracker";
import { SleepGraph } from "./sleep-graph";
import { SleepMetricTracker } from "./sleep-metric-tracker";
import { addDays } from "date-fns";

export const ViewName = {
	DAY: "day",
	METRIC: "metric",
	ANALYSIS: "analysis",
};

const View = ({ view, data = [], date, ...rest }) => {
	switch (view) {
		case ViewName.DAY:
			return (
				<div>
					<div className="flex-col md:flex-row flex gap-4 w-screen overflow-x-auto">
						{data.map((dayData) => {
							if (!dayData || !dayData.id) return null;

							return (
								<SleepDayTracker
									key={dayData.id}
									date={date}
									data={dayData}
									{...rest}
								/>
							);
						})}
					</div>
					<div className="hidden md:block">
						<SleepGraph
							data={data}
							date={date}
							{...rest}
						/>
					</div>
				</div>
			);

		case ViewName.METRIC:
			return (
				<SleepMetricTracker
					data={data}
					date={date}
					{...rest}
				/>
			);

		case ViewName.ANALYSIS:
			return (
				<SleepGraph
					data={data}
					date={date}
					{...rest}
				/>
			);
	}
};

const fetchDayData = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
	const day = String(date.getDate()).padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	const url = `https://walak.vercel.app/api/sleep-track?date=${encodeURIComponent(
		formattedDate
	)}`;

	return fetch(url)
		.then((response) => response.json())
		.then((results) => {
			console.log({ results });
			return results.data.sort((a, b) => {
				if (!a.created_at || !b.created_at) return 0;
				return (
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				);
			});
		})
		.catch((error) => alert(error.message));
};

export function SleepTrackerComponent() {
	const [view, setView] = useState(ViewName.DAY);
	const [date, setDate] = useState(new Date());
	const [dayData, setDayData] = useState([
		{
			rem: "0",
			deep: "0",
			protein: "0",
			carbs: "0",
			fat: "0",
			selectedTags: [],
			feeling: "",
		},
	]);

	const handleDateChange = (newDate) => {
		setDate(newDate);
	};

	useEffect(() => {
		fetchDayData(date).then((data) => {
			setDayData(data);
		});
	}, [date]);

	return (
		<div className="container py-2 px-4 w-full fixed inset-0">
			<SleepNavigation
				view={view}
				setView={setView}
				date={date}
				data={dayData}
				handleDateChange={handleDateChange}
			/>
			<View
				view={view}
				date={date}
				data={dayData}
			/>
		</div>
	);
}
