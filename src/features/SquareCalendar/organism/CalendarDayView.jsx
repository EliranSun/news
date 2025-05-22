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

    return (
        <div
            key={item.date}
            onClick={() => setIsNoteExpanded(!isNoteExpanded)}
            className={classNames({
                "flex gap-2 items-center": true,
                "dark:bg-black dark:text-white bg-gray-50 dark:odd:bg-gray-900 odd:bg-gray-100": true,
                "rounded px-1.5 py-0 text-[10px]": true,
                "mb-1": day === "Sat",
            })} >
            <div className={classNames(getColorsClassList(item.color), {
                "size-2 rounded-sm shrink-0": true,
            })} />
            <div className="w-full overflow-x-auto">
                {month?.slice(0, 1)}
                {dayNumber}
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
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
            className="flex flex-col gap-1">
            {sortedData.map((item, idx) => {
                const dateObj = new Date(item.date);
                const month = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });

                const showMonth = lastMonth !== month;
                lastMonth = month;

                return (
                    <React.Fragment key={item.date}>
                        {showMonth && (
                            <div className="sticky top-0 z-10 py-2 font-bold text-lg">
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