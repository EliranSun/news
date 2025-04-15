import { useCallback, useState, useEffect, useMemo } from "react";
import { loadFromStorage, saveToStorage } from "./utils";
import { Calendars } from "./constants";
import { CalendarsList } from "./organism/CalendarsList";
import { CalendarGamification } from "./molecules/CalendarGamification";
import { CalendarsStrip } from "./molecules/CalendarsStrip";
import { CalendarMonth } from "./organism/CalendarMonth";
import { CalendarName } from "./atoms/CalendarName";
import { differenceInDays } from "date-fns";
import { CalendarYearColorInfo } from "./molecules/CalendarYearColorInfo";
import { isSameDay } from "./utils";
import { DayDrawer } from "./molecules/DayDrawer";
import { Navbar } from "./molecules/Navbar";
import PhysicsDemo from "./organism/PhysicsDemo";
import { Info } from "@phosphor-icons/react";
// import { ColorButton } from "./atoms/ColorButton";
// import { DateNavigationButton } from "./atoms/DateNavigationButton";
// import { CalendarMonthColorInfo } from "./molecules/CalendarMonthColorInfo";
// import { CalendarYearSummary } from "./organism/CalendarYearSummary";
import { CalendarDayView } from "./organism/CalendarDayView";
import classNames from "classnames";

export default function SquareCalendars() {
    const [isPhysicsDemoOpen, setIsPhysicsDemoOpen] = useState(false);
    const calendarKey = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('calendar');
    }, []);

    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState();
    const storageData = loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key);
    const [data, setData] = useState(storageData);
    const [selectedDateNote, setSelectedDateNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");
    const [showMonthInfo, setShowMonthInfo] = useState(false);
    const [view, setView] = useState("year");
    const dateTitle = useMemo(() => {
        return new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, [selectedDate]);

    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

    const updateColor = useCallback((color) => {
        if (color === 'clear') {
            setData(data.filter(item => !isSameDay(item.date, selectedDate)));
        } else {
            const existingEntry = data.find(item =>
                isSameDay(item.date, selectedDate));

            if (existingEntry) {
                setData(data.map(item =>
                    isSameDay(item.date, selectedDate)
                        ? { ...item, color }
                        : item
                ));
            } else {
                setData([...data, { date: selectedDate, color, note: selectedDateNote }]);
            }
        }

        // setSelectedDate(addDays(selectedDate, 1));
    }, [selectedDate, data]);

    useEffect(() => {
        saveToStorage(calendar.key, data);
    }, [calendar, data]);

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

        saveToStorage(calendar.key, data);
        setCalendar(item);
        setData(loadFromStorage(item.key));
    }, [data, calendar]);

    useEffect(() => {
        const dayItem = data.find(item => isSameDay(item.date, selectedDate));
        setSelectedDateNote(dayItem?.note || "");
    }, [selectedDate, data]);

    const yearMap = useMemo(() => new Array(12).fill(0), []);

    {/* 
                <CalendarYearSummary /> */}
    return (
        <>
            {isPhysicsDemoOpen && <PhysicsDemo />}
            <Navbar
                selectedItem={view}
                onItemClick={setView}
                onPhysicsClick={() => setIsPhysicsDemoOpen(!isPhysicsDemoOpen)}
                onListClick={() => setView("list")} />
            <div id="note-modal-portal" />
            <DayDrawer
                title={dateTitle}
                calendar={calendar}
                isOpen={!!selectedDate}
                onColorSelect={updateColor}
                onClose={() => setSelectedDate()}
                note={selectedDateNote}
                onNoteUpdate={note => {
                    const newData = data.map(item =>
                        isSameDay(item.date, selectedDate)
                            ? { ...item, note }
                            : item);

                    setData(newData);
                    saveToStorage(calendar.key, newData);
                }}
            />
            <div className="p-4 w-screen overflow-hidden h-dvh user-select-none space-y-4 font-mono">
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <CalendarName
                                calendar={calendar}
                                daysSinceLastEntry={daysSinceLastEntry} />
                            <span className="text-lg font-bold">
                                {selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear()}
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
                <CalendarsStrip
                    data={data}
                    selectedCalendar={calendar}
                    onCalendarClick={onCalendarClick} />
                <div className={classNames({
                    "flex flex-wrap h-10/12": true,
                    "justify-center": true,
                })}>
                    {view === "day" && <CalendarDayView data={data} selectedDate={selectedDate} />}
                    {view === "month" && <>
                        <CalendarMonth
                            showInfo={showMonthInfo}
                            selectedDate={selectedDate}
                            size="big"
                            setSelectedDate={setSelectedDate}
                            monthIndex={new Date().getMonth()}
                            data={data} />
                        <span className="text-xs mt-4">
                            TODO: a combined view of all calendars? <br />
                            OR: Compared to last April...
                            Compared to previous month...
                            Compared to next month...
                        </span>
                    </>}
                    {view === "year" && yearMap.map((_, monthIndex) => {
                        return (
                            <CalendarMonth
                                key={monthIndex}
                                showInfo={showMonthInfo}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                data={data}
                                monthIndex={monthIndex} />
                        )
                    })}

                    <CalendarsList
                        isOpen={view === "list"}
                        onClose={() => setView("year")}
                        onClick={(...params) => {
                            onCalendarClick(...params);
                            setView("year");
                        }} />
                </div>
            </div>
        </>
    );
}   