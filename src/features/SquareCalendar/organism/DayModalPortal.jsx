import { createPortal } from "react-dom";
import classNames from "classnames";
import { format, isSameDay } from "date-fns";
import { X, FloppyDisk, Check } from "@phosphor-icons/react";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { useState } from "react";
import { CalendarGamification } from "../molecules/CalendarGamification";
import { motion, AnimatePresence } from "motion/react";

export const DayModalPortal = ({
    colorClass,
    onClose,
    isOpen = false,
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
        <AnimatePresence>
            <motion.div
                className={classNames("bg-stone-100 dark:bg-stone-900", {
                    "fixed z-50 w-screen h-screen": true,
                    "flex flex-col items-center justify-center": true,
                    "p-5 space-y-4": true,
                })}
                initial={{ y: "100%" }}
                exit={{ y: "100%" }}
                animate={{ y: isOpen ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <button
                    className="bg-transparent"
                    onClick={onClose}>
                    <X size={42} />
                </button>
                <div className="w-full flex items-center justify-between">
                    <h1 className="merriweather-bold text-3xl text-left w-full">
                        {calendar.icon} {calendar.name.toUpperCase()}
                    </h1>
                    <CalendarGamification
                        size="big"
                        calendar={calendar} />
                </div>
                <h2 className={classNames(colorClass, "merriweather-bold text-2xl text-left w-full")}>
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h2>

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
            </motion.div>
        </AnimatePresence>
    ), document.getElementById("day-popover-portal"))
}
