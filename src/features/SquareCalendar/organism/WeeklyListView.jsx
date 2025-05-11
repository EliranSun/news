import { Calendars, Categories } from "../constants";
import { useState, useEffect } from "react";
import { DateStrip } from "../molecules/DateStrip";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { getColorsClassList, loadFromStorage } from "../utils";

export const WeeklyListView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);
    const [calendarData, setCalendarData] = useState({});

    // Calculate week days when selected date changes
    useEffect(() => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 0 });
        const days = eachDayOfInterval({ start, end });
        setWeekDays(days);

        // Load data for all calendars
        const data = {};
        Object.values(Calendars).forEach(calendar => {
            data[calendar.key] = loadFromStorage(calendar.key) || [];
        });
        setCalendarData(data);
    }, [selectedDate]);

    return (
        <div className="w-screen h-[calc(100vh-127px)] overflow-y-auto">
            <div className="flex gap-4 pb-4 items-center sticky z-10 top-0 bg-white dark:bg-stone-900">
                <DateStrip
                    length={10}
                    type="week"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} />
            </div>

            <div className="font-medium text-sm mb-2 px-2">
                {weekDays.length > 0 ?
                    `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}` :
                    format(selectedDate, 'MMMM yyyy')}
            </div>

            <div className="flex flex-col gap-4">
                {Object.values(Categories).map((category) => {
                    // Get calendars for this category
                    const categoryCalendars = Object.values(Calendars)
                        .filter(calendar => calendar.category === category);

                    // Skip categories with no calendars
                    if (categoryCalendars.length === 0) return null;

                    return (
                        <div key={category} className="bg-stone-200 dark:bg-stone-700 p-4 rounded-2xl mx-2">
                            <h2 className="text-base font-bold px-2 mb-3">
                                {category.toUpperCase()}
                            </h2>

                            <div className="grid grid-cols-1 gap-3">
                                {categoryCalendars.map((calendar) => (
                                    <div
                                        key={calendar.key}
                                        className="bg-white dark:bg-stone-800 rounded-xl flex items-center p-3 justify-between">
                                        <div className="flex items-center gap-2">
                                            <span>{calendar.icon.slice(0, 2)}</span>
                                            <h3 className="font-semibold text-sm">
                                                {calendar.name.slice(0, 3).toUpperCase()}
                                            </h3>
                                        </div>

                                        <div className="flex gap-2">
                                            {weekDays.map((day) => {
                                                const dayData = calendarData[calendar.key]?.find(item =>
                                                    isSameDay(new Date(item.date), day)
                                                );

                                                // const isToday = isSameDay(day, new Date());
                                                const isSelected = isSameDay(day, selectedDate);

                                                return (
                                                    <div

                                                        key={format(day, 'yyyy-MM-dd')}
                                                        className={`size-7 rounded flex items-center justify-center text-xs
                                                            cursor-pointer ${dayData ? getColorsClassList(dayData.color) : 'bg-gray-200 dark:bg-gray-600'}
                                                            ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                                                        onClick={() => setSelectedDate(day)}>
                                                        {dayData?.note ? "📝" : ""}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}; 