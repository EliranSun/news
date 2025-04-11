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

const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return new Date(date1).toDateString() === new Date(date2).toDateString();
};

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
                        {new Date(selectedDate)?.getFullYear()}
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
                <div className="">
                    <h1 className="text-base font-bold my-0 inter-500">Colors</h1>

                    <div className="flex flex-col w-full border shadow rounded-lg">
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
                        <div className={classNames({
                            "flex w-[66vw] overflow-x-auto gap-1 user-select-none": true,
                            "absolute bottom-5 right-5": true,
                            "hidden": !selectedDate
                            })}>
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
                        <textarea
                        value={selectedDateNote}
                        className="border w-full p-4 mb-32 h-40"
                        onChange={event => setSelectedDateNote(event.target.value)}
                        onBlur={() => {
                            setData(data.map(item =>
                                isSameDay(item.date, selectedDate)
                                    ? { ...item, note: selectedDateNote }
                                    : item));

                            saveToStorage(calendar.key, data);
                        }}
                    />
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