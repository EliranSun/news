import { Calendars } from "./constants";
import { CalendarButton } from "./CalendarButton";
import PropTypes from "prop-types";
import { getDaysSinceLastEntry } from "./utils";
import { useMemo } from "react";

export const CalendarsStrip = ({ selectedCalendar, onCalendarClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(selectedCalendar.key), [selectedCalendar.key]);

    return (
        <div className="text-base font-bold flex flex-nowrap w-[calc(99vw-99px)] overflow-x-auto gap-4">
            {Object.values(Calendars).map((item) =>
                <div key={item.key} className="h-fit" id={item.key}>
                    <CalendarButton
                        onClick={() => onCalendarClick(item)}
                        isSelected={selectedCalendar.key === item.key}
                        color={
                            (daysSinceLastEntry >= selectedCalendar.redAfter || !daysSinceLastEntry) ? "red" :
                                daysSinceLastEntry >= selectedCalendar.yellowAfter ? "yellow" :
                                    "green"
                        }>
                        {item.icon} {item.name.slice(0, 3)}
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