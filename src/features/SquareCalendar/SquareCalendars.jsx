import { useCallback, useState, useEffect, useMemo } from "react";
import { loadFromStorage, saveToStorage, isSameDay } from "./utils";
import { Calendars } from "./constants";
import { CalendarsStrip } from "./molecules/CalendarsStrip";
import { differenceInDays } from "date-fns";
import { Navbar } from "./molecules/Navbar";
import PhysicsDemo from "./organism/PhysicsDemo";
import { FlexibleOpacityTransition } from "./atoms/FlexibleOpacityTransition";
import { Header } from "./molecules/Header";
import { Body } from "./organism/Body";

export default function SquareCalendars() {
    const calendarKey = useMemo(() => new URL(window.location.href).searchParams.get('calendar'), []);
    const [isPhysicsDemoOpen, setIsPhysicsDemoOpen] = useState(false);
    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const storageData = loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key);
    const [data, setData] = useState(storageData);
    // this works because timestamp is unique
    const [selectedDateNote, setSelectedDateNote] = useState(data.find(item =>
        isSameDay(item.date, selectedDate))?.note || "");
    const [view, setView] = useState("feed");

    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

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
                {view !== "hour" && view !== "feed" &&
                    <Header
                        calendar={calendar}
                        selectedDate={selectedDate}
                        daysSinceLastEntry={daysSinceLastEntry}
                        data={data} />}
                {view !== "day" && view !== "list" && view !== "hour" && view !== "feed" &&
                    <CalendarsStrip
                        data={data}
                        selectedCalendar={calendar}
                        onCalendarClick={onCalendarClick} />}
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
                        }}
                    />
                </FlexibleOpacityTransition>
            </div>
        </>
    );
}   