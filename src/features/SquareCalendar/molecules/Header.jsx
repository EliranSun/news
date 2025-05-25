import PropTypes from "prop-types";
import { CalendarName } from "../atoms/CalendarName";
// import { CalendarYearColorInfo } from "./CalendarYearColorInfo";
import { CalendarGamification } from "./CalendarGamification";

export const Header = ({ calendar, selectedDate, daysSinceLastEntry, data, children }) => {
    return (
        <div className="flex gap-6 w-fit px-4 justify-center text-white items-center bg-stone-700 h-10 rounded-full">
            <div className="flex gap-2 items-center">
                <CalendarName
                    calendar={calendar}
                    date={selectedDate}
                    withDate={true}
                    daysSinceLastEntry={daysSinceLastEntry} />
                {children}
            </div>
            <CalendarGamification
                calendar={calendar}
                size="big" />
        </div>
    )
};

Header.propTypes = {
    calendar: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    daysSinceLastEntry: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
};
