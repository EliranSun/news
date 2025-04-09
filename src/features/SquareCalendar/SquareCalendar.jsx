import { addDays } from "date-fns";
import { useCallback, useState, useEffect, useMemo } from "react";
import { ColorButton } from "./ColorButton";
import { loadFromStorage, saveToStorage } from "./utils";
import { DateNavigationButton } from "./DateNavigationButton";
import { Calendars } from "./constants";
import { CalendarLegend } from "./CalendarLegend";
import { CalendarsList } from "./CalendarsList";
import { CalendarGamification } from "./CalendarGamification";
import { CalendarMonthColorInfo } from "./CalendarMonthColorInfo";
import { CalendarsStrip } from "./CalendarsStrip";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarYearSummary } from "./CalendarYearSummary";
export default function SquareCalendar() {
    const [isCalendarMenuOpen, setIsCalendarMenuOpen] = useState(false);

    const calendarKey = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('calendar');
    }, []);

    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState(loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key));

    const updateColor = useCallback((color) => {
        if (color === 'clear') {
            setData(data.filter(item => new Date(item.date).toDateString() !== new Date(selectedDate).toDateString()));
        } else {
            const existingEntry = data.find(item =>
                new Date(item.date).toDateString() === new Date(selectedDate).toDateString());

            if (existingEntry) {
                setData(data.map(item =>
                    new Date(item.date).toDateString() === new Date(selectedDate).toDateString()
                        ? { ...item, color }
                        : item
                ));
            } else {
                setData([...data, { date: selectedDate, color }]);
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
                calendarButton.scrollIntoView({ behavior: 'smooth' });
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
            {isCalendarMenuOpen && (
                <CalendarsList
                    onClose={() => setIsCalendarMenuOpen(false)}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setIsCalendarMenuOpen(false);
                    }} />
            )}
            <div className="p-4 overflow-x-hidden h-dvh user-select-none space-y-8 font-mono">
                <div className="flex w-full">
                    <button
                        className="h-fit mr-2"
                        onClick={() => setIsCalendarMenuOpen(!isCalendarMenuOpen)}>
                        ☰
                    </button>
                    <CalendarsStrip
                        selectedCalendar={calendar}
                        onCalendarClick={onCalendarClick} />
                </div>
                {/* <CalendarName
                    calendar={calendar}
                    daysSinceLastEntry={daysSinceLastEntry} /> */}
                <CalendarGamification calendar={calendar} />
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
                <div>
                    {/* {calendar.legend && 
                        <CalendarLegend
                            isActive
                            legend={calendar.legend} />}*/}

                    <div className="flex justify-between items-center w-full shadow px-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-2 max-w-[150px] my-2 border rounded-lg p-2">
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                            <DateNavigationButton direction="↑" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                            <DateNavigationButton direction="←" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-50"></div>
                            <DateNavigationButton direction="→" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                            <DateNavigationButton direction="↓" currentDate={selectedDate} onClick={setSelectedDate} />
                            <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 user-select-none rounded-lg p-2">
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
                <CalendarMonthColorInfo
                    selectedDate={selectedDate}
                    data={data} />
                <CalendarYearSummary />
            </div>
        </>
    );
}   