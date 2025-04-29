import { getDaysInMonth, getDay, startOfMonth, subMonths, format } from "date-fns";
import PropTypes from "prop-types";
import { DaySquare } from "../atoms/DaySquare";
import { useMemo, useState, useEffect } from "react";
import classNames from "classnames";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { FloppyDisk, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Pills } from "../molecules/Pills";
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
    note: initialNote,
    isYearView = false
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
        <div className="flex flex-col justify-between w-full gap-4 h-full overflow-y-scroll" key={`month-${monthIndex}`}>
            {!isYearView && <Pills type="month" length={12} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
            {isYearView ? <h2 className="text-xs my-0 text-center">{format(month, "MMM")}</h2> : ""}
            <div>
                <div className={classNames({
                    "grid grid-cols-7": true,
                    "p-1 gap-0.5": size === "small",
                    "p-1 gap-1 justify-center items-start w-fit my-2": size !== "small",
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
            {/* <CalendarMonthColorInfo
                data={data}
                size={size}
                selectedDate={month}
                showInfo /> */}
            {!isYearView && (
                <>
                    <ColorsButtons
                        calendar={calendar}
                        onColorSelect={onColorSelect}
                        selectedDate={selectedDate}
                        monthIndex={monthIndex}
                        data={data}
                    />
                    <textarea
                        value={note}
                        placeholder="Note"
                        onChange={event => setNote(event.target.value)}
                        className={classNames({
                            "p-4 rounded-lg w-full": true,
                            "border-none h-48": true,
                        })}
                    />
                    <button className="flex absolute right-5 bottom-32 items-center justify-center" onClick={() => onNoteUpdate(note, (success) => {
                        setIsNoteSaved(success);
                        setTimeout(() => {
                            setIsNoteSaved(null);
                        }, 1000);
                    })}>
                        <NoteSaveIcon size={24} />
                    </button>
                </>
            )}
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