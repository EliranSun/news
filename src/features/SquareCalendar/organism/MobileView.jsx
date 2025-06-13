import PropTypes from "prop-types";
import { Calendars } from "../constants";
import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { subDays, addDays } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { loadFromStorage } from "../utils";
import { SingleCalendar } from "./SingleCalendar";
import { NoteModal } from "../molecules/NoteModal";
import { YearView } from "./YearView";
import classNames from "classnames";

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0
    })
};

const headerVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        x: direction < 0 ? 100 : -100,
        opacity: 0
    })
};

export const MobileView = ({
    selectedDate,
    setSelectedDate,
    updateData,
}) => {
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [direction, setDirection] = useState(0);
    const [data, setData] = useState([]);
    const [calendar, setCalendar] = useState(null);
    const calendarData = useMemo(() => {
        if (!calendar) return [];

        return data[Object.values(Calendars).findIndex(c => c.key === calendar.key)];
    }, [data, calendar]);

    useEffect(() => {
        const loadData = async () => {
            const allData = await Promise.all(Object.values(Calendars).map(async (calendar) => {
                const data = await loadFromStorage(calendar.key);
                return data;
            }));

            setData(allData);
        };
        loadData();
    }, []);

    const handleDateChange = (newDate) => {
        setDirection(newDate > selectedDate ? 1 : -1);
        setSelectedDate(newDate);
    };

    console.log({ calendarData });

    return (
        <>
            <div className="w-full h-screen overflow-y-auto">
                <div className="flex justify-between py-2 items-center sticky top-0 bg-stone-100 dark:bg-stone-900 z-10">
                    <motion.button
                        onClick={() => handleDateChange(subDays(selectedDate, 1))}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                        <ArrowLeft size={24} weight="bold" />
                    </motion.button>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.h1
                            key={selectedDate.toDateString()}
                            custom={direction}
                            variants={headerVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-2xl font-bold merriweather-black"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20,
                                duration: 0.15
                            }}
                        >
                            {selectedDate.toLocaleDateString("en-GB", {
                                weekday: "short",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </motion.h1>
                    </AnimatePresence>

                    <motion.button
                        onClick={() => handleDateChange(addDays(selectedDate, 1))}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                        <ArrowRight size={24} weight="bold" />
                    </motion.button>
                </div>

                <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                        key={selectedDate.toDateString()}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="p-2"
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            duration: 0.12
                        }}
                    >
                        {data.map((calendarData, index) => {
                            return (
                                <SingleCalendar
                                    key={index}
                                    calendar={Calendars[Object.keys(Calendars)[index]]}
                                    selectedDate={selectedDate}
                                    data={calendarData}
                                    openCalendarModal={(calendar) => {
                                        setIsCalendarModalOpen(true);
                                        setCalendar(calendar);
                                    }}
                                    openNoteModal={calendar => {
                                        setIsNoteModalOpen(true);
                                        setCalendar(calendar);
                                    }}
                                    updateData={async params => {
                                        const newData = await updateData(params);
                                        setData(data.map((item, i) => i === index ? newData : item));
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
            {calendar &&
                <NoteModal
                    isOpen={isNoteModalOpen}
                    calendar={calendar}
                    data={calendarData}
                    updateData={updateData}
                    date={selectedDate}
                    onClose={() => {
                        setIsNoteModalOpen(false);
                        setCalendar(null);
                    }} />}
            {calendar && isCalendarModalOpen &&
                <div className="fixed inset-0 w-screen h-screen backdrop-brightness-50 z-50 p-2 flex items-center justify-center">
                    <div className={classNames({
                        "bg-stone-100 dark:bg-stone-900": true,
                        "rounded-md p-4": true,
                        "border border-stone-300 dark:border-stone-700": true
                    })}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold merriweather-black">{calendar.name}</h2>
                            <X size={24} weight="bold" onClick={() => {
                                setIsCalendarModalOpen(false);
                                setCalendar(null);
                            }} />
                        </div>
                        <div className="h-[90vh] overflow-y-auto">
                            <YearView
                                calendar={calendar}
                                selectedDate={selectedDate}
                                updateData={updateData}
                                // yearMap={yearMap}
                                onlyCalendar={true}
                                setSelectedDate={setSelectedDate}
                                data={calendarData}
                            />
                        </div>
                    </div>
                </div>}
        </>
    );
};

MobileView.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};