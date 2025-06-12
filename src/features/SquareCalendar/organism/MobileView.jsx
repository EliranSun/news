import PropTypes from "prop-types";
import { Calendars } from "../constants";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { NoteModal } from "../molecules/NoteModal";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { isSameDay, subDays, addDays } from "date-fns";
import { getColorsClassList } from "../utils";
import { CalendarGamification } from "../molecules/CalendarGamification";
import classNames from "classnames";
import { motion, AnimatePresence } from "motion/react";
import { loadFromStorage } from "../utils";


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

const SingleCalendar = ({
    calendar,
    selectedDate,
    updateData,
    data
}) => {

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const hasNote = useMemo(() =>
        data.find(item => isSameDay(item.date, selectedDate))?.note, [data, selectedDate]);

    const selectedColorClass = useMemo(() => {
        const selectedColor = data.find(item => isSameDay(item.date, selectedDate))?.color;
        return selectedColor ? getColorsClassList(selectedColor) : null;
    }, [data, selectedDate]);

    return (
        <>
            <div className="p-4 w-full border-b my-2">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold uppercase heebo-900 mb-2">
                        {calendar.icon} {calendar.name}
                    </h2>
                </div>
                <ColorsButtons
                    display="compact"
                    calendar={calendar}
                    data={data}
                    selectedColorClass={selectedColorClass}
                    selectedDate={selectedDate}
                    onColorSelect={async (color) => {
                        await updateData({ color, date: selectedDate, calendar });
                    }}
                />
                <div className="flex justify-start items-center gap-4 py-2 border p-2 rounded-full w-fit mt-4">
                    <CalendarGamification
                        calendar={calendar}
                        variant=""
                        data={data}
                        hideToday
                        hideIcons />
                    <span
                        onClick={() => setIsNoteModalOpen(true)}
                        className={classNames("text-sm border py-2 px-8 rounded-full", {
                            "text-stone-500": !hasNote,
                            "text-stone-900 font-bold": hasNote,
                        }, "cursor-pointer")}>
                        {/* <Note size={24} weight={hasNote ? "fill" : "regular"} color="black" /> */}
                        {hasNote ? "Noted" : "Add Note"}
                    </span>
                </div>
            </div>
            <NoteModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                calendar={calendar}
                data={data}
                updateData={updateData}
                date={selectedDate} />
        </>
    )
};

SingleCalendar.propTypes = {
    calendar: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    updateData: PropTypes.func.isRequired
};

export const MobileView = ({
    selectedDate,
    setSelectedDate,
    updateData,
}) => {

    const [direction, setDirection] = useState(0);
    const [data, setData] = useState([]);

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

    return (
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
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                            duration: 0.15
                        }}
                        className="text-2xl font-bold merriweather-black"
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
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.12
                    }}
                    className="p-2"
                >
                    {data.map((calendarData, index) => {
                        debugger;
                        return (
                            <SingleCalendar
                                key={index}
                                calendar={Calendars[Object.keys(Calendars)[index]]}
                                selectedDate={selectedDate}
                                updateData={updateData}
                                data={calendarData}
                            />
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

MobileView.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};