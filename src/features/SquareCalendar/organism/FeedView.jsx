import { Calendars, Categories } from "../constants"
import PropTypes from "prop-types";
import { useState } from "react";
import { DateStrip } from "../molecules/DateStrip";
import { FeedItem } from "../molecules/FeedItem";

export const FeedView = ({
    selectedDateNote,
    setSelectedDateNote,
    updateData
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showNotes] = useState(false);

    return (
        <div className="w-screen h-[calc(100vh-127px)] overflow-y-auto">
            {/* <div className="flex justify-between items-center font-serif">
                <h1 className="text-2xl font-bold">Blocks</h1>
            </div> */}
            <div className="flex gap-4 pb-4 items-center sticky top-0 bg-white dark:bg-stone-900">
                <DateStrip
                    length={10}
                    type="month"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} />
            </div>
            <div className="flex flex-nowrap w-[calc(100vw-16px*2)] overflow-x-auto snap-x">
                {Object.values(Categories).map((category) => (
                    <div key={category} className="w-[90vw] shrink-0 bg-stone-200 
                    overflow-y-auto
                    h-[calc(100vh-96px-50px-32px-12px)] dark:bg-stone-700 p-2
                    rounded-xl snap-center mx-10">
                        <h1 className="text-base font-bold px-2">
                            {category.toUpperCase()}
                        </h1>
                        <div className="grid grid-cols-2">
                        {Object.values(Calendars).filter(calendar => calendar.category === category).map((calendar) => (
                            <div
                                key={calendar.key}
                                id={calendar.category.toLowerCase()}
                                className="bg-white dark:bg-stone-800 my-2 shadow-md rounded-xl p-2 w-full">
                                <FeedItem
                                    calendar={calendar}
                                    showNote={showNotes}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    selectedDateNote={selectedDateNote}
                                    setSelectedDateNote={setSelectedDateNote}
                                    updateData={updateData}
                                />
                            </div>
                        ))}
                        </div>
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
    selectedDateNote: PropTypes.string,
    setSelectedDateNote: PropTypes.func.isRequired,
}
