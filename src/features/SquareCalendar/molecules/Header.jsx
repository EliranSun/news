import PropTypes from "prop-types";
import { CalendarName } from "../atoms/CalendarName";
// import { CalendarYearColorInfo } from "./CalendarYearColorInfo";
import { CalendarGamification } from "./CalendarGamification";

export const Header = ({ calendar, selectedDate, daysSinceLastEntry, data }) => {
    return (
        <div className="flex flex-col gap-2 w-full justify-center items-center">
            <div className="flex flex-col gap-1">
                <CalendarName
                    calendar={calendar}
                    date={selectedDate}
                    withDate={true}
                    daysSinceLastEntry={daysSinceLastEntry} />
            </div>
            {/* <CalendarGamification
                calendar={calendar}
                size="big" /> */}
        </div>
    )
};

Header.propTypes = {
    calendar: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,
    daysSinceLastEntry: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
};
