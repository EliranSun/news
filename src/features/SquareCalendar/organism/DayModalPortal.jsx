import { createPortal } from "react-dom";
import classNames from "classnames";
import { format } from "date-fns";
import { X, FloppyDisk } from "@phosphor-icons/react";
import { ColorsButtons } from "../molecules/ColorsButtons";

export const DayModalPortal = ({
    colorClass,
    setIsDaySelected,
    calendar,
    selectedDate,
    data,
    onColorSelect,
    onNoteUpdate,
    note,
    setNote,
    setIsNoteSaved,
    monthIndex,
}) => {
    return createPortal((
        <div className={classNames(colorClass || "bg-stone-100 dark:bg-stone-900", {
            "fixed z-50 w-screen h-screen": true,
            "flex flex-col items-center justify-center": true,
            "p-5 space-y-4": true,
        })}>
            <button
                className="bg-transparent"
                onClick={() => setIsDaySelected(false)}>
                <X size={42} />
            </button>
            <h1 className="merriweather-bold text-3xl text-left w-full">
                {calendar.icon} {calendar.name.toUpperCase()}
            </h1>
            <h2 className="merriweather-bold text-2xl text-left w-full">
                {format(selectedDate, "EEEE, MMMM d, yyyy")},
                {colorClass}
            </h2>
            <ColorsButtons
                data={data}
                calendar={calendar}
                selectedColorClass={colorClass}
                selectedDate={selectedDate}
                monthIndex={monthIndex}
                onClose={() => setIsDaySelected(false)}
                onColorSelect={color => {
                    onColorSelect(color);
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
                onClick={() => onNoteUpdate(note, (success) => {
                    setIsNoteSaved(success);
                    setTimeout(() => {
                        setIsNoteSaved(null);
                    }, 1000);
                })}>
                <FloppyDisk size={42} />
            </button>
        </div>
    ), document.getElementById("day-popover-portal"))
}
