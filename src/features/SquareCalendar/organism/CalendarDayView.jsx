import classNames from "classnames";
import { getColorsClassList } from "../utils";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const CalendarDay = ({ item }) => {
    const [isNoteExpanded, setIsNoteExpanded] = useState(false);
    const day = format(item.date, "E");
    const dayNumber = format(item.date, "dd");
    const month = format(item.date, "MMM");

    return (
        <div
            key={item.date}
            onClick={() => setIsNoteExpanded(!isNoteExpanded)}
            className={classNames({
                "flex gap-4 items-start dark:bg-black dark:text-white bg-gray-50 dark:odd:bg-gray-900 odd:bg-gray-100": true,
                "rounded-xl px-4 py-1 text-sm": true,
                "mb-8": day === "Sat",
            })} >
            <div className={classNames(getColorsClassList(item.color), {
                "size-4 rounded shrink-0": true,
            })} />
            <div>{month?.slice(0, 1)}{dayNumber}{day?.slice(0, 1)}{item.note ? ": " : ""}{
                isNoteExpanded ? item.note : item.note?.slice(0, 30)
            }</div>
        </div>
    );

};

CalendarDay.propTypes = {
    item: PropTypes.shape({
        date: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        note: PropTypes.string,
    }).isRequired,
};

export const CalendarDayView = ({ data }) => {

    useEffect(() => {
        // scroll to the bottom of the page
        const calendarDayView = document.getElementById("calendar-day-view");
        if (calendarDayView) {
            calendarDayView.scrollTo({
                top: calendarDayView.scrollHeight,
                behavior: "smooth"
            });
        }
    }, []);

    return (
        <div
            id="calendar-day-view"
            className="flex flex-col gap-1 h-[80vh] w-screen overflow-y-auto pb-20">
            {data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => {
                return (
                    <CalendarDay
                        key={item.date}
                        item={item}
                    />
                );
            })}
        </div>
    )
};

CalendarDayView.propTypes = {
    data: PropTypes.array.isRequired,
};