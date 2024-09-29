import { useState } from "react";
import { Button } from "./Button.jsx";

export const Buttons = ({ item, onRead }) => {
	const [isRead, setIsRead] = useState(
		localStorage.getItem(item.link) === "read" || false
	);

	return (
		<div
			id={`buttons-${isRead ? "read" : "unread"}`}
			className="flex flex-col gap-1 items-center justify-end w-full">
			<Button
				onClick={() => {
					setIsRead(true);
					onRead();
					localStorage.setItem(item.link, "read");
				}}>
				✔️
			</Button>
			<Button>
				<a
					href={item.link}
					target="_blank"
					rel="noopener noreferrer">
					🔗
				</a>
			</Button>
			<Button>
				{item.diff.value}
				{item.diff.unit}
			</Button>
		</div>
	);
};
