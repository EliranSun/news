import { useState } from "react";
import { Button } from "./Button.jsx";

const currentHour = new Date().getHours();

export const Buttons = ({ item, onRead, onQueryClick }) => {
	const [isRead, setIsRead] = useState(
		localStorage.getItem(item.link) === "read" || false
	);

	return (
		<div
			id={`buttons-${isRead ? "read" : "unread"}`}
			className={`flex gap-2 items-center ${
				currentHour > 18 ? "justify-end" : "justify-start"
			} w-full`}>
			<Button className="h-12 w-20">
				{item.diff.value}
				{item.diff.unit}
			</Button>
			<Button
				className="h-12 w-20"
				onClick={onQueryClick}>
				?
			</Button>
			<Button className="h-12 w-20">
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
