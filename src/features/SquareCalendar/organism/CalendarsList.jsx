import classNames from "classnames";
import { Calendars } from "../constants";
import { getDaysSinceLastEntry } from "../utils";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { CalendarName } from "../atoms/CalendarName";
import { DaysSinceBadge } from "../atoms/DaysSinceBadge";
import { motion } from "motion/react";
import { X } from "@phosphor-icons/react";

const CalendarItem = ({ calendar, onClick }) => {
    const daysSinceLastEntry = useMemo(() => getDaysSinceLastEntry(calendar.key), [calendar.key]);

    return (
        <div
            onClick={() => onClick(calendar)}
            className="cursor-pointer flex items-center justify-between
            w-full overflow-hidden odd:bg-gray-200 dark:odd:bg-gray-800">
            <CalendarName
                calendar={calendar}
                variant="list"
                daysSinceLastEntry={daysSinceLastEntry} />
            <DaysSinceBadge
                showToday
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
                backdropFilter: isOpen ? "brightness(50%) blur(10px)" : "brightness(100%) blur(0px)"
            }}
            className={classNames({
                "w-screen h-screen fixed inset-x-0 top-0 z-10": true,
                "pointer-events-none": !isOpen,
                "pointer-events-auto": isOpen,
                "font-mono": true,
                // "space-y-4": true,
                // "p-2 flex justify-center items-center": true,
                // "flex-col": Object.keys(groupedCalendars).length > 1,
                // "flex-row": Object.keys(groupedCalendars).length <= 1
            })}>
            <button
                className="absolute bottom-14 inset-x-0 m-auto 
                text-xl font-mono flex items-center justify-center
                rounded-full size-10 p-2 border"
                onClick={onClose}>
                <X size={24} />
            </button>
            <div className={classNames({
                "w-screen h-screen mt-16": true,
                "bg-white dark:bg-black": false,
                // "grid grid-cols-1 gap-2 grid-auto-rows-max items-start": true,
                "flex flex-col flex-wrap gap-2 justify-start items-center": true,
                "border border-black dark:border-white rounded-lg": false,
                "overflow-y-auto": true,
                // "max-h-[80vh]": true
            })}>
                {Object.entries(groupedCalendars).map(([category, calendars]) => (
                    <div
                        key={category}
                        className={classNames({
                            "p-2 shrink-0 rounded-xl w-60 h-fit flex flex-col": true,
                            "bg-gray-100 dark:bg-gray-900": true
                        })}>
                        <h3 className="font-bold">{category}</h3>
                        <div className="">
                            {calendars.map((calendar) => (
                                <CalendarItem
                                    key={calendar.key}
                                    calendar={calendar}
                                    onClick={onClick} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

CalendarsList.propTypes = {
    onClick: PropTypes.func.isRequired
};
