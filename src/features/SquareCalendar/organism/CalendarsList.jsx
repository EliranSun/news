import classNames from "classnames";
import { Calendars } from "../constants";
import { getDaysSinceLastEntry } from "../utils";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { CalendarName } from "../atoms/CalendarName";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import { motion } from "motion/react";

const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer flex items-center justify-between gap-2
            w-full overflow-hidden odd:bg-gray-200 dark:odd:bg-gray-800">
            <CalendarName
                calendar={calendar}
                variant="list"
                daysSinceLastEntry={daysSinceLastEntry} />
            <DaysSinceBadge
                showToday
                colorText
                calendar={calendar}
                hoursSince={daysSinceLastEntry}
                withIcon={false} />
        </div>
    );
};

CalendarItem.propTypes = {
    calendar: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export const CalendarsList = ({ onClick, onClose, isOpen }) => {
    // Group calendars by category
    const groupedCalendars = Object.values(Calendars).reduce((acc, calendar) => {
        if (!acc[calendar.category]) {
            acc[calendar.category] = [];
        }
        acc[calendar.category].push({
            ...calendar,
        });
        return acc;
    }, {});

    return (
        <motion.div
            transition={{ duration: 0.3 }}
            animate={{
                opacity: isOpen ? 1 : 0,
            }}
            className={classNames({
                "pointer-events-none": !isOpen,
                "pointer-events-auto": isOpen,
                "font-mono": true,
                "hidden": !isOpen,
            })}>
            <div className={classNames({
                "w-screen h-fit p-4": true,
                "bg-white dark:bg-black": false,
                "flex flex-wrap gap-2 justify-start items-start": true,
                "border border-black dark:border-white rounded-lg": false,
                "overflow-y-auto": true,
            })}>
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div
                        key={category}
                        className={classNames({
                            "p-2 rounded-xl w-[calc(50%-0.5rem)] h-full gap-1 flex flex-col": true,
                            "bg-gray-100 dark:bg-gray-900": true
                        })}>
                        <h3 className="font-bold">
                            {category}
                        </h3>
                        {calendars.map((calendar) => (
                            <CalendarItem
                                key={calendar.key}
                                calendar={calendar}
                                onClick={onClick} />
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

CalendarsList.propTypes = {
    onClick: PropTypes.func.isRequired
};
