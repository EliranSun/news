import { CalendarDayView } from "./CalendarDayView";
import { CalendarsList } from "./CalendarsList";
import { TextualDayView } from "./TextualDayView";
import { CalendarMonth } from "./CalendarMonth";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState, useContext } from "react";
import { HourView } from "../../HourlyTracker/HourView";
import { WeeklyListView } from "./WeeklyListView";
import { FeedView } from "./FeedView";
import { Header } from "../molecules/Header";
import { differenceInDays } from "date-fns";
import { CalendarYearColorInfo } from "../molecules/CalendarYearColorInfo";
import { CalendarsStrip } from "../molecules/CalendarsStrip";
import { ColorWheel } from "../molecules/ColorWheel";
import { Info, Note } from "@phosphor-icons/react"
import { PointerContext } from "../PointerContext";

const InfoStates = ["none", "days", "notes"];

const NoteModal = ({ isOpen, onClose }) => {
    const [note, setNote] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 inset-x-0 flex flex-col items-center justify-center
         bg-stone-100 dark:bg-stone-800 rounded-md p-4 w-screen h-[97vh] z-50 space-y-4">
            <div className="flex gap-2 w-full justify-between">
                <button onClick={() => setNote("")}>Save</button>
                <button onClick={() => {
                    setNote("");
                    onClose();
                }}>Cancel</button>
            </div>
            <textarea
                className="w-full h-full bg-transparent border-none outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
        </div>
    )
}

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
    selectedDateNote,
    onCalendarViewClick,
    onNoteViewClick
}) => {
    const [infoStateIndex, setInfoStateIndex] = useState(0);
    const { pointerX, pointerY } = useContext(PointerContext);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

    const updateData = useCallback(({ color, note, date, data: calendarData, calendar: localCalendar }) => {
        let newData;
        const formattedDate = date;

        if (color === 'clear') {
            newData = calendarData.filter(item => item.date.getTime() !== formattedDate.getTime());
        } else {
            const existingEntry = calendarData.find(item => isSameDay(item.date, formattedDate));
            if (existingEntry) {
                newData = calendarData.map(item =>
                    isSameDay(item.date, formattedDate)
                        ? { ...item, color, note }
                        : item
                );
            } else {
                newData = [...calendarData, { date, color, note }];
            }
        }

        saveToStorage(localCalendar.key, newData);
        setData(newData);
    }, [saveToStorage, setData]);

    switch (view) {
        case "week":
            return (
                <WeeklyListView updateData={updateData} />
            );

        case "feed":
            return (
                <FeedView
                    selectedDate={selectedDate}
                    selectedDateNote={selectedDateNote}
                    data={data}
                    updateData={updateData}
                    setSelectedDate={setSelectedDate}
                    setSelectedDateNote={setSelectedDateNote}
                    onCalendarViewClick={onCalendarViewClick}
                    onNoteViewClick={onNoteViewClick}
                />
            );

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
                <div className="space-y-6 mx-2 w-[calc(100vw-1rem)]">
                    <div className="overflow-x-scroll flex flex-nowrap gap-2">
                        <CalendarsStrip
                            data={data}
                            isVisible={view === "year"}
                            selectedCalendar={calendar}
                            onCalendarClick={onCalendarClick} />
                    </div>
                    <Header
                        calendar={calendar}
                        selectedDate={selectedDate}
                        daysSinceLastEntry={daysSinceLastEntry}
                        data={data}>
                        <Info size={16} weight="bold" onClick={() =>
                            setInfoStateIndex((index) => (index + 1) % InfoStates.length)
                        } />
                    </Header>

                    {/* <div className="flex gap-2">
                        <button onClick={() => setSelectedDate(new Date(2025, 0, 1))}>2025</button>
                        <button onClick={() => setSelectedDate(new Date(2024, 0, 1))}>2024</button>
                        <button onClick={() => setSelectedDate(new Date(2023, 0, 1))}>2023</button>
                        <button onClick={() => setSelectedDate(new Date(2022, 0, 1))}>2022</button>
                    </div> */}
                    <div className="grid grid-cols-3 gap-2">
                        {yearMap.map((_, monthIndex) => {
                            return (
                                <CalendarMonth
                                    key={monthIndex}
                                    isYearView={true}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    calendar={calendar}
                                    infoState={InfoStates[infoStateIndex]}
                                    data={data}
                                    monthIndex={monthIndex} />
                            )
                        })}
                    </div>
                    <CalendarYearColorInfo data={data} selectedDate={selectedDate} />
                    <ColorWheel
                        date={selectedDate}
                        calendar={calendar}
                        onColorSelect={(color) => {
                            updateData({ color, date: selectedDate, data, calendar });
                        }} />
                    {pointerX && pointerY && (
                        <span
                            onClick={() => setIsNoteModalOpen(true)}
                            style={{
                                left: pointerX - 100 || 0,
                                top: pointerY + 100 || 0,
                            }}
                            className="absolute shadow-lg border border-stone-300 dark:border-stone-700
                             bg-stone-200 dark:bg-stone-800 rounded-md p-2 z-10">
                            <Note size={32} />
                        </span>
                    )}
                    <NoteModal 
                    isOpen={isNoteModalOpen} 
                    // onSave={note => 
                    onClose={() => setIsNoteModalOpen(false)} />
                    <CalendarDayView
                        data={data}
                        selectedDate={selectedDate} />
                </div>
            );

        // case "month":
        //     return (
        //         <CalendarMonth
        //             selectedDate={selectedDate}
        //             size="big"
        //             note={selectedDateNote}
        //             calendar={calendar}
        //             onColorSelect={updateColor}
        //             data={data}
        //             monthIndex={selectedDate.getMonth()}
        //             setSelectedDate={newDate => {
        //                 setSelectedDate(newDate);
        //                 const dayItem = data.find(item => isSameDay(item.date, newDate));
        //                 setSelectedDateNote(dayItem?.note || "");
        //             }}
        //             onNoteUpdate={onNoteUpdate} />
        //     );
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
