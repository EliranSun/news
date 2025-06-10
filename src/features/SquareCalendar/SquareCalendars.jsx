import { useCallback, useState, useEffect, useMemo } from "react";
import { loadFromStorage, saveToStorage, isSameDay } from "./utils";
import { Calendars } from "./constants";
import { Navbar } from "./molecules/Navbar";
import PhysicsDemo from "./organism/PhysicsDemo";
import { FlexibleOpacityTransition } from "./atoms/FlexibleOpacityTransition";
import { Body } from "./organism/Body";
import { PointerProvider } from "./PointerContext";

export default function SquareCalendars() {
    const [isPhysicsDemoOpen, setIsPhysicsDemoOpen] = useState(false);
    const [calendar, setCalendar] = useState(Calendars.Sleep);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const storageData = loadFromStorage(Calendars.Sleep.key);
    const [data, setData] = useState(storageData);
    // this works because timestamp is unique
    const [selectedDateNote, setSelectedDateNote] = useState(data.find(item =>
        isSameDay(item.date, selectedDate))?.note || "");
    const [view, setView] = useState("year");

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
        <PointerProvider>
            <div className="p-2 overflow-y-auto w-screen h-dvh pb-40 md:pb-0
             user-select-none font-mono bg-stone-50 dark:bg-stone-900">
                <FlexibleOpacityTransition>
                    <Body
                        view={view}
                        data={data}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setView={setView}
                        onCalendarClick={onCalendarClick}
                        setSelectedDateNote={setSelectedDateNote}
                        setData={setData}
                        saveToStorage={saveToStorage}
                        calendar={calendar}
                        selectedDateNote={selectedDateNote}
                        yearMap={yearMap}
                        onCalendarViewClick={(newCalendar, newDate) => {
                            setCalendar(newCalendar);
                            setData(loadFromStorage(newCalendar.key));
                            setSelectedDate(newDate);
                            setView("year");
                        }}
                        onNoteViewClick={(newCalendar, newDate) => {
                            setCalendar(newCalendar);
                            setData(loadFromStorage(newCalendar.key));
                            setSelectedDate(newDate);
                            setView("note");
                        }}
                    />
                </FlexibleOpacityTransition>
            </div>
            <div id="day-popover-portal" className="" />
            {isPhysicsDemoOpen && <PhysicsDemo />}
            <Navbar
                selectedItem={view}
                onItemClick={setView}
                onPhysicsClick={() => setIsPhysicsDemoOpen(!isPhysicsDemoOpen)}
                onListClick={() => setView("list")} />
            {/* <div id="note-modal-portal" /> */}
        </PointerProvider>
    );
}   