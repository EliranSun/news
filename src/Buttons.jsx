import { useState } from "react";
import { Button } from "./Button.jsx";

export const Buttons = ({ item, position, listLength, onQueryClick }) => {
	const [isRead] = useState(
		localStorage.getItem(item.link) === "read" || false
	);

	return (
		<div
			id={`buttons-${isRead ? "read" : "unread"}`}
			className={`flex gap-2 items-center justify-evenly w-full`}>
			<Button className="h-12">
				{position} / {listLength}
			</Button>
			<Button className="h-12">
				{item.diff.value}
				{item.diff.unit}
			</Button>
			<Button
				className="h-12"
				onClick={onQueryClick}>
				?
			</Button>
			<Button className="h-12">
				<a
					href={item.link}
					target="_blank"
					rel="noopener noreferrer">
					🔗
				</a>
			</Button>
		</div>
	);
};
