import { useCallback, useState, useEffect, useMemo } from "react";
import { ColorButton } from "./ColorButton";
import { loadFromStorage, saveToStorage } from "./utils";
import { DateNavigationButton } from "./DateNavigationButton";
import { Calendars } from "./constants";
import { CalendarsList } from "./CalendarsList";
import { CalendarGamification } from "./CalendarGamification";
import { CalendarMonthColorInfo } from "./CalendarMonthColorInfo";
import { CalendarsStrip } from "./CalendarsStrip";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarYearSummary } from "./CalendarYearSummary";
import { CalendarName } from "./CalendarName";
import { upperFirst } from "lodash";
import { differenceInDays } from "date-fns";
import { CalendarYearColorInfo } from "./CalendarYearColorInfo";
import { ExportImport } from "./ExportImport";
import classNames from "classnames";
import { Note, X } from "@phosphor-icons/react";

const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return new Date(date1).toDateString() === new Date(date2).toDateString();
};


{/* <div className="grid grid-cols-3 gap-2 max-w-[150px] my-2 border rounded-lg p-2">
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                            <DateNavigationButton direction="↑" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                            <DateNavigationButton direction="←" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-50"></div>
                            <DateNavigationButton direction="→" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                            <DateNavigationButton direction="↓" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                        </div> */}

export default function SquareCalendar() {
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
    const [isNoteOpen, setIsNoteOpen] = useState(false);

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

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            {isNoteOpen &&
                <div className="fixed inset-0 z-20 m-auto backdrop-blur w-screen h-screen">
                    <h1 className="text-base font-bold inter-500 w-full my-8 text-center">{dateTitle}</h1>
                    <textarea
                        value={selectedDateNote}
                        placeholder="Note"
                        className={classNames({
                            "m-4 p-4 rounded-lg font-mono": true,
                            "border w-[calc(100%-2rem)] h-[calc(100%-10rem)] min-h-10": true,
                        })}
                        onChange={event => setSelectedDateNote(event.target.value)}
                        onBlur={() => {
                            setData(data.map(item =>
                                isSameDay(item.date, selectedDate)
                                    ? { ...item, note: selectedDateNote }
                                    : item));

                            saveToStorage(calendar.key, data);
                        }}
                    />
                    <X
                        size={20}
                        color="black"
                        weight="bold"
                        className="absolute top-10 right-5"
                        onClick={() => setIsNoteOpen(false)} />
                </div>}
            {/* {isCalendarMenuOpen && (
                <CalendarsList
                    onClose={() => setIsCalendarMenuOpen(false)}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setIsCalendarMenuOpen(false);
                    }} />
            )} */}
            <div className="p-4 w-screen overflow-x-hidden h-dvh user-select-none space-y-8 font-mono">
                {/* <div className="flex w-full">
                    <button
                        className="h-fit mr-2"
                        onClick={() => setIsCalendarMenuOpen(!isCalendarMenuOpen)}>
                        ☰
                    </button>

                </div> */}
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
                <div className={classNames({
                    "flex flex-col w-screen h-[21vh] gap-4 user-select-none": true,
                    "absolute inset-x-0 m-auto bg-gray-100 dark:bg-neutral-800": true,
                    "rounded-t-2xl p-4 shadow-lg": true,
                    "bottom-0": true,
                    "hidden": !selectedDate
                })}>
                    <X
                        size={20}
                        color="black"
                        weight="bold"
                        className="absolute top-4 right-4"
                        onClick={() => setSelectedDate()} />
                    <h1 className="text-base font-bold inter-500 w-full text-center">
                        {dateTitle}
                    </h1>
                    <div className="flex justify-between w-full">
                        <div className="flex w-full overflow-x-auto gap-0.5">
                            {
                                calendar.colors.map(color =>
                                    <ColorButton
                                        key={color}
                                        color={color}
                                        legend={calendar.legend?.find(item => item.color === color)}
                                        onClick={() => updateColor(color)}
                                    />
                                )
                            }
                            <ColorButton color="⬜️" onClick={() => updateColor('clear')} />
                        </div>
                        <Note
                            size={32}
                            onClick={() => {
                                setIsNoteOpen(true)
                            }} />
                    </div>
                </div>
                <div>

                </div>
                {/* <CalendarMonthColorInfo
                    selectedDate={selectedDate}
                    data={data} />
                <CalendarYearSummary /> */}
                <ExportImport />
            </div>
        </>
    );
}   