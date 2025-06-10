import { useState, useMemo, useEffect } from "react";
import { isSameDay } from "date-fns";
import { loadFromStorage } from "../utils";
import PropTypes from "prop-types";

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
        <div className="fixed inset-0 w-screen h-screen backdrop-brightness-50 z-50 p-2" onClick={onClose}>
            <div className="flex flex-col items-center justify-center
             bg-stone-100 dark:bg-stone-800 rounded-md h-2/3 p-4
             border border-stone-300 dark:border-stone-700 max-h-dvh z-50 space-y-4"
                onClick={e => e.stopPropagation()}>
                <h1 className="text-lg font-bold inter-500 w-full my-4">
                    {calendar.icon} {calendar.name},{" "}
                    {date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </h1>
                <textarea
                    className="w-full h-full bg-transparent border border-stone-300 dark:border-stone-700 rounded-md p-2 inter-500"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex gap-2">
                    <button onClick={onClose}>
                        Close
                    </button>
                    <button 
                    className="bg-blue-400"
                    onClick={() => {
                        updateData({ note, date, data, calendar });
                        setIsSaved(true);
                    }}>
                        {isSaved ? "Saved!" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}


NoteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    updateData: PropTypes.func.isRequired
};