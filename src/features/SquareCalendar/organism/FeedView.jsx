import { Calendars } from "../constants"
import { CalendarMonth } from "../organism/CalendarMonth";
import PropTypes from "prop-types";
import { isSameDay } from "date-fns";
import { useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils";

const FeedItem = ({
    calendar,
    selectedDateNote,
    updateColor,
    setSelectedDateNote,
    onNoteUpdate
}) => {
    const data = loadFromStorage(calendar.key);
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <>
            <h1 className="text-xl font-bold mb-4">{calendar.icon} {calendar.name.toUpperCase()}</h1>
            <CalendarMonth
                size="medium"
                selectedDate={selectedDate}
                monthIndex={selectedDate.getMonth()}
                note={data.find(item => isSameDay(item.date, selectedDate))?.note || ""}
                calendar={calendar}
                onColorSelect={updateColor}
                data={data}
                setSelectedDate={newDate => {
                    setSelectedDate(newDate);
                    const dayItem = data.find(item => isSameDay(item.date, newDate));
                    setSelectedDateNote(dayItem?.note || "");
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
                        setSelectedDateNote(value);
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
}

export const FeedView = ({
    selectedDate,
    selectedDateNote,
    updateColor,
    setSelectedDate,
    setSelectedDateNote,
}) => {
    return (
        <div className="w-full h-dvh overflow-y-auto">
            {Object.values(Calendars).map((calendar) => (
                <div key={calendar.key} className="border-b border-gray-200 py-4">
                    <FeedItem
                        calendar={calendar}
                        selectedDate={selectedDate}
                        selectedDateNote={selectedDateNote}
                        updateColor={updateColor}
                        setSelectedDate={setSelectedDate}
                        setSelectedDateNote={setSelectedDateNote}
                    />
                </div>
            ))}
        </div>
    )
}

FeedView.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    selectedDateNote: PropTypes.string.isRequired,
    updateColor: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    setSelectedDateNote: PropTypes.func.isRequired,
    onNoteUpdate: PropTypes.func.isRequired,
}
