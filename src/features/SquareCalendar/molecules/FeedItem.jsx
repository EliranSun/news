import { useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils";
import { CalendarGamification } from "./CalendarGamification";
import { CalendarMonth } from "../organism/CalendarMonth";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";

export const FeedItem = ({
    calendar,
    selectedDate,
    setSelectedDate,
    // updateColor,
    // showNote,
    updateData
}) => {
    const [data] = useState(loadFromStorage(calendar.key) || []);
    const [color, setColor] = useState(data.find(item => isSameDay(item.date, selectedDate))?.color || "");
    const [note, setNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");

    return (
        <CalendarMonth
            size="medium"
            selectedDate={selectedDate}
            monthIndex={selectedDate.getMonth()}
            note={note}
            calendar={calendar}
            data={data}
            showNote={true}
            setSelectedDate={newDate => {
                setSelectedDate(newDate);
                const dayItem = data.find(item => isSameDay(item.date, newDate));
                setNote(dayItem?.note || "");
            }}
            onColorSelect={(color, date) => {
                setColor(color);
                updateData(color, note, date);
            }}
            onNoteUpdate={(value, date) => {
                updateData(color, value, date);
            }}>
            <div className="flex gap-2 items-center w-full justify-between">
                <h1 className="text-base font-bold">
                    {calendar.icon} {calendar.name.toUpperCase()}
                </h1>
                <CalendarGamification calendar={calendar} size="big" />
            </div>
        </CalendarMonth>
    )
}

FeedItem.propTypes = {
    calendar: PropTypes.object.isRequired,
    selectedDateNote: PropTypes.string.isRequired,
    updateColor: PropTypes.func.isRequired,
    setSelectedDateNote: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired,
}