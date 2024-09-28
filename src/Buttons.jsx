import {useState} from "react";
import {Button} from "./Button.jsx";

export const Buttons = ({item, onRead, onQueryClick }) => {
    const [question, setQuestion] = useState("");
    const [isRead, setIsRead] = useState(
        localStorage.getItem(item.link) === "read" || false
    );

    return (
        <div
            id={`buttons-${isRead ? "read" : "unread"}`}
            className="grid grid-cols-3 gap-1 items-center justify-end w-full">
            <Button>
                {item.diff.value}
                {item.diff.unit}
            </Button>
            <Button>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    🔗
                </a>
            </Button>
            <Button
                onClick={() => {
                    setIsRead(true);
                    onRead();
                    localStorage.setItem(item.link, "read");
                }}>
                ☑️
            </Button>
            <div className="flex items-center gap-1 col-span-3">
                <input
                    type="text"
                    placeholder="Question"
                    className="border border-gray-300 w-2/3 rounded-md p-1 h-8"
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    className="w-1/3"
                    onClick={() => onQueryClick(question)}>?</Button>
            </div>
        </div>
    );
};