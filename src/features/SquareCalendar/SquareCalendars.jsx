import { useCallback, useState, useEffect, useMemo } from "react";
import { getColorsClassList, loadFromStorage, saveToStorage, contrastColor, isSameDay, ColorHexMap } from "./utils";
import { Calendars } from "./constants";
import { CalendarsList } from "./organism/CalendarsList";
import { CalendarGamification } from "./molecules/CalendarGamification";
import { CalendarsStrip } from "./molecules/CalendarsStrip";
import { CalendarMonth } from "./organism/CalendarMonth";
import { CalendarName } from "./atoms/CalendarName";
import { differenceInDays } from "date-fns";
import { CalendarYearColorInfo } from "./molecules/CalendarYearColorInfo";
import { DayDrawer } from "./molecules/DayDrawer";
import { Navbar } from "./molecules/Navbar";
import PhysicsDemo from "./organism/PhysicsDemo";
import { Info } from "@phosphor-icons/react";
import { Colors } from "./constants";
import { CalendarDayView } from "./organism/CalendarDayView";
// import { CalendarYearSummary } from "./organism/CalendarYearSummary";
import classNames from "classnames";
import { motion } from "framer-motion";
import { Palette } from "@phosphor-icons/react";

const FlexibleOpacityTransition = ({ children }) => {
    return (
        <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames({
                "flex flex-wrap h-10/12": true,
                "justify-center": true,
            })}>
            {children}
        </motion.div>
    );
};

