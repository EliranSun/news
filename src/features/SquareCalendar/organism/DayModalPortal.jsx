import { createPortal } from "react-dom";
import classNames from "classnames";
import { format, isSameDay } from "date-fns";
import { X, FloppyDisk, Check } from "@phosphor-icons/react";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { useState } from "react";
import { CalendarGamification } from "../molecules/CalendarGamification";

export const DayModalPortal = ({
    colorClass,
    onClose,
    calendar,
    selectedDate,
    data,
    onColorSelect,
    onNoteUpdate,
    // note,
    // setNote,
    // setIsNoteSaved,
    monthIndex,
}) => {
    const [note, setNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");
    const [color, setColor] = useState(data.find(item => isSameDay(item.date, selectedDate))?.color || "");
    const [isLoading, setIsLoading] = useState(false);

    console.log({ colorClass, color });

    return createPortal((
        <div className={classNames(colorClass || "bg-stone-100 dark:bg-stone-900", {
            "fixed z-50 w-screen h-screen": true,
            "flex flex-col items-center justify-center": true,
            "p-5 space-y-4": true,
        })}>
            <button
                className="bg-transparent"
                onClick={onClose}>
                <X size={42} />
            </button>
            <h1 className="merriweather-bold text-3xl text-left w-full">
                {calendar.icon} {calendar.name.toUpperCase()}
            </h1>
            <h2 className="merriweather-bold text-2xl text-left w-full">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h2>
            <CalendarGamification calendar={calendar} />
            <ColorsButtons
                data={data}
                calendar={calendar}
                selectedColorClass={colorClass}
                selectedDate={selectedDate}
                monthIndex={monthIndex}
                onClose={onClose}
                onColorSelect={color => {
                    console.log(color);
                    setColor(color);
                    onColorSelect(color, selectedDate);
                }}
            />
            <textarea
                value={note}
                placeholder="Note"
                onChange={event => setNote(event.target.value)}
                className={classNames({
                    "w-full p-2 merriweather-bold": true,
                    "h-1/2 bg-transparent text-xl": true,
                })}
            />
            <button
                className="flex w-full items-center justify-center z-0 bg-transparent"
                onClick={() => {
                    setIsLoading(true);
                    setNote(note);
                    onNoteUpdate(note, selectedDate);
                    setTimeout(() => setIsLoading(false), 1000);
                }}>
                {isLoading ? <Check size={42} /> : <FloppyDisk size={42} />}
            </button>
        </div>
    ), document.getElementById("day-popover-portal"))
}
