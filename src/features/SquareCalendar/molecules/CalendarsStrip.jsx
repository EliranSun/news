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
        <div className="text-base font-bold flex flex-col 
        md:h-[calc(100vh-76px-97px-96px-8px-8px)] overflow-y-scroll
        flex-nowrap overflow-x-auto gap-2 ">
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
                                {item.icon} {item.name}
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