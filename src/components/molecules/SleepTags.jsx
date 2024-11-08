import classNames from "classnames";
import { Label } from "../ui/label";
import { useState } from "react";

const API_URL = "https://walak.vercel.app/api/sleep-track/tags";

function reduceTime(timeStr, minutesToReduce) {
  // Validate the input time string format
  if (!/^\d{2}:\d{2}$/.test(timeStr)) {
    throw new Error("Invalid time format. Please use 'HH:MM' format.");
  }
  
  // Split hours and minutes and parse them as numbers
  let [hours, minutes] = timeStr.split(":").map(Number);
  
  // Validate the range of hours and minutes
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time values. Hours should be 0-23 and minutes 0-59.");
  }
  
  // Validate the minutes to reduce
  if (typeof minutesToReduce !== "number" || minutesToReduce < 0) {
    throw new Error("Minutes to reduce should be a non-negative number.");
  }

  // Convert the time into total minutes
  let totalMinutes = hours * 60 + minutes;

  // Reduce the minutes, wrapping around 24-hour format if needed
  totalMinutes = (totalMinutes - minutesToReduce) % (24 * 60);
  if (totalMinutes < 0) totalMinutes += 24 * 60; // handle underflow

  // Calculate the new hours and minutes
  const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const newMinutes = (totalMinutes % 60).toString().padStart(2, "0");

  // Return the formatted time string
  return `${newHours}:${newMinutes}`;
}

// Example usage:
console.log(reduceTime("00:00", 90)); // "22:30"

const Tag = ({ id, label, emoji, sleepStart, selectedTags = [] }) => {
	const [isSelected, setIsSelected] = useState(selectedTags.includes(label));
	let modifiedLabel = label;
	try {
  if (label.toLowerCase().includes("water")) {
		const time = reduceTime(sleepStart, 180);
    if (time) modifiedLabel = `water by ${time}`;
		}
		
    if (label.toLowerCase().includes("food")) {
		const time = reduceTime(sleepStart, 120);
    if (time) modifiedLabel = `food by ${time}`;
		}
    
    if (label.toLowerCase().includes("screen")) {
		const time = reduceTime(sleepStart, 60);
    if (time) modifiedLabel = `screen by ${time}`;
		}
    
  } catch (error) {}
  
	return (
		<div
			onClick={async () => {
				setIsSelected(!isSelected);
				fetch(API_URL, {
					method: "POST",
					body: JSON.stringify({
						id,
						tag: label,
					}),
				});
			}}
			className={classNames({
				"hover:bg-gray-100": true,
				"flex items-center border rounded-md p-1 cursor-pointer": true,
				"bg-black text-white": isSelected,
			})}>
			<label
				htmlFor={label}
				className="text-xs font-medium leading-none 
                      peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				{emoji} {modifiedLabel}
			</label>
		</div>
	);
};

export const SleepTags = ({ id, tags = [], sleepStart = "", selectedTags = [] }) => {
	console.log({ id, tags, selectedTags });
	return (
		<div>
			<Label>Tags</Label>
			<div className="flex flex-wrap gap-1 mt-2">
				{tags.map((tag) => (
					<Tag
						key={id + tag.label}
						id={id}
						label={tag.label}
						emoji={tag.emoji}
						selectedTags={selectedTags}
						sleepStart={sleepStart}
					/>
				))}
			</div>
		</div>
	);
};
