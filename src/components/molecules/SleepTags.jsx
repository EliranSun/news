import classNames from "classnames";
import { Label } from "../ui/label";
import { useState } from "react";

const API_URL = "https://walak.vercel.app/api/sleep-track/tags";

function reduceTime(timeStr, minutesToReduce) {
  // Split the hour and minute from the input string
  const [hours, minutes] = timeStr.split(":").map(Number);
  
  if (!hours || !minutes) return NaN;
  
  // Convert the time into total minutes
  let totalMinutes = hours * 60 + minutes;
  
  // Reduce the minutes
  totalMinutes -= minutesToReduce;
  
  // Handle any negative minute values (wrap around)
  if (totalMinutes < 0) {
    totalMinutes = (24 * 60 + totalMinutes) % (24 * 60);
  }
  
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
	if (label.toLowerCase().includes("water")) {
		const time = reduceTime(sleepStart, 90);
    if (time) modifiedLabel = `water by ${time}`;
		}
		
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
