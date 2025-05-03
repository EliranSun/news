import { Calendars } from "../constants";
import { CalendarButton } from "../atoms/CalendarButton";
import PropTypes from "prop-types";

export const CalendarsStrip = ({ selectedCalendar, onCalendarClick }) => {
    const strip = Object.values(Calendars);
    
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="text-base font-bold flex flex-nowrap overflow-x-auto gap-2">
                {strip.slice(0, Math.round(strip.length / 2)).map(item => {
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
            </div>
            <div className="text-base font-bold flex flex-nowrap overflow-x-auto gap-2">
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
            </div>
        </div>
    );
};

CalendarsStrip.propTypes = {
    selectedCalendar: PropTypes.object.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
};