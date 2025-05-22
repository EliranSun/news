import classNames from "classnames";
import { getColorsClassList } from "../utils";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";

const CalendarDay = ({ item }) => {
    const [isNoteExpanded, setIsNoteExpanded] = useState(false);
    const day = format(item.date, "E");
    const dayNumber = format(item.date, "dd");
    const month = format(item.date, "MMM");

    // overflow-hidden text-ellipsis whitespace-nowrap

    return (
        <div
            key={item.date}
            onClick={() => setIsNoteExpanded(!isNoteExpanded)}
            className={classNames({
                "flex gap-2 items-start": true,
                "dark:bg-black dark:text-white bg-gray-50 dark:odd:bg-gray-900 odd:bg-gray-100": true,
                "rounded p-2 inter-500": true,
                "mb-1": day === "Sat",
            })} >
            <div className={classNames(getColorsClassList(item.color), {
                "w-2 h-10 shrink-0": true,
            })} />
            <div className="w-full">
                {month?.slice(0, 1)}
                {dayNumber}
                <span className="">
                    {day?.slice(0, 1)}
                    {item.note ? ": " : ""}
                    {item.note}
                </span>
            </div>
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

    // Sort and filter data
    const sortedData = data
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .filter(item => item.note);

    let lastMonth = null;

    return (
        <div
            id="calendar-day-view"
            className="flex flex-col gap-2">
            {sortedData.map((item, idx) => {
                const dateObj = new Date(item.date);
                const month = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });

                const showMonth = lastMonth !== month;
                lastMonth = month;

                // sticky top-0 z-10 
                return (
                    <React.Fragment key={item.date}>
                        {showMonth && (
                            <div className="py-2 font-bold text-lg">
                                {month}
                            </div>
                        )}
                        <CalendarDay item={item} />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

CalendarDayView.propTypes = {
    data: PropTypes.array.isRequired,
};