import { getDaysInMonth, getDay, startOfMonth, subMonths, format, isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { DaySquare } from "../atoms/DaySquare";
import { useMemo, useState, useEffect } from "react";
import classNames from "classnames";
// import { FloppyDisk, CheckCircle, WarningCircle } from "@phosphor-icons/react";
// import { getColorsClassList } from "../utils";
// import { DayModalPortal } from "./DayModalPortal";

export const CalendarMonth = ({
    selectedDate = new Date(),
    setSelectedDate,
    setSelectedCalendar,
    data,
    monthIndex,
    size = "small",
    calendar,
    // onColorSelect,
    // onNoteUpdate,
    // note,
    isYearView = false,
    // showNote = false,
    children,
    header,
    isSelected,
    infoState
}) => {
    // const [note, setNote] = useState(initialNote);
    // const [isNoteSaved, setIsNoteSaved] = useState(null);
    // const [isDaySelected, setIsDaySelected] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const colorClass = useMemo(() => {
    //     const color = data.find(item => new Date(item.date).toDateString() === selectedDate.toDateString())?.color;
    //     return color && getColorsClassList(color);
    // }, [data, selectedDate]);

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
            previousMonth: false,
            note: data.find(item => isSameDay(item.date, new Date(month.getFullYear(), month.getMonth(), i + 1)))?.note || ""
        }));

        return [...previousMonthDays, ...currentMonthDays];
    }, [month, data]);

    // const NoteSaveIcon = useMemo(() => {
    //     if (isNoteSaved === null) {
    //         return FloppyDisk;
    //     }

    //     if (isNoteSaved) {
    //         return CheckCircle;
    //     }
    //     return WarningCircle;
    // }, [isNoteSaved]);

    return (
        <div className="flex flex-col w-full gap-0 bg-stone-100 dark:bg-stone-800
         rounded-md p-1" key={`month-${monthIndex}`}>
            {isYearView ?
                <h2 className="text-xs my-0 w-full text-center">
                    {format(month, "MMM")}
                </h2> : ""}
            {header}
            <div className="flex flex-row-reverse gap-4 w-full">
                <div className={isYearView
                    ? "w-full"
                    : "z-10 w-full flex justify-center items-center"}>
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
                                    isSelected={isSelected}
                                    key={`month-${monthIndex}-day-${dayIndex}`}
                                    dayObj={dayObj}
                                    infoState={infoState}
                                    selectedDate={selectedDate}
                                    // onDoubleClick={() => setIsModalOpen(true)}
                                    onClick={date => {
                                        setSelectedDate?.(date);
                                        // setIsDaySelected(true);
                                        setSelectedCalendar?.(calendar);
                                    }} />
                            );
                        })}
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