import { Calendars } from "../constants";
import { CalendarButton } from "../atoms/CalendarButton";
import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames";

const strip = Object.values(Calendars);

export const CalendarsStrip = ({ onCalendarClick, isVisible }) => {
    const [selectedCalendar, setSelectedCalendar] = useState(strip[0]);


    if (!isVisible) return null;

    return (
        <div className={classNames(
            "text-base font-bold flex",
            "flex-wrap sm:flex-col w-1/4 px-8 pb-40",
            "h-[calc(100vh-40px-32px)] overflow-y-auto ",
            "sm:flex-nowrap sm:overflow-x-auto gap-2 sm:pb-10",
        )}>
            {strip.map((item, index) => {
                const showCategory = index === 0 || strip[index - 1].category !== item.category;
                return (
                    <div key={item.key} className="w-full">
                        {showCategory && (
                            <div className="font-semibold py-2">
                                {item.category}
                            </div>
                        )}
                        <CalendarButton
                            calendar={item}
                            isSelected={selectedCalendar.key === item.key}
                            onClick={() => {
                                onCalendarClick(item);
                                setSelectedCalendar(item);
                            }}>
                            {item.icon} {item.name.slice(0, 7)}
                        </CalendarButton>
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