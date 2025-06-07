import { Calendars } from "../constants";
import { CalendarButton } from "../atoms/CalendarButton";
import PropTypes from "prop-types";
import { useState } from "react";

const strip = Object.values(Calendars);
const categories = [...new Set(strip.map(item => item.category))];

export const CalendarsStrip = ({ onCalendarClick, isVisible }) => {
    const [selectedCalendar, setSelectedCalendar] = useState(strip[0]);


    if (!isVisible) return null;

    return (
        <div className="text-base font-bold flex 
            flex-wrap sm:flex-col w-full sm:w-fit
        md:h-[calc(100vh-80px)] sm:overflow-y-scroll
        sm:flex-nowrap sm:overflow-x-auto gap-2 sm:pb-10">
            {strip.map((item, index) => {
                const showCategory = index === 0 || strip[index - 1].category !== item.category;
                return (
                    <div key={item.key}>
                        {showCategory && (
                            <div className="text-sm text-stone-600 dark:text-stone-400 font-semibold mb-1 mt-2">
                                {item.category}
                            </div>
                        )}
                        <div id={item.key}>
                            <CalendarButton
                                onClick={() => {
                                    onCalendarClick(item);
                                    setSelectedCalendar(item);
                                }}
                                calendar={item}
                                isSelected={selectedCalendar.key === item.key}>
                                {item.icon} {item.name.slice(0, 7)}
                            </CalendarButton>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

CalendarsStrip.propTypes = {
    selectedCalendar: PropTypes.object.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
};