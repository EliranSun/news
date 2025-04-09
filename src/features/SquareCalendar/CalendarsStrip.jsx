import { Calendars } from "./constants";
import { CalendarButton } from "./CalendarButton";
import PropTypes from "prop-types";
import { getDaysSinceLastEntry } from "./utils";
import { useMemo } from "react";

export const CalendarsStrip = ({ selectedCalendar, onCalendarClick }) => {
    const hoursSinceLast = useMemo(() => getDaysSinceLastEntry(selectedCalendar.key), [selectedCalendar.key]);

    return (
        <div className="text-base font-bold flex flex-nowrap w-screen px-4 overflow-x-auto gap-4">
            {Object.values(Calendars).map((item) =>
                <div key={item.key} className="h-fit" id={item.key}>
                    <CalendarButton
                        onClick={() => onCalendarClick(item)}
                        isSelected={selectedCalendar.key === item.key}
                        color={
                            ((hoursSinceLast * 24) >= selectedCalendar.redAfter || !hoursSinceLast) ? "red" :
                                (hoursSinceLast * 24) >= selectedCalendar.yellowAfter ? "yellow" :
                                    "green"
                        }>
                        {item.icon}
                    </CalendarButton>
                </div>
            )}
        </div>
    );
};

CalendarsStrip.propTypes = {
    selectedCalendar: PropTypes.object.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
};