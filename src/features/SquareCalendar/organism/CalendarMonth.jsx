import { getDaysInMonth, getDay, startOfMonth, subMonths, format } from "date-fns";
import PropTypes from "prop-types";
import { DaySquare } from "../atoms/DaySquare";
import { useMemo, useState, useEffect } from "react";
import classNames from "classnames";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { FloppyDisk, CheckCircle, WarningCircle, X } from "@phosphor-icons/react";
import { createPortal } from 'react-dom';
import { getColorsClassList } from "../utils";

export const CalendarMonth = ({
    selectedDate = new Date(),
    setSelectedDate,
    data,
    monthIndex,
    size = "small",
    calendar,
    onColorSelect,
    onNoteUpdate,
    note: initialNote,
    isYearView = false,
    showNote = false,
    children
}) => {
    const [note, setNote] = useState(initialNote);
    const [isNoteSaved, setIsNoteSaved] = useState(null);
    const [isDaySelected, setIsDaySelected] = useState(false);

    useEffect(() => {
        setNote(initialNote);
    }, [initialNote]);
    
    const colorClass = useMemo(() => {
        const color = data.find(item => new Date(item.date).toDateString() === selectedDate.toDateString())?.color;
        return color && getColorsClassList(color);
    }, [data, selectedDate]);

    const month = useMemo(() => {
        return new Date(selectedDate.getFullYear(), monthIndex, 1);
    }, [selectedDate, monthIndex]);

    const calendarData = useMemo(() => {
        const daysInMonth = getDaysInMonth(month);
        const startDay = getDay(startOfMonth(month)); // 0 = Sunday, 1 = Monday, etc.
        const prevMonth = subMonths(month, 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);

        const previousMonthDays = Array.from({ length: startDay }, (_, i) => ({
            date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - startDay + i + 1),
            previousMonth: true
        }));

        const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
            date: new Date(month.getFullYear(), month.getMonth(), i + 1),
            previousMonth: false
        }));

        return [...previousMonthDays, ...currentMonthDays];
    }, [month]);

    const NoteSaveIcon = useMemo(() => {
        if (isNoteSaved === null) {
            return FloppyDisk;
        }

        if (isNoteSaved) {
            return CheckCircle;
        }
        return WarningCircle;
    }, [isNoteSaved]);
// bg-stone-100 dark:bg-stone-900
    return (
        <div className="flex flex-col justify-between w-full gap-2 h-full overflow-y-scroll" key={`month-${monthIndex}`}>
            {isYearView ? <h2 className="text-xs my-0 text-center">{format(month, "MMM")}</h2> : ""}
            <div className="flex flex-row-reverse gap-4 w-full">
                <div className={isYearView
                    ? "w-full"
                    : "z-10 w-full flex justify-start items-start"}>
                    <div className={classNames({
                        "grid grid-cols-7 h-fit w-fit relative": true,
                        "p-1 gap-0.5": size === "small",
                        "p-1 gap-1 mx-auto": size !== "small",
                    })}>
                        {calendarData.map((dayObj, dayIndex) => {
                            return (
                                <DaySquare
                                    monthIndex={monthIndex}
                                    dayIndex={dayIndex}
                                    size={size}
                                    data={data}
                                    key={`month-${monthIndex}-day-${dayIndex}`}
                                    dayObj={dayObj}
                                    selectedDate={selectedDate}
                                    setSelectedDate={date => {
                                        setSelectedDate(date);
                                        setIsDaySelected(true);
                                    }} />
                            );
                        })}

                        {!isYearView && isDaySelected && createPortal((
                            <div className="fixed z-50 w-screen h-screen 
                            flex flex-col items-center justify-center {colorClass}
                             p-5 space-y-4">
                                <button onClick={() => setIsDaySelected(false)}>
                                    <X size={42} />
                                </button>
                                <h1 className="merriweather-bold text-3xl text-left w-full">
                                    {calendar.icon} {calendar.name.toUpperCase()}
                                </h1>
                                <h2 className="merriweather-bold text-2xl text-left w-full">
                                    {format(selectedDate, "EEEE, MMMM d, yyyy")},
                                    {colorClass}
                                </h2>
                                <ColorsButtons
                                    data={data}
                                    calendar={calendar}
                                    selectedDate={selectedDate}
                                    monthIndex={monthIndex}
                                    onClose={() => setIsDaySelected(false)}
                                    onColorSelect={color => {
                                        onColorSelect(color);
                                        setIsDaySelected(false);
                                    }}
                                />
                                <textarea
                                    value={note}
                                    placeholder="Note"
                                    onChange={event => setNote(event.target.value)}
                                    className={classNames({
                                        "w-full p-2 merriweather-bold": true,
                                        "h-1/2 bg-transparent text-xl": true,
                                    })}
                                />
                                <button
                                    className="flex w-full items-center justify-center z-0 border-white"
                                    onClick={() => onNoteUpdate(note, (success) => {
                                        setIsNoteSaved(success);
                                        setTimeout(() => {
                                            setIsNoteSaved(null);
                                        }, 1000);
                                    })}>
                                    <NoteSaveIcon size={42} />
                                </button>
                            </div>
                        ), document.getElementById("day-popover-portal"))}
                    </div>
                </div>
            </div>
                        {children}
            {/* {!isYearView && <Pills type="month" length={12} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />} */}
            {/* <CalendarMonthColorInfo
                data={data}
                size={size}
                selectedDate={month}
                showInfo /> */}
        </div>
    )
};

CalendarMonth.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    setSelectedDate: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
    showInfo: PropTypes.bool,
    size: PropTypes.string,
    calendar: PropTypes.object.isRequired,
    onColorSelect: PropTypes.func,
    onNoteUpdate: PropTypes.func,
    note: PropTypes.string,
    isYearView: PropTypes.bool,
};