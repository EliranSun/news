import { getDaysInMonth, getDay, startOfMonth, subMonths } from "date-fns";
import PropTypes from "prop-types";
import { DaySquare } from "../atoms/DaySquare";
import { useMemo, useState, useEffect } from "react";
import { CalendarMonthColorInfo } from "../molecules/CalendarMonthColorInfo";
import classNames from "classnames";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { FloppyDisk, CheckCircle, WarningCircle } from "@phosphor-icons/react";

export const CalendarMonth = ({
    selectedDate = new Date(),
    setSelectedDate,
    data,
    monthIndex,
    showInfo,
    size = "small",
    calendar,
    onColorSelect,
    onNoteUpdate,
    note: initialNote
}) => {
    const [note, setNote] = useState(initialNote);
    const [isNoteSaved, setIsNoteSaved] = useState(null);

    useEffect(() => {
        console.log("initialNote", initialNote);
        setNote(initialNote);
    }, [initialNote]);

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

    return (
        <div className="flex flex-col justify-between space-y-4" key={`month-${monthIndex}`}>
            <div>
                <div className={classNames({
                    "grid grid-cols-7": true,
                    "p-1 gap-0.5": size === "small",
                    "p-2 gap-1": size !== "small",
                })}>
                    {calendarData.map((dayObj, dayIndex) => {
                        return (
                            <DaySquare
                                monthIndex={monthIndex}
                                dayIndex={dayIndex}
                                size={size}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                data={data}
                                key={`month-${monthIndex}-day-${dayIndex}`}
                                dayObj={dayObj} />
                        );
                    })}
                </div>
            </div>
            <CalendarMonthColorInfo
                data={data}
                size={size}
                selectedDate={month}
                showInfo />
            <textarea
                value={note}
                placeholder="Note"
                onChange={event => setNote(event.target.value)}
                className={classNames({
                    "p-4 rounded-lg font-mono": true,
                    "border min-h-10": true,
                })}
            />
            <ColorsButtons calendar={calendar} onColorSelect={onColorSelect} />
            <button className="flex items-center justify-center" onClick={() => onNoteUpdate(note, (success) => {
                setIsNoteSaved(success);
                setTimeout(() => {
                    setIsNoteSaved(null);
                }, 1000);
            })}>
                <NoteSaveIcon size={24} />
            </button>
        </div>
    )
};

CalendarMonth.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    setSelectedDate: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    monthIndex: PropTypes.number.isRequired,
    showInfo: PropTypes.bool,
};