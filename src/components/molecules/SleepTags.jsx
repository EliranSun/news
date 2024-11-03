import classNames from "classnames";
import { Label } from "../ui/label";
import { useState } from "react";

const API_URL = "https://walak.vercel.app/api/sleep-track/tags";

const Tag = ({ id, label, emoji, selectedTags = [] }) => {
	const [isSelected, setIsSelected] = useState(selectedTags.includes(label));

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
				{emoji} {label}
			</label>
		</div>
	);
};

export const SleepTags = ({ id, tags = [], selectedTags = [] }) => {
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
					/>
				))}
			</div>
		</div>
	);
};
