import { CalendarDayView } from "./CalendarDayView";
import { CalendarsList } from "./CalendarsList";
import { TextualDayView } from "./TextualDayView";
import { CalendarMonth } from "./CalendarMonth";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState, useContext, useEffect } from "react";
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
import { loadFromStorage, contrastColor } from "../utils";
import { ColorHexMap, TailwindColorsMap } from "../constants";
import classNames from "classnames";

const InfoStates = ["none", "days", "notes"];

const NoteModal = ({ isOpen, onClose, calendar, date, updateData }) => {
    const [isSaved, setIsSaved] = useState(false);
    const data = useMemo(() => loadFromStorage(calendar.key), [calendar.key]);
    const [note, setNote] = useState(data.find(item => isSameDay(item.date, date))?.note || "");

    useEffect(() => {
        setIsSaved(false);
        setNote(data.find(item => isSameDay(item.date, date))?.note || "");
    }, [data, date]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen backdrop-brightness-50 z-50 p-10" onClick={onClose}>
            <div className="flex flex-col items-center justify-center
             bg-stone-100 dark:bg-stone-800 rounded-md h-full p-4
             border border-stone-300 dark:border-stone-700 max-h-dvh z-50 space-y-4"
                onClick={e => e.stopPropagation()}>
                <div className="flex gap-2 w-full justify-between">
                    <button onClick={onClose}>
                        Close
                    </button>
                    <button onClick={() => {
                        updateData({ note, date, data, calendar });
                        setIsSaved(true);
                    }}>
                        {isSaved ? "Saved!" : "Save"}
                    </button>
                </div>
                <h1 className="text-base font-bold inter-500 w-full my-8 text-center">
                    {date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </h1>
                <textarea
                    className="w-full h-full bg-transparent border border-stone-300 dark:border-stone-700 rounded-md p-2 inter-500"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
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
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

    const hasNote = useMemo(() => {
        return data.find(item => isSameDay(item.date, selectedDate))?.note;
    }, [data, selectedDate]);

    const updateData = useCallback(({ color, note, date, calendar: localCalendar }) => {
        const calendarData = loadFromStorage(localCalendar.key);

        let newData;
        const formattedDate = date;

        if (color === 'clear') {
            newData = calendarData.filter(item => item.date.getTime() !== formattedDate.getTime());
        } else {
            const existingEntry = calendarData.find(item => isSameDay(item.date, formattedDate));
            if (existingEntry) {
                newData = calendarData.map(item =>
                    isSameDay(item.date, formattedDate)
                        ? { ...item, color: color || item.color, note: note || item.note }
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
                <div className="sm:mx-2 sm:w-[calc(100vw-1rem)] max-w-screen-xl mx-auto sm:px-8">
                    <div className="my-4">
                        <Header
                            calendar={calendar}
                            selectedDate={selectedDate}
                            daysSinceLastEntry={daysSinceLastEntry}
                            data={data}>
                            <Info size={16} weight="bold" onClick={() =>
                                setInfoStateIndex((index) => (index + 1) % InfoStates.length)
                            } />
                        </Header>
                    </div>

                    {/* <div className="flex gap-2">
                        <button onClick={() => setSelectedDate(new Date(2025, 0, 1))}>2025</button>
                        <button onClick={() => setSelectedDate(new Date(2024, 0, 1))}>2024</button>
                        <button onClick={() => setSelectedDate(new Date(2023, 0, 1))}>2023</button>
                        <button onClick={() => setSelectedDate(new Date(2022, 0, 1))}>2022</button>
                    </div> */}

                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="order-0 sm:order-1 overflow-x-scroll flex flex-nowrap gap-2 w-1/10">
                            <CalendarsStrip
                                data={data}
                                isVisible={view === "year"}
                                selectedCalendar={calendar}
                                onCalendarClick={onCalendarClick} />
                        </div>
                        <div className="max-w-full md:max-w-2/3">
                            <div className="h-96 overflow-y-auto sm:h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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

                            <div className="">
                                <h2 className="text-lg my-4">
                                    {selectedDate.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                                </h2>
                                <div className="flex w-full max-w-[500px] flex-wrap gap-2">
                                    {calendar.colors.map((color, index) => {
                                        const legendEntry = calendar.legend?.find(l => l.color === color);
                                        const label = legendEntry?.name || legendEntry?.label || color;
                                        const selectedColor = data.find(item => isSameDay(item.date, selectedDate))?.color || color;

                                        return (
                                            <button
                                                key={index}
                                                style={{ color: contrastColor({ bgColor: ColorHexMap[color] }) }}
                                                onClick={() => {
                                                    updateData({ color, date: selectedDate, data, calendar });
                                                }}
                                                className={classNames(`p-4 h-12 w-20 flex items-center 
                                                justify-center rounded-md ${TailwindColorsMap[color]}`, {
                                                    "border-4 border-stone-800 shadow-md": selectedColor === color
                                                })}>
                                                {label}
                                            </button>
                                        )
                                    })}
                                    <span
                                        onClick={() => setIsNoteModalOpen(true)}
                                        className="border-stone-300 dark:border-stone-700
                                 bg-stone-200 dark:bg-stone-800 rounded-full size-12 flex items-center justify-center p-2">
                                        <Note size={24} weight={hasNote ? "fill" : "regular"} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="order-3 w-full md:w-1/3 md:h-[calc(100vh-80px)] pb-10 md:overflow-y-scroll">
                            <CalendarDayView
                                data={data}
                                selectedDate={selectedDate} />
                        </div>
                    </div>
                    {/* <ColorWheel
                        date={selectedDate}
                        calendar={calendar}
                        onColorSelect={(color) => {
                            updateData({ color, date: selectedDate, data, calendar });
                        }} /> */}
                    <NoteModal
                        isOpen={isNoteModalOpen}
                        onClose={() => setIsNoteModalOpen(false)}
                        calendar={calendar}
                        updateData={updateData}
                        date={selectedDate} />

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
