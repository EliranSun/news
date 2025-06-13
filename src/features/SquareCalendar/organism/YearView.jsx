import { Header } from "../molecules/Header";
import { CalendarMonth } from "./CalendarMonth";
import { CalendarYearColorInfo } from "../molecules/CalendarYearColorInfo";
import { CalendarDayView as CalendarNotes } from "./CalendarDayView";
import { NoteModal } from "../molecules/NoteModal";
import { Info, Note } from "@phosphor-icons/react";
import { isSameDay } from "date-fns";
import { useState, useMemo } from "react";
import { ColorSelection } from "../molecules/ColorSelection";
import PropTypes from "prop-types";
import { CalendarsStrip } from "../molecules/CalendarsStrip";
const InfoStates = ["none", "days", "notes"];

export const YearView = ({
    calendar,
    selectedDate,
    daysSinceLastEntry,
    data,
    onCalendarClick,
    updateData,
    setSelectedDate,
    onlyCalendar = false,
}) => {
    const [infoStateIndex, setInfoStateIndex] = useState(0);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const hasNote = useMemo(() => {
        if (!data) return false;
        return data.find(item => isSameDay(item.date, selectedDate))?.note;
    }, [data, selectedDate]);

    if (!data) return null;

    return (
        <div className="sm:mx-2 sm:h-auto mx-auto overflow-y-auto sm:overflow-hidden">
            {onlyCalendar ? null : <div className="my-8">
                <Header
                    calendar={calendar}
                    selectedDate={selectedDate}
                    daysSinceLastEntry={daysSinceLastEntry}
                    data={data}>
                    <Info size={16} weight="bold" onClick={() =>
                        setInfoStateIndex((index) => (index + 1) % InfoStates.length)
                    } />
                </Header>
            </div>}
            <div className="flex flex-col sm:flex-row gap-4 justify-between p-2">
                {onlyCalendar ? null : <CalendarsStrip onCalendarClick={onCalendarClick} isVisible={true} />}
                <div className="sm:w-2/3">
                    <div className="overflow-y-auto grid grid-cols-3 md:grid-cols-4 gap-2">
                        {new Array(12).fill(0).map((_, monthIndex) => {
                            return (
                                <CalendarMonth
                                    key={monthIndex}
                                    isYearView={true}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    calendar={calendar}
                                    size="small"
                                    infoState={InfoStates[infoStateIndex]}
                                    data={data}
                                    monthIndex={monthIndex} />
                            )
                        })}
                    </div>

                    <CalendarYearColorInfo data={data} selectedDate={selectedDate} />

                    {onlyCalendar ? null : <div className="flex flex-col gap-2 my-4">
                        <h2 className="text-lg">
                            {selectedDate.toLocaleDateString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </h2>
                        <div className="flex w-full flex-wrap gap-2">
                            <ColorSelection
                                calendar={calendar}
                                data={data}
                                selectedDate={selectedDate}
                                updateData={updateData}

                                onColorSelect={color => updateData({ color, date: selectedDate, calendar })} />
                            <span
                                onClick={() => setIsNoteModalOpen(true)}
                                className="border-stone-300 dark:border-stone-700 h-10 w-20
                                 bg-stone-200 dark:bg-stone-800 rounded-md flex items-center justify-center p-2">
                                <Note size={24} weight={hasNote ? "fill" : "regular"} />
                            </span>
                        </div>
                    </div>}
                </div>

                <div className="sm:h-[calc(100vh-80px)] sm:w-1/3 pb-10 sm:overflow-y-scroll sm:px-4">
                    <CalendarNotes
                        data={data}
                        selectedDate={selectedDate} />
                </div>
            </div>
            <NoteModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                calendar={calendar}
                updateData={updateData}
                date={selectedDate} />

        </div>
    );
};

YearView.propTypes = {
    calendar: PropTypes.object.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    daysSinceLastEntry: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onCalendarClick: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};