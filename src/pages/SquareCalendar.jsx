import classNames from "classnames";
import { getDaysInMonth, subMonths, startOfMonth, getDay, addDays, subDays } from "date-fns";
import { useCallback, useState, useEffect } from "react";

const saveToStorage = (data) => {
    localStorage.setItem('square-calendar', JSON.stringify(data));
};

const loadFromStorage = () => {
    try {
        const data = localStorage.getItem('square-calendar');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading data from storage:', error);
        return [];
    }
};

const ColorButton = ({ color, onClick }) => {
    return (
        <button className="flex justify-center items-center bg-gray-200 rounded-md p-2" onClick={onClick}>{color}</button>
    )
}

const DateNavigationButton = ({ direction, currentDate, onClick }) => {
    return (
        <button
            className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md p-2"
            onClick={() => {
                let newDate = currentDate;
                switch (direction) {
                    case '⬆️':
                        newDate = subDays(currentDate, 7);
                        break;
                    case '⬇️':
                        newDate = addDays(currentDate, 7);
                        break;
                    case '⬅️':
                        newDate = subDays(currentDate, 1);
                        break;
                    case '➡️':
                        newDate = addDays(currentDate, 1);
                        break;
                }

                onClick(newDate);
            }}>
            {direction}
        </button>
    )
}

export default function SquareCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState(loadFromStorage());

    const updateColor = useCallback((color) => {
        if (color === 'clear') {
            setData(data.filter(item => new Date(item.date).toDateString() !== new Date(selectedDate).toDateString()));
            return;
        } else {
            const existingEntry = data.find(item => new Date(item.date).toDateString() === new Date(selectedDate).toDateString());
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
    }, [selectedDate, data]);

    useEffect(() => {
        setSelectedDate(addDays(selectedDate, 1));
        saveToStorage(data);
    }, [data]);

    const isDayMatchingColor = useCallback((dateObject, color) => {
        if (!data || data.length === 0) return false;

        try {
            const found = data.find(item => {
                return new Date(item.date).toDateString() === new Date(dateObject.date).toDateString();
            });

            if (!found) return false;

            return found.color === color;
        } catch (error) {
            console.error('Error finding day:', error);
            return false;
        }
    }, [data]);

    return (
        <div className="p-4 h-dvh space-y-8">
            <h1 className="text-lg font-bold">🟨 CSS</h1>
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
                            <div className="grid grid-cols-7 p-1.5">
                                {allDays.map((dayObj, dayIndex) => {
                                    const isMatchingNegative = !dayObj.isPadding && isDayMatchingColor(dayObj, 'black');
                                    const isMatchingPositive = !dayObj.isPadding && isDayMatchingColor(dayObj, 'yellow');
                                    const isToday = dayObj.date.toDateString() === selectedDate.toDateString();

                                    return (
                                        <div
                                            key={`month-${monthIndex}-day-${dayIndex}`}
                                            onClick={() => setSelectedDate(dayObj.date)}
                                            className={classNames({
                                                "size-4": true,
                                                "border border-black/70": !dayObj.isPadding && !isToday,
                                                "opacity-0": dayObj.isPadding,
                                                "bg-gray-300": !isMatchingNegative && !isMatchingPositive,
                                                "border-2 border-amber-500": !dayObj.isPadding && isToday,
                                                "bg-gray-500": isMatchingNegative,
                                                "bg-yellow-500": isMatchingPositive
                                            })}
                                        >
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-3 gap-2 w-full max-w-[150px] mx-auto my-2 user-select-none">
                <ColorButton color="⬛️" onClick={() => updateColor('black')} />
                <DateNavigationButton direction="⬆️" currentDate={selectedDate} onClick={setSelectedDate} />
                <ColorButton color="🟨" onClick={() => updateColor('yellow')} />
                <DateNavigationButton direction="⬅️" currentDate={selectedDate} onClick={setSelectedDate} />
                <div className="flex justify-center items-center bg-gray-100 rounded-md p-2 opacity-50"></div>
                <DateNavigationButton direction="➡️" currentDate={selectedDate} onClick={setSelectedDate} />
                <ColorButton color="⬜️" onClick={() => updateColor('clear')} />
                <DateNavigationButton direction="⬇️" currentDate={selectedDate} onClick={setSelectedDate} />
                <div></div>
            </div>
        </div>
    );
}   