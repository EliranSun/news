import { useState, useMemo, useEffect } from "react";
import { isSameDay } from "date-fns";
import { loadFromStorage } from "../utils";

export const NoteModal = ({ isOpen, onClose, calendar, date, updateData }) => {
    const [isSaved, setIsSaved] = useState(false);
    const data = useMemo(() => loadFromStorage(calendar.key), [calendar.key]);
    const [note, setNote] = useState(data.find(item => isSameDay(item.date, date))?.note || "");

    useEffect(() => {
        setIsSaved(false);
        setNote(data.find(item => isSameDay(item.date, date))?.note || "");
    }, [data, date]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen backdrop-brightness-50 z-50 p-10" onClick={onClose}>
            <div className="flex flex-col items-center justify-center
             bg-stone-100 dark:bg-stone-800 rounded-md h-full p-4
             border border-stone-300 dark:border-stone-700 max-h-dvh z-50 space-y-4"
                onClick={e => e.stopPropagation()}>
                <div className="flex gap-2 w-full justify-between">
                    <button onClick={onClose}>
                        Close
                    </button>
                    <button onClick={() => {
                        updateData({ note, date, data, calendar });
                        setIsSaved(true);
                    }}>
                        {isSaved ? "Saved!" : "Save"}
                    </button>
                </div>
                <h1 className="text-base font-bold inter-500 w-full my-8 text-center">
                    {date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </h1>
                <textarea
                    className="w-full h-full bg-transparent border border-stone-300 dark:border-stone-700 rounded-md p-2 inter-500"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
        </div>
    )
}