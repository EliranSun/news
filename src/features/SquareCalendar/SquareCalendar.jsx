import classNames from "classnames";
import { getDaysInMonth, subMonths, startOfMonth, getDay, addDays } from "date-fns";
import { useCallback, useState, useEffect, useMemo } from "react";
import { CalendarButton } from "./CalendarButton";
import { ColorButton } from "./ColorButton";
import { loadFromStorage, saveToStorage, getColorsClassList } from "./utils";
import { DateNavigationButton } from "./DateNavigationButton";
import { Calendars } from "./constants";
import { FriendsLegend } from "./FriendsLegend";
import { CalendarsList } from "./CalendarsList";


export default function SquareCalendar() {
    const [isCalendarMenuOpen, setIsCalendarMenuOpen] = useState(false);

    const calendarKey = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('calendar');
    }, []);

    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Css);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState(loadFromStorage(Calendars[calendarKey]?.key || Calendars.Css.key));

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

        setSelectedDate(addDays(selectedDate, 1));
    }, [selectedDate, data]);

    useEffect(() => {
        saveToStorage(calendar.key, data);

        setTimeout(() => {
            const calendarButton = document.getElementById(calendar.key);
            if (calendarButton) {
                calendarButton.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }, [data, calendar]);

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
                <CalendarsList onClick={(...params) => {
                    onCalendarClick(...params);
                    setIsCalendarMenuOpen(false);
                }} />
            )}
            <div className="p-4 h-dvh user-select-none space-y-12 font-mono">
                <div className="flex">
                    <button
                        className="h-fit mr-2"
                        onClick={() => {
                            setIsCalendarMenuOpen(!isCalendarMenuOpen);
                        }}>
                        🗓️
                    </button>
                    <h1 className="text-base font-bold flex flex-nowrap w-[75vw] overflow-x-auto gap-4">
                        {Object.values(Calendars)
                            .map((item) =>
                                <div key={item.key} className="h-fit" id={item.key}>
                                    <CalendarButton
                                        isSelected={calendar.key === item.key}
                                        onClick={() => onCalendarClick(item)}>
                                        {item.icon}
                                    </CalendarButton>
                                </div>
                            )}
                    </h1>
                </div>
                <div className="flex justify-center flex-wrap h-10/12">
                    {new Array(12).fill(0).map((_, monthIndex) => {
                        const month = new Date(selectedDate.getFullYear(), monthIndex, 1);
                        const daysInMonth = getDaysInMonth(month);
                        const startDay = getDay(startOfMonth(month)); // 0 = Sunday, 1 = Monday, etc.
                        const prevMonth = subMonths(month, 1);
                        const daysInPrevMonth = getDaysInMonth(prevMonth);

                        // Create array for previous month's padding days
                        const paddingDays = Array.from({ length: startDay }, (_, i) => ({
                            date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - startDay + i + 1),
                            isPadding: true
                        }));

                        // Create array for current month's days
                        const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
                            date: new Date(month.getFullYear(), month.getMonth(), i + 1),
                            isPadding: false
                        }));

                        const allDays = [...paddingDays, ...currentMonthDays];

                        return (
                            <div className="flex flex-col" key={`month-${monthIndex}`}>
                                <h2 className="text-xs">{month.toLocaleString('default', { month: 'short' })}</h2>
                                <div className="grid grid-cols-7 p-1 gap-0.5">
                                    {allDays.map((dayObj, dayIndex) => {
                                        const isToday = dayObj.date.toDateString() === selectedDate.toDateString();
                                        const color = data.find(item => new Date(item.date).toDateString() === dayObj.date.toDateString())?.color;

                                        return (
                                            <div
                                                key={`month-${monthIndex}-day-${dayIndex}`}
                                                onClick={() => setSelectedDate(dayObj.date)}
                                                className={classNames({
                                                    "size-4 text-[8px] flex justify-center items-center": true,
                                                    "bg-gray-100 dark:bg-gray-900": !dayObj.isPadding && !isToday,
                                                    "opacity-0": dayObj.isPadding,
                                                    "border-2 border-amber-500": !dayObj.isPadding && isToday,
                                                    ...getColorsClassList(color)
                                                })}
                                            >
                                                {(!dayObj.isPadding && isToday)
                                                    ? dayObj.date.toLocaleString('default', { day: 'numeric' }) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between items-center w-full border-2 shadow px-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-2 max-w-[150px] my-2 border rounded-lg p-2">
                        <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                        <DateNavigationButton direction="⬆️" currentDate={selectedDate} onClick={setSelectedDate} />
                        <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                        <DateNavigationButton direction="⬅️" currentDate={selectedDate} onClick={setSelectedDate} />
                        <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-50"></div>
                        <DateNavigationButton direction="➡️" currentDate={selectedDate} onClick={setSelectedDate} />
                        <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                        <DateNavigationButton direction="⬇️" currentDate={selectedDate} onClick={setSelectedDate} />
                        <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-0"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-2">
                        {
                            calendar.colors.map(color =>
                                <ColorButton
                                    key={color}
                                    color={color}
                                    onClick={() => updateColor(color)}
                                />
                            )
                        }
                        <ColorButton color="⬜️" onClick={() => updateColor('clear')} />
                    </div>
                </div>
                <FriendsLegend isActive={calendar.key === Calendars.Friends.key} />
            </div>
        </>
    );
}   