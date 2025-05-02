import { CalendarDayView } from "./CalendarDayView";
import { CalendarsList } from "./CalendarsList";
import { TextualDayView } from "./TextualDayView";
import { CalendarMonth } from "./CalendarMonth";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { HourView } from "../../HourlyTracker/HourView";

export const Body = ({
    view,
    data,
    selectedDate,
    yearMap,
    setSelectedDate,
    setView,
    onCalendarClick,
    setSelectedDateNote,
    setData,
    saveToStorage,
    calendar,
    selectedDateNote
}) => {
    const updateColor = useCallback((color) => {
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

        setData(newData);
        saveToStorage(calendar.key, newData);
    }, [selectedDate, data, calendar, selectedDateNote, setData, saveToStorage]);

    switch (view) {
        case "note":
            return (
                <CalendarDayView
                    data={data}
                    selectedDate={selectedDate} />
            );

        case "hour":
            return (
                <HourView />
            );

        case "list":
            return (
                <CalendarsList
                    isOpen
                    onClose={() => setView("month")}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setView("month");
                    }} />
            );

        case "day":
            return (
                <TextualDayView
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            );

        case "year":
            return (
                <div>
                    <div className="flex gap-2">
                    <button onClick={() => setSelectedDate(new Date(2025, 0, 1))}>2025</button>
                    <button onClick={() => setSelectedDate(new Date(2024, 0, 1))}>2024</button>
                                        <button onClick={() => setSelectedDate(new Date(2023, 0, 1))}>2023</button>
                                                            <button onClick={() => setSelectedDate(new Date(2022, 0, 1))}>2022</button>
                    </div>
                <div className="grid grid-cols-3 gap-1">
                    {yearMap.map((_, monthIndex) => {
                        return (
                            <CalendarMonth
                                key={monthIndex}
                                isYearView={true}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                data={data}
                                monthIndex={monthIndex} />
                        )
                    })}
                </div>
                </div>
            );

        case "month":
            return (
                <CalendarMonth
                    selectedDate={selectedDate}
                    size="big"
                    note={selectedDateNote}
                    calendar={calendar}
                    onColorSelect={updateColor}
                    data={data}
                    monthIndex={selectedDate.getMonth()}
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
            )
    }
};

Body.propTypes = {
    view: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setView: PropTypes.func.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
    setSelectedDateNote: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    saveToStorage: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    selectedDateNote: PropTypes.string,
    yearMap: PropTypes.array.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};
