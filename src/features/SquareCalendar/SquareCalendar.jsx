import classNames from "classnames";
import { getDaysInMonth, subMonths, startOfMonth, getDay, addDays } from "date-fns";
import { useCallback, useState, useEffect, useMemo } from "react";
import { CalendarButton } from "./CalendarButton";
import { ColorButton } from "./ColorButton";
import { loadFromStorage, saveToStorage, getColorsClassList, exportCalendarData, importCalendarData } from "./utils";
import { DateNavigationButton } from "./DateNavigationButton";
import { Calendars } from "./constants";
import { CalendarLegend } from "./CalendarLegend";
import { CalendarsList } from "./CalendarsList";
import PropTypes from "prop-types";
import { CalendarGamification } from "./CalendarGamification";

const DaySquare = ({ dayObj, selectedDate, setSelectedDate, data, monthIndex, dayIndex }) => {
    const isToday = dayObj.date.toDateString() === selectedDate.toDateString();
    const colorClass = useMemo(() => {
        const color = data.find(item => new Date(item.date).toDateString() === dayObj.date.toDateString())?.color;
        return color && getColorsClassList(color);
    }, [data, dayObj.date]);

    return (
        <div
            key={`month-${monthIndex}-day-${dayIndex}`}
            onClick={() => setSelectedDate(dayObj.date)}
            className={classNames(colorClass, {
                "size-4 text-[8px] flex justify-center items-center": true,
                "bg-gray-100 dark:bg-gray-900": !dayObj.previousMonth && !isToday && !colorClass,
                "opacity-0": dayObj.previousMonth,
                "border-2 border-amber-500": !dayObj.previousMonth && isToday,
            })}
        >
            {(!dayObj.previousMonth && isToday)
                ? dayObj.date.toLocaleString('default', { day: 'numeric' }) : null}
        </div>
    );
}

DaySquare.propTypes = {
    dayObj: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
    dayIndex: PropTypes.number.isRequired,
};

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

        setSelectedDate(addDays(selectedDate, 1));
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
                <CalendarsList onClick={(...params) => {
                    onCalendarClick(...params);
                    setIsCalendarMenuOpen(false);
                }} />
            )}
            <div className="p-4 overflow-x-hidden h-dvh user-select-none space-y-12 font-mono">
                <div className="flex w-full">
                    <button
                        className="h-fit mr-2"
                        onClick={() => {
                            setIsCalendarMenuOpen(!isCalendarMenuOpen);
                        }}>
                        🗓️
                    </button>
                    <h1 className="text-base font-bold flex flex-nowrap w-[calc(99vw-99px)] overflow-x-auto gap-4">
                        {Object.values(Calendars)
                            .map((item) =>
                                <div key={item.key} className="h-fit" id={item.key}>
                                    <CalendarButton
                                        isSelected={calendar.key === item.key}
                                        onClick={() => onCalendarClick(item)}>
                                        {item.icon} {item.name.slice(0, 1)}
                                    </CalendarButton>
                                </div>
                            )}
                    </h1>
                </div>
                <CalendarGamification calendar={calendar} />
                <div className="flex justify-center flex-wrap h-10/12">
                    {new Array(12).fill(0).map((_, monthIndex) => {
                        const month = new Date(selectedDate.getFullYear(), monthIndex, 1);
                        const daysInMonth = getDaysInMonth(month);
                        const startDay = getDay(startOfMonth(month)); // 0 = Sunday, 1 = Monday, etc.
                        const prevMonth = subMonths(month, 1);
                        const daysInPrevMonth = getDaysInMonth(prevMonth);

                        // Create array for previous month's padding days
                        const previousMonthDays = Array.from({ length: startDay }, (_, i) => ({
                            date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - startDay + i + 1),
                            previousMonth: true
                        }));

                        // Create array for current month's days
                        const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
                            date: new Date(month.getFullYear(), month.getMonth(), i + 1),
                            previousMonth: false
                        }));

                        const allDays = [...previousMonthDays, ...currentMonthDays];

                        return (
                            <div className="flex flex-col" key={`month-${monthIndex}`}>
                                <h2 className="text-xs">{month.toLocaleString('default', { month: 'short' })}</h2>
                                <div className="grid grid-cols-7 p-1 gap-0.5">
                                    {allDays.map((dayObj, dayIndex) => {
                                        return <DaySquare
                                            monthIndex={monthIndex}
                                            dayIndex={dayIndex}
                                            selectedDate={selectedDate}
                                            setSelectedDate={setSelectedDate}
                                            data={data}
                                            key={`month-${monthIndex}-day-${dayIndex}`}
                                            dayObj={dayObj} />
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between items-center w-full border-2 shadow px-4 rounded-lg">
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
                    <div className="grid grid-cols-3 gap-2 border user-select-none rounded-lg p-2">
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
                <CalendarLegend
                    isActive={calendar.key === Calendars.Friends.key}
                    legend={Calendars.Friends.legend} />
                <CalendarLegend
                    isActive={calendar.key === Calendars.Weight.key}
                    legend={Calendars.Weight.legend} />
                <div className="flex gap-2 w-1/3">
                    <button onClick={exportCalendarData}>
                        EXPORT
                    </button>
                    <button onClick={importCalendarData}>
                        IMPORT
                    </button>
                </div>
            </div>
        </>
    );
}   