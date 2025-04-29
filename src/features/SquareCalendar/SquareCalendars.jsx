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
import { TextualDayView } from "./organism/TextualDayView";
import { FlexibleOpacityTransition } from "./atoms/FlexibleOpacityTransition";

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
    }, [selectedDate, data, calendar, selectedDateNote]);

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

        const newData = loadFromStorage(item.key);
        const note = newData.find(item => isSameDay(item.date, selectedDate))?.note || "";

        setCalendar(item);
        setData(newData);
        setSelectedDateNote(note);
    }, [selectedDate]);

    const yearMap = useMemo(() => new Array(12).fill(0), []);

    return (
        <>
            {isPhysicsDemoOpen && <PhysicsDemo />}
            <Navbar
                selectedItem={view}
                onItemClick={setView}
                onPhysicsClick={() => setIsPhysicsDemoOpen(!isPhysicsDemoOpen)}
                onListClick={() => setView("list")} />
            <div id="note-modal-portal" />
            <div className="p-4 w-screen overflow-hidden h-[calc(100vh-96px)] 
            user-select-none space-y-4 font-mono">
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
                {view !== "day" && view !== "list" &&
                    <CalendarsStrip
                        data={data}
                        selectedCalendar={calendar}
                        onCalendarClick={onCalendarClick} />}
                {view === "note" &&
                    <FlexibleOpacityTransition>
                        <CalendarDayView data={data} selectedDate={selectedDate} />
                    </FlexibleOpacityTransition>
                }
                <CalendarsList
                    isOpen={view === "list"}
                    onClose={() => setView("month")}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setView("month");
                    }} />
                {view === "day" &&
                    <FlexibleOpacityTransition>
                        <TextualDayView
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
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
                        <div className="grid grid-cols-3 gap-1">
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
            </div>
        </>
    );
}   