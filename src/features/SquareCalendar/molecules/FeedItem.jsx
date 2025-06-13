import { useState, useEffect } from "react";
import { loadFromStorage } from "../utils";
import { CalendarGamification } from "./CalendarGamification";
import { CalendarMonth } from "../organism/CalendarMonth";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { Note, Calendar } from "@phosphor-icons/react"

export const FeedItem = ({
    calendar,
    selectedDate,
    setSelectedDate,
    updateData,
    isSelected,
    setSelectedCalendar,
    onCalendarViewClick,
    onNoteViewClick,
    colorChanged,
}) => {
    const [data, setData] = useState([]);
    const [color, setColor] = useState("");
    const [note, setNote] = useState("");

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                const loadedData = await loadFromStorage(calendar.key);
                setData(loadedData || []);
            } catch (error) {
                console.error('Error loading calendar data:', error);
                setData([]);
            }
        };
        loadData();
    }, [calendar.key]);

    useEffect(() => {
        if (!selectedDate) return;

        setColor(data.find(item => {
            return isSameDay(item.date, selectedDate)?.color || "";
        }));

        setNote(data.find(item => {
            return isSameDay(item.date, selectedDate)?.note || "";
        }));
    }, [selectedDate, data]);

    useEffect(() => {
        const reloadData = async () => {
            try {
                const loadedData = await loadFromStorage(calendar.key);
                setData(loadedData);
            } catch (error) {
                console.error('Error reloading calendar data:', error);
            }
        };
        reloadData();
    }, [colorChanged, calendar.key]);

    return (
        <CalendarMonth
            size="medium"
            isSelected={isSelected}
            setSelectedCalendar={setSelectedCalendar}
            selectedDate={selectedDate}
            monthIndex={selectedDate?.getMonth()}
            note={note}
            calendar={calendar}
            data={data}
            header={(
                <div className="flex gap-1 justify-between items-center">

                    <h1 className="text-xs font-bold w-full px-2">
                        {calendar.name.slice(0, 4).toUpperCase()}
                    </h1>
                </div>
            )}
            showNote={true}
            setSelectedDate={async (newDate) => {
                setSelectedDate(newDate);
                const dayItem = data.find(item => isSameDay(item.date, newDate));
                setNote(dayItem?.note || "");
                try {
                    const reloadedData = await loadFromStorage(calendar.key);
                    setData(reloadedData);
                } catch (error) {
                    console.error('Error reloading data:', error);
                }
            }}
            onColorSelect={async (color, date) => {
                setColor(color);
                updateData({ color, note, date, data, calendar });
                try {
                    const reloadedData = await loadFromStorage(calendar.key);
                    setData(reloadedData);
                } catch (error) {
                    console.error('Error reloading data:', error);
                }
            }}
            onNoteUpdate={async (note, date) => {
                updateData({ color, note, date, data, calendar });
                try {
                    const reloadedData = await loadFromStorage(calendar.key);
                    setData(reloadedData);
                } catch (error) {
                    console.error('Error reloading data:', error);
                }
            }}>
            <div className="flex flex-col gap-1 items-start w-full justify-between">
                <CalendarGamification calendar={calendar} size="small" />
                <div className="flex gap-1 bg-stone-600 rounded-md p-1">
                    <button className="text-xs font-bold" onClick={() => onCalendarViewClick(calendar)}>
                        <Calendar size={16} />
                    </button>
                    <button className="text-xs font-bold" onClick={() => onNoteViewClick(calendar)}>
                        <Note size={16} />
                    </button>
                </div>
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