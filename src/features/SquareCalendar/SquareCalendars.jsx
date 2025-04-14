import { useCallback, useState, useEffect, useMemo } from "react";
import { ColorButton } from "./atoms/ColorButton";
import { loadFromStorage, saveToStorage } from "./utils";
import { DateNavigationButton } from "./atoms/DateNavigationButton";
import { Calendars } from "./constants";
import { CalendarsList } from "./organism/CalendarsList";
import { CalendarGamification } from "./molecules/CalendarGamification";
import { CalendarMonthColorInfo } from "./molecules/CalendarMonthColorInfo";
import { CalendarsStrip } from "./molecules/CalendarsStrip";
import { CalendarMonth } from "./organism/CalendarMonth";
import { CalendarYearSummary } from "./organism/CalendarYearSummary";
import { CalendarName } from "./atoms/CalendarName";
import { upperFirst } from "lodash";
import { differenceInDays } from "date-fns";
import { CalendarYearColorInfo } from "./molecules/CalendarYearColorInfo";
import { ExportImport } from "./atoms/ExportImport";
import classNames from "classnames";
import { isSameDay } from "./utils";
import { DayDrawer } from "./molecules/DayDrawer";
import { Export, Import } from "@phosphor-icons/react";
const Navbar = () => {
    return (
        <div className="fixed h-24 bg-gray-200 bottom-0 w-screen grid grid-cols-5">
            <Export />
            <Export />
        <Export />
                    <Export />
                                <Export />
        </div>
        );
};

export default function SquareCalendars() {
    const [isCalendarMenuOpen, setIsCalendarMenuOpen] = useState(false);
    const calendarKey = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('calendar');
    }, []);

    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState();
    const storageData = loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key);
    const [data, setData] = useState(storageData);
    const [selectedDateNote, setSelectedDateNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");

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

    {/* <CalendarMonthColorInfo
                    selectedDate={selectedDate}
                    data={data} />
                <CalendarYearSummary /> */}
    return (
        <>
            <Navbar />
            <div id="note-modal-portal" />
            {isCalendarMenuOpen && (
                <CalendarsList
                    onClose={() => setIsCalendarMenuOpen(false)}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setIsCalendarMenuOpen(false);
                    }} />
            )}
            <div className="p-4 pb-32 w-screen overflow-x-hidden h-dvh user-select-none space-y-8 font-mono">
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col">
                        <CalendarName
                            calendar={calendar}
                            daysSinceLastEntry={daysSinceLastEntry} />
                        {selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear()}
                    </div>
                    <div className="flex flex-col gap-2">
                        <CalendarGamification calendar={calendar} />
                        <CalendarYearColorInfo data={data} selectedDate={selectedDate} />
                    </div>
                </div>
                <CalendarsStrip
                    data={data}
                    selectedCalendar={calendar}
                    onCalendarClick={onCalendarClick} />
                <div className="flex justify-center flex-wrap h-10/12">
                    {new Array(12).fill(0).map((_, monthIndex) => {
                        return (
                            <CalendarMonth
                                key={monthIndex}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                data={data}
                                monthIndex={monthIndex} />
                        )
                    })}
                </div>
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
                <div className="flex items-center gap-4">
                <ExportImport />
                <button
                        className="h-fit mr-2"
                        onClick={() => setIsCalendarMenuOpen(!isCalendarMenuOpen)}>
                        List
                    </button>
                    </div>
            </div>
        </>
    );
}   