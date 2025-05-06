import { Calendars } from "../constants"
import { CalendarMonth } from "../organism/CalendarMonth";
import PropTypes from "prop-types";
import { isSameDay } from "date-fns";
import { useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils";
import { DateStrip } from "../molecules/DateStrip";
import { Note } from "@phosphor-icons/react";
import { CalendarGamification } from "../molecules/CalendarGamification";

const FeedItem = ({
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
                showNote={showNote}
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

export const FeedView = ({
    // selectedDate,
    selectedDateNote,
    updateColor,
    // setSelectedDate,
    setSelectedDateNote,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showNotes, setShowNotes] = useState(false);

    return (
        <div className="w-full h-dvh overflow-y-auto pb-40">
            <div className="flex justify-between items-center font-serif">
                <h1 className="text-2xl font-bold">Blocks</h1>
            </div>
            <div className="flex gap-4 items-center sticky z-10 top-0 bg-stone-100 dark:bg-stone-900">
                <button onClick={() => setShowNotes(!showNotes)}>
                    <Note size={24} weight={showNotes ? "fill" : "regular"} />
                </button>
                <DateStrip
                    length={10}
                    type="month"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} />
            </div>
            {Object.values(Calendars).map((calendar) => (
                <div key={calendar.key} className="bg-white dark:bg-stone-800
                 my-4 shadow-md rounded-xl p-4">
                    <FeedItem
                        showNote={showNotes}
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
