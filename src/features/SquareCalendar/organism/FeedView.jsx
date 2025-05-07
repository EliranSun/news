import { Calendars, Categories } from "../constants"
import PropTypes from "prop-types";
import { useState } from "react";
import { DateStrip } from "../molecules/DateStrip";
import { Note } from "@phosphor-icons/react";
import { FeedItem } from "../molecules/FeedItem";

export const FeedView = ({
    selectedDateNote,
    setSelectedDateNote,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showNotes, setShowNotes] = useState(false);

    return (
        <div className="h-[calc(100vh-127px)] overflow-y-auto">
            {/* <div className="flex justify-between items-center font-serif">
                <h1 className="text-2xl font-bold">Blocks</h1>
            </div> */}
            <div className="flex gap-4 items-center sticky z-10 top-0  dark:bg-stone-900">
                <DateStrip
                    length={10}
                    type="month"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} />
            </div>
            <div className="flex gap-6 flex-nowrap w-[calc(100vw-16px*2)] overflow-x-auto snap-x">
                {Object.values(Categories).map((category) => (
                    <div key={category} className="w-[80vw] shrink-0 bg-stone-200 dark:bg-stone-700 p-2
                    rounded-xl h-[calc(100vh-180px)] overflow-y-auto snap-center">
                        <h1 className="text-base font-bold">{category.toUpperCase()}</h1>
                        {Object.values(Calendars).filter(calendar => calendar.category === category).map((calendar) => (
                            <div
                                key={calendar.key}
                                id={calendar.category.toLowerCase()}
                                className="bg-white dark:bg-stone-800
                     my-4 shadow-md rounded-xl p-4 w-full shrink-0">
                                <FeedItem
                                    calendar={calendar}
                                    showNote={showNotes}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    selectedDateNote={selectedDateNote}
                                    setSelectedDateNote={setSelectedDateNote}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* {Object.values(Calendars).sort((a, b) => a.category - b.category).map((calendar) => (
                <div
                    key={calendar.key}
                    id={calendar.category.toLowerCase()}
                    className="bg-white dark:bg-stone-800
                 my-4 shadow-md rounded-xl p-4">
                    <FeedItem
                        showNote={showNotes}
                        calendar={calendar}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedDateNote={selectedDateNote}
                        setSelectedDateNote={setSelectedDateNote}
                    />
                </div>
            ))} */}
        </div>
    )
}

FeedView.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    selectedDateNote: PropTypes.string.isRequired,
    updateColor: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    setSelectedDateNote: PropTypes.func.isRequired,
    onNoteUpdate: PropTypes.func.isRequired,
}
