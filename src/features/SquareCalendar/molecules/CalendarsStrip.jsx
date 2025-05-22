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
        <div className="flex flex-col gap-1 w-full">
            <div className="text-base font-bold flex flex-nowrap overflow-x-auto gap-2">
                {categories.map(category => {
                    return (
                        <CalendarButton
                            key={category}
                            id={category}
                            isSelected={selectedCalendar.category === category}
                            onClick={() => setSelectedCalendar(strip.find(item => item.category === category))}>
                            <span>{category}</span>
                        </CalendarButton>
                    )
                })}
            </div>
            <div className="text-base font-bold flex flex-nowrap overflow-x-auto gap-2">
                {strip.filter(item => item.category === selectedCalendar.category).map(item => {
                    return (
                        <div key={item.key} id={item.key}>
                            <CalendarButton
                                onClick={() => {
                                    onCalendarClick(item);
                                    setSelectedCalendar(item);
                                }}
                                calendar={item}
                                isSelected={selectedCalendar.key === item.key}>
                                {item.icon}
                            </CalendarButton>
                        </div>
                    )
                })}
            </div>
            {/* <div className="text-base font-bold flex flex-nowrap overflow-x-auto gap-2">
                {strip.slice(Math.round(strip.length / 2), strip.length).map(item => {
                    return (
                        <div key={item.key} className="h-fit" id={item.key}>
                            <CalendarButton
                                onClick={() => onCalendarClick(item)}
                                calendar={item}
                                isSelected={selectedCalendar.key === item.key}>
                                {item.icon}
                            </CalendarButton>
                        </div>
                    )
                })}
            </div> */}
        </div>
    );
};

CalendarsStrip.propTypes = {
    selectedCalendar: PropTypes.object.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
};