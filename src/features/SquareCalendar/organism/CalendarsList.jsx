import classNames from "classnames";
import { Calendars } from "../constants";
import PropTypes from "prop-types";
import { motion } from "motion/react";
import { CalendarList } from "../molecules/CalendarList";

export const CalendarsList = ({ onClick, isOpen }) => {
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

    const foo = Object.entries(groupedCalendars);

    return (
        <motion.div
            transition={{ duration: 0.3 }}
            animate={{
                opacity: isOpen ? 1 : 0,
            }}
            className={classNames("flex justify-center gap-2", {
                "pointer-events-none": !isOpen,
                "pointer-events-auto": isOpen,
                "hidden": !isOpen,
            })}>
            <div className={classNames({
                "h-fit": true,
                "bg-white dark:bg-black": false,
                "grid grid-cols-1 gap-2 justify-center": true,
                "border border-black dark:border-white rounded-lg": false,
                "overflow-y-auto": true,
            })}>
                {foo.slice(0, 3).map(([category, calendars]) => (
                    <CalendarList
                        key={category}
                        calendars={calendars}
                        onClick={onClick}
                        category={category} />
                ))}
            </div>
            <div className={classNames({
                "h-fit": true,
                "bg-white dark:bg-black": false,
                "grid grid-cols-1 gap-2 justify-center": true,
                "border border-black dark:border-white rounded-lg": false,
                "overflow-y-auto": true,
            })}>
                {foo.slice(3, foo.length).map(([category, calendars]) => (
                    <CalendarList
                        key={category}
                        calendars={calendars}
                        onClick={onClick}
                        category={category} />
                ))}
            </div>
        </motion.div>
    );
};

CalendarsList.propTypes = {
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};
