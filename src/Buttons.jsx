import { useState } from "react";
import { Button } from "./Button.jsx";

export const Buttons = ({ item, onRead, onQueryClick }) => {
	const [isRead, setIsRead] = useState(
		localStorage.getItem(item.link) === "read" || false
	);

	return (
		<div
			id={`buttons-${isRead ? "read" : "unread"}`}
			className="flex gap-2 items-center justify-center w-full">
			<Button>
				{item.diff.value}
				{item.diff.unit}
			</Button>
			<Button
				onClick={() => {
					setIsRead(true);
					onRead();
					localStorage.setItem(item.link, "read");
				}}>
				✔️
			</Button>
			<Button onClick={onQueryClick}>?</Button>
			<Button>
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