const SelectedDateStrip = ({ selectedDate = new Date(), onCalendarClick }) => {
    const dayColours = useMemo(() => {
        if (!selectedDate) return {};


        return Object.values(Calendars).reduce((acc, cal) => {
            const stored = loadFromStorage(cal.key) ?? [];
            const entry = stored.find(e => isSameDay(e.date, selectedDate));
            acc[cal.key] = entry?.color ?? null;      // null → no colour that day
            return acc;
        }, {});
    }, [selectedDate]);


    if (!selectedDate) return null;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">{selectedDate.toLocaleDateString()}</h1>

            <div className="grid grid-cols-2 gap-1 overflow-x-auto py-0">
                {Object.values(Calendars).map(cal => {
                    const colour = dayColours[cal.key];
                    const isEmpty = !colour || colour === Colors.Clear;

                    console.log({ cal, colour, isEmpty });

                    return (
                        <div
                            key={cal.key}
                            onClick={() => onCalendarClick?.(cal)}
                            style={{ color: contrastColor({ bgColor: ColorHexMap[colour] }) }}
                            className={classNames(getColorsClassList(colour), "flex gap-0 items-center border border-gray-700 rounded-sm px-2")}>
                            <h2 className="w-28">{cal.name}</h2>
                            <div
                                title={cal.name}
                                className={classNames(
                                    "w-4 h-4 rounded-sm border",
                                    "flex-shrink-0 cursor-pointer",
                                    { "border-gray-700": isEmpty, "border-transparent": !isEmpty }
                                )}
                                style={{
                                    // backgroundColor: isEmpty ? "transparent" : colour,
                                    // opacity: isEmpty ? 0.25 : 1,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default function SquareCalendars() {
    const calendarKey = useMemo(() => new URL(window.location.href).searchParams.get('calendar'), []);
    const [isPhysicsDemoOpen, setIsPhysicsDemoOpen] = useState(false);
    const [calendar, setCalendar] = useState(Calendars[calendarKey] || Calendars.Mood);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const storageData = loadFromStorage(Calendars[calendarKey]?.key || Calendars.Mood.key);
    const [data, setData] = useState(storageData);
    const [selectedDateNote, setSelectedDateNote] = useState(data.find(item => isSameDay(item.date, selectedDate))?.note || "");
    const [showMonthInfo, setShowMonthInfo] = useState(false);
    const [view, setView] = useState("year");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dateTitle = useMemo(() => new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }), [selectedDate]);

    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

    const updateColor = useCallback((color) => {
        let newData;

        if (color === 'clear') {
            newData = data.filter(item => !isSameDay(item.date, selectedDate));
        } else {
            const existingEntry = data.find(item =>
                isSameDay(item.date, selectedDate));

            if (existingEntry) {
                newData = data.map(item =>
                    isSameDay(item.date, selectedDate)
                        ? { ...item, color }
                        : item
                );
            } else {
                newData = [...data, { date: selectedDate, color, note: selectedDateNote }];
            }
        }

        setData(newData);
        saveToStorage(calendar.key, newData);
        // setSelectedDate(addDays(selectedDate, 1));
    }, [selectedDate, data, calendar, selectedDateNote]);

    // useEffect(() => {
    //     saveToStorage(calendar.key, data);
    // }, [calendar, data]);

    useEffect(() => {
        setTimeout(() => {
            const calendarButton = document.getElementById(calendar.key);
            if (calendarButton) {
                calendarButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }, 100);
    }, [calendar]);

    const onCalendarClick = useCallback((item) => {
        const url = new URL(window.location.href);
        url.searchParams.set('calendar', item.key);
        window.history.pushState({}, '', url);

        saveToStorage(calendar.key, data);
        setCalendar(item);
        setData(loadFromStorage(item.key));
    }, [data, calendar]);

    useEffect(() => {
        const dayItem = data.find(item => isSameDay(item.date, selectedDate));
        setSelectedDateNote(dayItem?.note || "");
    }, [selectedDate, data]);

    const yearMap = useMemo(() => new Array(12).fill(0), []);

    {/* 
                <CalendarYearSummary /> */}
    return (
        <>
            <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="fixed bottom-32 right-5  rounded-full p-4 bg-black text-white">
                <Palette size={24}
                    color="white" />
            </button>
            {isPhysicsDemoOpen && <PhysicsDemo />}
            <Navbar
                selectedItem={view}
                onItemClick={setView}
                onPhysicsClick={() => setIsPhysicsDemoOpen(!isPhysicsDemoOpen)}
                onListClick={() => setView("list")} />
            <div id="note-modal-portal" />
            <DayDrawer
                title={dateTitle}
                calendar={calendar}
                isOpen={isDrawerOpen}
                onColorSelect={color => {
                    updateColor(color)
                }}
                onClose={() => setIsDrawerOpen(false)}
                note={selectedDateNote}
                onNoteUpdate={note => {
                    const newData = data.map(item =>
                        isSameDay(item.date, selectedDate)
                            ? { ...item, note }
                            : item);

                    setData(newData);
                    saveToStorage(calendar.key, newData);
                }}
            />
            <div className="p-4 w-screen overflow-hidden h-dvh user-select-none space-y-4 font-mono">
                <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <CalendarName
                                calendar={calendar}
                                daysSinceLastEntry={daysSinceLastEntry} />
                            <span className="text-lg font-bold">
                                {selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarGamification calendar={calendar} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                        <div className="flex items-center gap-2 justify-end">
                            <Info
                                size={24}
                                onClick={() => setShowMonthInfo(!showMonthInfo)}
                                weight={showMonthInfo ? "fill" : "regular"} />
                        </div>
                        <CalendarYearColorInfo data={data} selectedDate={selectedDate} />
                    </div>
                </div>
                <CalendarsStrip
                    data={data}
                    selectedCalendar={calendar}
                    onCalendarClick={onCalendarClick} />
                {view === "day" &&
                    <FlexibleOpacityTransition>
                        <SelectedDateStrip
                            selectedDate={selectedDate}
                            onCalendarClick={(cal) => {
                                setCalendar(cal);
                                setSelectedDate(new Date());
                            }}
                        />
                    </FlexibleOpacityTransition>
                }
                {view === "note" &&
                    <FlexibleOpacityTransition>
                        <CalendarDayView data={data} selectedDate={selectedDate} />
                    </FlexibleOpacityTransition>
                }
                {view === "month" &&
                    <FlexibleOpacityTransition>
                        <CalendarMonth
                            showInfo={showMonthInfo}
                            selectedDate={selectedDate}
                            size="big"
                            setSelectedDate={setSelectedDate}
                            monthIndex={new Date().getMonth()}
                            data={data} />
                        <span className="text-xs mt-4">
                            TODO: a combined view of all calendars? <br />
                            OR: Compared to last April...
                            Compared to previous month...
                            Compared to next month...

                            <br /> No! this should be a better ux for the year. so note should be
                            right here visible immediately plus colors!
                        </span>
                    </FlexibleOpacityTransition>
                }
                {view === "year" && (
                    <FlexibleOpacityTransition>
                        {yearMap.map((_, monthIndex) => {
                            return (
                                <CalendarMonth
                                    key={monthIndex}
                                    showInfo={showMonthInfo}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    data={data}
                                    monthIndex={monthIndex} />
                            )
                        })}
                    </FlexibleOpacityTransition>
                )}
                <CalendarsList
                    isOpen={view === "list"}
                    onClose={() => setView("year")}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setView("year");
                    }} />
            </div>
        </>
    );
}   