import { useCallback, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage, isSameDay } from "./utils";
import { Calendars } from "./constants";
import { Navbar } from "./molecules/Navbar";
import PhysicsDemo from "./organism/PhysicsDemo";
import { FlexibleOpacityTransition } from "./atoms/FlexibleOpacityTransition";
import { Body } from "./organism/Body";
import { PointerProvider } from "./PointerContext";
import NotesByDayView from "./NotesByDayView";

export default function SquareCalendars() {
    const [isPhysicsDemoOpen, setIsPhysicsDemoOpen] = useState(false);
    const [calendar, setCalendar] = useState(Calendars.Sleep);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // this works because timestamp is unique
    const [selectedDateNote, setSelectedDateNote] = useState("");
    const [view, setView] = useState("notes");

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

    const onCalendarClick = useCallback(async (item) => {
        const url = new URL(window.location.href);
        url.searchParams.set('calendar', item.key);
        window.history.pushState({}, '', url);

        try {
            const newData = await loadFromStorage(item.key);
            const note = newData.find(item => isSameDay(item.date, selectedDate))?.note || "";

            setCalendar(item);
            setData(newData);
            setSelectedDateNote(note);
        } catch (error) {
            console.error('Error loading calendar data:', error);
        }
    }, [selectedDate]);

    if (isLoading) {
        return (
            <div className="pb-40 sm:pb-0 h-screen w-screen user-select-none font-mono bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (view === "notes") {
        return (
            <>
                <button onClick={() => setView("year")}>Back</button>
                <NotesByDayView />
            </>
        );
    }

    return (
        <PointerProvider>
            <button onClick={() => setView("notes")}>Notes</button>
            <div className="pb-40 sm:pb-0 h-screen w-screen user-select-none font-mono bg-stone-50 dark:bg-stone-900">
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
                        onCalendarViewClick={async (newCalendar, newDate) => {
                            setCalendar(newCalendar);
                            try {
                                const newData = await loadFromStorage(newCalendar.key);
                                setData(newData);
                            } catch (error) {
                                console.error('Error loading calendar data:', error);
                                setData([]);
                            }
                            setSelectedDate(newDate);
                            setView("year");
                        }}
                        onNoteViewClick={async (newCalendar, newDate) => {
                            setCalendar(newCalendar);
                            try {
                                const newData = await loadFromStorage(newCalendar.key);
                                setData(newData);
                            } catch (error) {
                                console.error('Error loading calendar data:', error);
                                setData([]);
                            }
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