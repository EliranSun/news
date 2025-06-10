import { Header } from "../molecules/Header";
import { CalendarNavigation } from "../molecules/CalendarNavigation";
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
    yearMap,
}) => {
    const [infoStateIndex, setInfoStateIndex] = useState(0);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const hasNote = useMemo(() => {
        return data.find(item => isSameDay(item.date, selectedDate))?.note;
    }, [data, selectedDate]);

    return (
        <div className="sm:mx-2 sm:w-[calc(100vw-1rem)] max-w-screen-xl mx-auto sm:px-8">
            <div className="my-4">
                <Header
                    calendar={calendar}
                    selectedDate={selectedDate}
                    daysSinceLastEntry={daysSinceLastEntry}
                    data={data}>
                    <Info size={16} weight="bold" onClick={() =>
                        setInfoStateIndex((index) => (index + 1) % InfoStates.length)
                    } />
                </Header>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <CalendarsStrip onCalendarClick={onCalendarClick} isVisible={true} />
                {/* <CalendarNavigation onCalendarClick={onCalendarClick} /> */}
                <div className="max-w-full md:max-w-2/3">
                    <div className="h-96 overflow-y-auto sm:h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {yearMap.map((_, monthIndex) => {
                            return (
                                <CalendarMonth
                                    key={monthIndex}
                                    isYearView={true}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    calendar={calendar}
                                    infoState={InfoStates[infoStateIndex]}
                                    data={data}
                                    monthIndex={monthIndex} />
                            )
                        })}
                    </div>

                    <CalendarYearColorInfo data={data} selectedDate={selectedDate} />

                    <div className="flex flex-col gap-2 my-4">
                        <h2 className="text-lg ">
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
                                onColorSelect={color => updateData({ color, date: selectedDate, calendar })} />
                            <span
                                onClick={() => setIsNoteModalOpen(true)}
                                className="border-stone-300 dark:border-stone-700 h-10 w-20
                                 bg-stone-200 dark:bg-stone-800 rounded-md flex items-center justify-center p-2">
                                <Note size={24} weight={hasNote ? "fill" : "regular"} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="order-3 w-full md:w-1/3 md:h-[calc(100vh-80px)] pb-10 md:overflow-y-scroll">
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
    yearMap: PropTypes.array.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};