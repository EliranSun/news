import { Calendars, Categories } from "../constants";
import { useState, useEffect, useCallback } from "react";
import { DateStrip } from "../molecules/DateStrip";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { getColorsClassList, loadFromStorage } from "../utils";
import { DayModalPortal } from "./DayModalPortal";

const WeekDay = ({ calendarData, calendar, day, selectedDate, setSelectedDate, updateData }) => {
    const [isDayModelOpen, setIsDayModelOpen] = useState(false);
    const dayData = calendarData[calendar.key]?.find(item =>
        isSameDay(new Date(item.date), day)
    );

    // const isToday = isSameDay(day, new Date());
    const isSelected = isSameDay(day, selectedDate);

    return (
        <>
            <div
                onClick={() => {
                    setSelectedDate(day);
                    setIsDayModelOpen(true);
                }}
                className={`size-7 rounded flex items-center justify-center text-sm
                cursor-pointer ${dayData
                        ? getColorsClassList(dayData.color)
                        : 'bg-gray-200 dark:bg-gray-600'}
                ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                {dayData?.note ? "•" : ""}
            </div>

            {isDayModelOpen &&
                <DayModalPortal
                    colorClass={dayData && getColorsClassList(dayData.color)}
                    onClose={() => setIsDayModelOpen(false)}
                    calendar={calendar}
                    selectedDate={day}
                    data={calendarData[calendar.key]}
                    note={dayData?.note || ""}
                    onColorSelect={(color, selectedDate) => updateData(color, dayData?.note, selectedDate)}
                    onNoteUpdate={note => updateData(dayData?.color, note, day)}
                    monthIndex={day.getMonth()}
                />}
        </>
    );
};

// WeekDay.propTypes = {
//     calendarData: PropTypes.object.isRequired,
//     calendar: PropTypes.object.isRequired,
//     day: PropTypes.date.isRequired,
//     selectedDate: PropTypes.date.isRequired,
//     setSelectedDate: PropTypes.func.isRequired,
// };

export const WeeklyListView = ({ updateData }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);
    const [calendarData, setCalendarData] = useState();

    const updateWeeklyData = useCallback(() => {
        // Preserve the current time (hours, minutes, seconds, ms) when generating week days
        const preserveTime = (date, refDate) => {
            const d = new Date(date);
            d.setHours(refDate.getHours(), refDate.getMinutes(), refDate.getSeconds(), refDate.getMilliseconds());
            return d;
        };
        const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 0 });
        const days = eachDayOfInterval({ start, end }).map(day => preserveTime(day, selectedDate));

        setWeekDays(days);

        // Load data for all calendars
        const data = {};
        Object.values(Calendars).forEach(calendar => {
            data[calendar.key] = loadFromStorage(calendar.key) || [];
        });
        setCalendarData(data);
    }, [selectedDate]);

    useEffect(() => {
        updateWeeklyData();
    }, [selectedDate, updateData]);

    return (
        <div className="w-screen h-[calc(100vh-127px)] overflow-y-auto">
            <div className="flex gap-4 pb-4 items-center sticky z-10 top-0">
                <DateStrip
                    length={10}
                    type="week"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} />
            </div>

            {/* <div className="font-medium text-sm mb-2 px-2">
                {weekDays.length > 0 ?
                    `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}` :
                    format(selectedDate, 'MMMM yyyy')}
            </div> */}

            <div className="flex flex-col gap-2">
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
                                                return (
                                                    <WeekDay
                                                        key={format(day, 'yyyy-MM-dd')}
                                                        day={day}
                                                        setSelectedDate={setSelectedDate}
                                                        calendarData={calendarData}
                                                        calendar={calendar}
                                                        selectedDate={selectedDate}
                                                        updateData={(color, note, date) => {
                                                            updateData({
                                                                color,
                                                                note,
                                                                date,
                                                                data: calendarData[calendar.key],
                                                                calendar
                                                            });
                                                            updateWeeklyData();
                                                        }}
                                                    />
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