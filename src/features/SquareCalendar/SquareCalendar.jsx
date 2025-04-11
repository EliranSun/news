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


export default function SquareCalendar() {
    const [isCalendarMenuOpen, setIsCalendarMenuOpen] = useState(false);

    const calendarKey = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('calendar');
    }, []);

    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState(loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key));
    const [selectedDateNote, setSelectedDayNote] = useState(Calendars[calendarKey]?.note || "");
    
    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

    const updateColor = useCallback((color) => {
        if (color === 'clear') {
            setData(data.filter(item => new Date(item.date).toDateString() !== new Date(selectedDate).toDateString()));
        } else {
            const existingEntry = data.find(item =>
                new Date(item.date).toDateString() === new Date(selectedDate).toDateString());

            if (existingEntry) {
                setData(data.map(item =>
                    new Date(item.date).toDateString() === new Date(selectedDate).toDateString()
                        ? { ...item, color, note: selectedDateNote }
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
                calendarButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
                        {new Date(selectedDate).getFullYear()}
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

                    <div className="flex justify-between items-center w-full">
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
                        <div className="flex w-screen overflow-x-auto gap-1 user-select-none">
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
                    </div>
                </div>
                <textarea onChange={event => setSelectedDateNote(event.target.value)} />
                {/* <CalendarMonthColorInfo
                    selectedDate={selectedDate}
                    data={data} />
                <CalendarYearSummary /> */}
            </div>
        </>
    );
}   