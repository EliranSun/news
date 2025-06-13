import classNames from "classnames";
import { isSameDay } from "date-fns";
import { useState, useMemo } from "react";
import { CalendarGamification } from "../molecules/CalendarGamification";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { NoteModal } from "../molecules/NoteModal";
import { getColorsClassList } from "../utils";
import PropTypes from "prop-types";

export const SingleCalendar = ({
    calendar,
    selectedDate,
    updateData,
    data,
    openNoteModal,
    openCalendarModal,
}) => {
    const hasNote = useMemo(() => data.find(item => isSameDay(item.date, selectedDate))?.note, [data, selectedDate]);

    const selectedColorClass = useMemo(() => {
        const selectedColor = data.find(item => isSameDay(item.date, selectedDate))?.color;
        return selectedColor ? getColorsClassList(selectedColor) : null;
    }, [data, selectedDate]);

    return (
        <div className="p-4 w-full my-2 border-b last:border-b-0">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold uppercase heebo-900 mb-2">
                    {calendar.icon} {calendar.name}
                </h2>
            </div>
            <ColorsButtons
                display="compact"
                calendar={calendar}
                data={data}
                selectedColorClass={selectedColorClass}
                selectedDate={selectedDate}
                onColorSelect={(color) => updateData({ color, date: selectedDate, calendar })} />
            <div className="flex justify-start items-center gap-2 py-2 rounded-full w-fit mt-4">
                <CalendarGamification
                    calendar={calendar}
                    variant="default"
                    data={data}
                    hideToday
                    hideIcons />
                <span
                    onClick={() => openNoteModal(calendar)}
                    className={classNames("text-sm border py-2 px-4 rounded-full", {
                        "text-stone-500": !hasNote,
                        "text-stone-900 font-bold": hasNote,
                    }, "cursor-pointer")}>
                    {hasNote ? "Noted" : "Add Note"}
                </span>
                <span
                    onClick={() => openCalendarModal(calendar)}
                    className={classNames("text-sm text-stone-500 border py-2 px-4 rounded-full", "cursor-pointer")}>
                    Calendar
                </span>
            </div>
        </div>
    );
};



SingleCalendar.propTypes = {
    calendar: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    updateData: PropTypes.func.isRequired,
    openNoteModal: PropTypes.func,
    openCalendarModal: PropTypes.func,
};