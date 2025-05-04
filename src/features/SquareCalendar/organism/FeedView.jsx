import { Calendars } from "../constants"
import { CalendarMonth } from "../organism/CalendarMonth";
import PropTypes from "prop-types";
import { isSameDay } from "date-fns";
import { useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils";
import { DateStrip } from "../molecules/DateStrip";

const FeedItem = ({
    calendar,
    selectedDate,
    setSelectedDate,
    selectedDateNote,
    updateColor,
    setSelectedDateNote,
}) => {
    const data = loadFromStorage(calendar.key);

    return (
        <>
            <h1 className="text-xl font-bold mb-4">
                {calendar.icon} {calendar.name.toUpperCase()}
            </h1>
            <CalendarMonth
                size="medium"
                selectedDate={selectedDate}
                monthIndex={selectedDate.getMonth()}
                note={data.find(item => isSameDay(item.date, selectedDate))?.note || ""}
                calendar={calendar}
                data={data}
                setSelectedDate={newDate => {
                    setSelectedDate(newDate);
                    const dayItem = data.find(item => isSameDay(item.date, newDate));
                    setSelectedDateNote(dayItem?.note || "");
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
                            newData = [...data, { date: selectedDate, color, note: selectedDateNote }];
                        }
                    }

                    // setData(newData);
                    // alert("calendar.key " + calendar.key);
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

                        // setData(newData);
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
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired,
}

export const FeedView = ({
    // selectedDate,
    selectedDateNote,
    updateColor,
    // setSelectedDate,
    setSelectedDateNote,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="w-full h-dvh overflow-y-auto pb-40">
            <DateStrip
                length={10}
                type="month"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />
            {Object.values(Calendars).map((calendar) => (
                <div key={calendar.key} className="bg-white dark:bg-gray-800
                 my-4 shadow-md rounded-xl p-4">
                    <FeedItem
                        calendar={calendar}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedDateNote={selectedDateNote}
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
