import { CalendarDayView } from "./CalendarDayView";
import { CalendarsList } from "./CalendarsList";
import { TextualDayView } from "./TextualDayView";
import { isSameDay } from "date-fns";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { HourView } from "../../HourlyTracker/HourView";
import { WeeklyListView } from "./WeeklyListView";
import { FeedView } from "./FeedView";
import { differenceInDays } from "date-fns";
import { loadFromStorage, saveToStorage } from "../utils";
import { YearView } from "./YearView";
import { MobileView } from "./MobileView";

export const Body = ({
    view,
    data,
    selectedDate,
    yearMap,
    setSelectedDate,
    setView,
    onCalendarClick,
    setSelectedDateNote,
    setData,
    calendar,
    selectedDateNote,
    onCalendarViewClick,
    onNoteViewClick
}) => {
    const daysSinceLastEntry = useMemo(() => {
        return data.length > 0 ? differenceInDays(new Date(), new Date(data[data.length - 1].date)) : 0;
    }, [data]);

    const updateData = useCallback(async ({ color, note, date, calendar: localCalendar }) => {
        try {
            const calendarData = await loadFromStorage(localCalendar.key);

            let newData;
            const formattedDate = date;

            if (color === 'clear') {
                newData = calendarData.filter(item => item.date.getTime() !== formattedDate.getTime());
            } else {
                const existingEntry = calendarData.find(item => isSameDay(item.date, formattedDate));
                if (existingEntry) {
                    newData = calendarData.map(item =>
                        isSameDay(item.date, formattedDate)
                            ? { ...item, color: color || item.color, note: note || item.note }
                            : item
                    );
                } else {
                    newData = [...calendarData, { date, color, note }];
                }
            }

            saveToStorage(localCalendar.key, newData);
            setData(newData);
            return newData;
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }, [saveToStorage, setData]);

    switch (view) {
        case "week":
            return (
                <WeeklyListView updateData={updateData} />
            );

        case "feed":
            return (
                <FeedView
                    selectedDate={selectedDate}
                    selectedDateNote={selectedDateNote}
                    data={data}
                    updateData={updateData}
                    setSelectedDate={setSelectedDate}
                    setSelectedDateNote={setSelectedDateNote}
                    onCalendarViewClick={onCalendarViewClick}
                    onNoteViewClick={onNoteViewClick}
                />
            );

        case "note":
            return (
                <CalendarDayView
                    data={data}
                    selectedDate={selectedDate} />
            );

        case "hour":
            return (
                <HourView />
            );

        case "list":
            return (
                <CalendarsList
                    isOpen
                    onClose={() => setView("month")}
                    onClick={(...params) => {
                        onCalendarClick(...params);
                        setView("month");
                    }} />
            );

        case "day":
            return (
                <TextualDayView
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            );

        case "year":
            if (window.innerWidth < 768) {
                return (
                    <MobileView
                        calendar={calendar}
                        selectedDate={selectedDate}
                        updateData={updateData}
                        yearMap={yearMap}
                        setSelectedDate={setSelectedDate}
                        daysSinceLastEntry={daysSinceLastEntry}
                        onCalendarClick={onCalendarClick}
                    />
                );
            }

            return (
                <YearView
                    calendar={calendar}
                    selectedDate={selectedDate}
                    updateData={updateData}
                    setSelectedDate={setSelectedDate}
                    daysSinceLastEntry={daysSinceLastEntry}
                    data={data}
                    onCalendarClick={onCalendarClick}
                />
            );

        // case "month":
        //     return (
        //         <CalendarMonth
        //             selectedDate={selectedDate}
        //             size="big"
        //             note={selectedDateNote}
        //             calendar={calendar}
        //             onColorSelect={updateColor}
        //             data={data}
        //             monthIndex={selectedDate.getMonth()}
        //             setSelectedDate={newDate => {
        //                 setSelectedDate(newDate);
        //                 const dayItem = data.find(item => isSameDay(item.date, newDate));
        //                 setSelectedDateNote(dayItem?.note || "");
        //             }}
        //             onNoteUpdate={onNoteUpdate} />
        //     );
    }
};

Body.propTypes = {
    view: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setView: PropTypes.func.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
    setSelectedDateNote: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    saveToStorage: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    selectedDateNote: PropTypes.string,
    yearMap: PropTypes.array.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};
