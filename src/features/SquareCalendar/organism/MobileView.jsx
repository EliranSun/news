import PropTypes from "prop-types";
import { Calendars } from "../constants";
import { ColorsButtons } from "../molecules/ColorsButtons";
import { NoteModal } from "../molecules/NoteModal";
import { useMemo, useState } from "react";
import { Note, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { isSameDay, subDays, addDays } from "date-fns";
import { getColorsClassList } from "../utils";
import { CalendarGamification } from "../molecules/CalendarGamification";

const SingleCalendar = ({
    calendar,
    selectedDate,
    updateData
}) => {

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const [data, setData] = useState(() => {
        const storageData = localStorage.getItem(calendar.key);
        if (!storageData) return [];
        return JSON.parse(storageData);
    });

    const hasNote = useMemo(() => 
        data.find(item => isSameDay(item.date, selectedDate))?.note, [data, selectedDate]);
    
    const selectedColorClass = useMemo(() => {
        const selectedColor = data.find(item => isSameDay(item.date, selectedDate))?.color;
        return selectedColor ? getColorsClassList(selectedColor) : null;
    }, [data, selectedDate]);

    return (
        <>
            <div className="my-2 py-2 px-1 w-full">
                <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold uppercase heebo-900 my-2">
                    {calendar.icon} {calendar.name}
                </h2>
                <CalendarGamification calendar={calendar} variant="plain" />
                </div>
                <div className="flex gap-2 items-center">
                    <span
                        onClick={() => setIsNoteModalOpen(true)}
                        className="p-2 bg-white shadow rounded-full">
                        <Note size={24} weight={hasNote ? "fill" : "regular"} color="black" />
                    </span>
                    <ColorsButtons
                        display="compact"
                        calendar={calendar}
                        data={data}
                        selectedColorClass={selectedColorClass}
                        selectedDate={selectedDate}
                        onColorSelect={color => {
                            updateData({ color, date: selectedDate, calendar });
                            const storageData = localStorage.getItem(calendar.key);
                            if (!storageData) return [];
                            setData(storageData);
                        }}
                    />
                </div>
            </div>
            <NoteModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                calendar={calendar}
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

    return (
        <>
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <button onClick={() => setSelectedDate(subDays(selectedDate, 1))}>
                        <ArrowLeft size={24} weight="bold" />
                    </button>
                    <h1 className="text-2xl font-bold merriweather-black">
                        {selectedDate.toLocaleDateString("en-GB", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </h1>
                    <button onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                        <ArrowRight size={24} weight="bold" />
                    </button>
                </div>
                {Object.entries(Calendars).map(([key, calendar]) => {
                    return (
                        <SingleCalendar
                            key={key}
                            calendar={calendar}
                            selectedDate={selectedDate}
                            updateData={updateData}
                        />
                    );
                })}

            </div>
        </>
    );
};

MobileView.propTypes = {
    calendar: PropTypes.object.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    updateData: PropTypes.func.isRequired,
    yearMap: PropTypes.array.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    daysSinceLastEntry: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onCalendarClick: PropTypes.func.isRequired
};