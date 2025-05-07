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
    updateColor,
    showNote,
}) => {
    const [data, setData] = useState(loadFromStorage(calendar.key) || []);
    const [note, setNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");

    return (
        <>
            <div className="flex items-center w-full justify-between mb-4">
                <h1 className="text-xl font-bold">
                    {calendar.icon} {calendar.name.toUpperCase()}
                </h1>
                <CalendarGamification calendar={calendar} size="big" />
            </div>
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
                onColorSelect={(color) => {
                    let newData;

                    if (color === 'clear') {
                        newData = data.filter(item => !isSameDay(item.date, selectedDate));
                    } else {
                        const existingEntry = data.find(item =>
                            isSameDay(item.date, selectedDate));

                        if (existingEntry) {
                            newData = data.map(item =>
                                isSameDay(item.date, selectedDate)
                                    ? { ...item, color }
                                    : item
                            );
                        } else {
                            newData = [...data, { date: selectedDate, color, note }];
                        }
                    }

                    setData(newData);
                    saveToStorage(calendar.key, newData);
                }}
                onNoteUpdate={(value, callback) => {
                    try {
                        let newData = [...data];
                        const hasDay = newData.find(item => isSameDay(item.date, selectedDate));
                        if (hasDay) {
                            newData = newData.map(item =>
                                isSameDay(item.date, selectedDate)
                                    ? { ...item, note: value }
                                    : item);
                        } else {
                            newData.push({ date: selectedDate, note: value });
                        }

                        setData(newData);
                        saveToStorage(calendar.key, newData);
                        setNote(value);
                        callback?.(true);
                    } catch (error) {
                        console.error(error);
                        callback?.(false);
                    }
                }} />
        </>
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