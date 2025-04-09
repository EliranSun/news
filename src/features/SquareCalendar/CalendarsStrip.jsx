import { Calendars } from "./constants";
import { CalendarButton } from "./CalendarButton";
import PropTypes from "prop-types";

export const CalendarsStrip = ({ selectedCalendar, onCalendarClick }) => {
    return (
        <div className="text-base font-bold flex flex-nowrap w-screen px-4 overflow-x-auto gap-4">
            {Object.entries(Calendars).map(([key, item]) => {
                console.log({ key, item });
                return (
                    <div key={key} className="h-fit" id={key}>
                        <CalendarButton
                            onClick={() => onCalendarClick(item)}
                            calendar={{ ...item, key }}
                            isSelected={selectedCalendar.key === item.key}>
                            {item.icon}
                        </CalendarButton>
                    </div>
                )
            }
            )}
        </div>
    );
};

CalendarsStrip.propTypes = {
    selectedCalendar: PropTypes.object.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
};