import { useCallback, useState, useEffect, useMemo } from "react";
import { loadFromStorage, saveToStorage, isSameDay } from "./utils";
import { Calendars } from "./constants";
import { CalendarsList } from "./organism/CalendarsList";
import { CalendarGamification } from "./molecules/CalendarGamification";
import { CalendarsStrip } from "./molecules/CalendarsStrip";
import { CalendarMonth } from "./organism/CalendarMonth";
import { CalendarName } from "./atoms/CalendarName";
import { differenceInDays } from "date-fns";
import { CalendarYearColorInfo } from "./molecules/CalendarYearColorInfo";
import { Navbar } from "./molecules/Navbar";
import PhysicsDemo from "./organism/PhysicsDemo";
import { Info } from "@phosphor-icons/react";
import { CalendarDayView } from "./organism/CalendarDayView";
import classNames from "classnames";
import { motion } from "framer-motion";
import { TextualDayView } from "./organism/TextualDayView";

const FlexibleOpacityTransition = ({ children }) => {
    return (
        <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames({
                "flex flex-wrap h-10/12": true,
                "justify-center": true,
            })}>
            {children}
        </motion.div>
    );
};

export default function SquareCalendars() {
    const calendarKey = useMemo(() => new URL(window.location.href).searchParams.get('calendar'), []);
    const [isPhysicsDemoOpen, setIsPhysicsDemoOpen] = useState(false);
    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const storageData = loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key);
    const [data, setData] = useState(storageData);
    // this works because timestamp is unique
    const [selectedDateNote, setSelectedDateNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");
    const [showMonthInfo, setShowMonthInfo] = useState(false);
    const [view, setView] = useState("month");
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // const dateTitle = useMemo(() => new Date(selectedDate).toLocaleDateString('en-US', {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // }), [selectedDate]);

    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

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
        // setSelectedDate(addDays(selectedDate, 1));
    }, [selectedDate, data, calendar, selectedDateNote]);

    // useEffect(() => {
    //     saveToStorage(calendar.key, data);
    // }, [calendar, data]);

    useEffect(() => {
        setTimeout(() => {
            const calendarButton = document.getElementById(calendar.key);
            if (calendarButton) {
                calendarButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }, 100);
    }, [calendar]);

    const onCalendarClick = useCallback((item) => {
        const url = new URL(window.location.href);
        url.searchParams.set('calendar', item.key);
        window.history.pushState({}, '', url);

        // saveToStorage(calendar.key, data);
        const newData = loadFromStorage(item.key);
        const note = newData.find(item => isSameDay(item.date, selectedDate))?.note || "";

        setCalendar(item);
        setData(newData);
        setSelectedDateNote(note);
    }, [selectedDate]);

    const yearMap = useMemo(() => new Array(12).fill(0), []);

    console.log({ data, selectedDateNote });

    return (
        <>
            {/* <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="fixed bottom-32 right-5  rounded-full p-4 bg-black text-white">
                <Palette size={24}
                    color="white" />
            </button> */}
            {isPhysicsDemoOpen && <PhysicsDemo />}
            <Navbar
                selectedItem={view}
                onItemClick={setView}
                onPhysicsClick={() => setIsPhysicsDemoOpen(!isPhysicsDemoOpen)}
                onListClick={() => setView("list")} />
            <div id="note-modal-portal" />
            {/* <DayDrawer
                title={dateTitle}
                calendar={calendar}
                isOpen={isDrawerOpen}
                onColorSelect={color => {
                    updateColor(color)
                }}
                onClose={() => setIsDrawerOpen(false)}
                note={selectedDateNote}
                onNoteUpdate={note => {
                    const newData = data.map(item =>
                        isSameDay(item.date, selectedDate)
                            ? { ...item, note }
                            : item);

                    setData(newData);
                    saveToStorage(calendar.key, newData);
                }}
            /> */}
            <div className="p-4 w-screen overflow-hidden h-dvh user-select-none space-y-4 font-mono">
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <CalendarName
                                calendar={calendar}
                                daysSinceLastEntry={daysSinceLastEntry} />
                            <span className="text-lg font-bold">
                                {selectedDate
                                    ? `${new Date(selectedDate).getFullYear()} ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'long' })}`
                                    : `${new Date().getFullYear()} ${new Date().getMonth()}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarGamification calendar={calendar} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                        <div className="flex items-center gap-2 justify-end">
                            <Info
                                size={24}
                                onClick={() => setShowMonthInfo(!showMonthInfo)}
                                weight={showMonthInfo ? "fill" : "regular"} />
                        </div>
                        <CalendarYearColorInfo data={data} selectedDate={selectedDate} />
                    </div>
                </div>
                {view !== "day" && <CalendarsStrip
                    data={data}
                    selectedCalendar={calendar}
                    onCalendarClick={onCalendarClick} />}
                {view === "day" &&
                    <FlexibleOpacityTransition>
                        <TextualDayView
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </FlexibleOpacityTransition>
                }
                {view === "note" &&
                    <FlexibleOpacityTransition>
                        <CalendarDayView data={data} selectedDate={selectedDate} />
                    </FlexibleOpacityTransition>
                }
                {view === "month" &&
                    <FlexibleOpacityTransition>
                        <CalendarMonth
                            showInfo={showMonthInfo}
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
                    </FlexibleOpacityTransition>
                }
                {view === "year" && (
                    <FlexibleOpacityTransition>
                        <div className="my-8 grid grid-cols-3 gap-2">
                            {yearMap.map((_, monthIndex) => {
                                return (
                                    <CalendarMonth
                                        key={monthIndex}
                                        isYearView={true}
                                        showInfo={showMonthInfo}
                                        selectedDate={selectedDate}
                                        setSelectedDate={setSelectedDate}
                                        data={data}
                                        monthIndex={monthIndex} />
                                )
                            })}
                        </div>
                    </FlexibleOpacityTransition>
                )}
                <CalendarsList
                    isOpen={view === "list"}
                    onClose={() => setView("year")}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setView("year");
                    }} />
            </div>
        </>
    );
}   