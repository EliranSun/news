import { useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils";
import { CalendarGamification } from "./CalendarGamification";
import { CalendarMonth } from "../organism/CalendarMonth";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";

export const FeedItem = ({
    calendar,
    selectedDate,
    setSelectedDate,
    updateData
}) => {
    const [data, setData] = useState(loadFromStorage(calendar.key) || []);
    const [color, setColor] = useState("");
    const [note, setNote] = useState("");

useEffect(() => {
    setColor(data.find(item => {
        return isSameDay(item.date, selectedDate)?.color || "";
        }));
        
    setNote(data.find(item => {
        return isSameDay(item.date, selectedDate)?.note || "";
        }));
    }, [data]);
    
    return (
        <CalendarMonth
            size="medium"
            selectedDate={selectedDate}
            monthIndex={selectedDate.getMonth()}
            note={note}
            calendar={calendar}
            data={data}
            title={(
                <h1 className="text-xs font-bold w-full">
                    {calendar.icon} {calendar.name.toUpperCase()}
                </h1>
            )}
            showNote={true}
            setSelectedDate={newDate => {
                setSelectedDate(newDate);
                const dayItem = data.find(item => isSameDay(item.date, newDate));
                setNote(dayItem?.note || "");
                setData(loadFromStorage(calendar.key));
            }}
            onColorSelect={(color, date) => {
                setColor(color);
                updateData({ color, note, date, data, calendar });
                setData(loadFromStorage(calendar.key));
            }}
            onNoteUpdate={(note, date) => {
                updateData({ color, note, date, data, calendar });
                setData(loadFromStorage(calendar.key));
            }}>
            <div className="flex flex-col gap-1 items-start w-full justify-between">
                <CalendarGamification calendar={calendar} size="small" />
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