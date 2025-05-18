import { Calendars, Categories } from "../constants"
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DateStrip } from "../molecules/DateStrip";
import { FeedItem } from "../molecules/FeedItem";
import classNames from "classnames";
import { CategoryStrip } from "../molecules/CategoryStrip";
import { getColorsClassList, loadFromStorage, isSameDay, saveToStorage } from "../utils";

export const FeedView = ({
    selectedDateNote,
    setSelectedDateNote,
    updateData,
    onCalendarViewClick,
    onNoteViewClick
}) => {
    const [selectedCategory, setSelectedCategory] = useState(Categories.Self);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCalendar, setSelectedCalendar] = useState(Object.values(Calendars)
        .find(calendar => calendar.category === selectedCategory));
    const [note, setNote] = useState(loadFromStorage(selectedCalendar.key).find(item => isSameDay(item.date, selectedDate))?.note || "");
    const [colorChanged, setColorChanged] = useState(0);

    useEffect(() => {
        const calendarData = loadFromStorage(selectedCalendar.key);
        setNote(calendarData.find(item => isSameDay(item.date, selectedDate))?.note || "");
    }, [selectedCalendar, selectedDate]);

    return (
        <div className="w-screen h-[calc(100vh-127px)] overflow-y-auto">
            <div className="flex flex-col gap-4 pb-2 items-center overflow-x-hidden sticky top-0 z-20 w-full">
                <DateStrip
                    length={10}
                    type="month"
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate} />
                <CategoryStrip onCategoryClick={setSelectedCategory} />
            </div>
            <div className="flex flex-col gap-4">
                {Object.values(Categories)
                    .filter(category => category === selectedCategory)
                    .map((category) => (
                        <div key={category} className={classNames({
                            "bg-stone-200 ": true,
                            "dark:bg-stone-700": true,
                            "px-2 py-1": true,
                            "rounded-xl": true,
                            "snap-center": true,
                        })}>
                            <h1 className="text-base font-bold p-2">
                                {category.toUpperCase()}
                            </h1>
                            <div className="grid grid-cols-2 gap-2 overflow-y-auto h-fit pb-64">
                                {Object.values(Calendars).filter(calendar => calendar.category === category)
                                    .map((calendar) => (
                                        <div
                                            key={calendar.key}
                                            id={calendar.category.toLowerCase()}
                                            className="bg-white dark:bg-stone-800 shadow-md rounded-xl p-2">
                                            <FeedItem
                                                calendar={calendar}
                                                colorChanged={colorChanged}
                                                onCalendarViewClick={calendar => onCalendarViewClick(calendar, selectedDate)}
                                                onNoteViewClick={calendar => onNoteViewClick(calendar, selectedDate)}
                                                setSelectedCalendar={setSelectedCalendar}
                                                isSelected={selectedCalendar.name === calendar.name}
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
            <div className={classNames("rounded-xl shadow-lg bg-white dark:bg-stone-900", {
                "fixed bottom-32 left-0 z-10 inset-x-0 m-auto": true,
                "p-4": true,
                "w-[94vw] mx-auto flex flex-col gap-4 h-fit ": true,
            })}>
                <div className="flex flex-wrap gap-2">
                    {selectedCalendar.colors?.map(color => {
                        return (
                            <div key={color}
                                className={classNames(getColorsClassList(color), {
                                    "size-10 rounded-full shrink-0": true,
                                    "text-xs flex justify-center items-center": true,
                                })}
                                onClick={() => {
                                    let data = loadFromStorage(selectedCalendar.key);
                                    if (data.find(item => isSameDay(item.date, selectedDate))) {
                                        data = data.map(item => {
                                            if (isSameDay(item.date, selectedDate)) {
                                                return { ...item, color };
                                            }
                                            return item;
                                        });
                                    } else {
                                        data.push({ date: selectedDate, color });
                                    }

                                    saveToStorage(selectedCalendar.key, data);
                                    setColorChanged(colorChanged + 1);
                                }}>
                                {selectedCalendar.legend?.find(legend => legend.color === color)?.name}
                            </div>
                        );
                    })}
                </div>
                <textarea
                    className="rounded-xl px-4 py-3"
                    placeholder="Add a note"
                    value={note}
                    onChange={event => setNote(event.target.value)}
                />
                <button
                    className="rounded-xl p-2 bg-blue-500 text-white"
                    onClick={() => {
                        let data = loadFromStorage(selectedCalendar.key);
                        if (data.find(item => isSameDay(item.date, selectedDate))) {
                            data = data.map(item => {
                                if (isSameDay(item.date, selectedDate)) {
                                    return { ...item, note };
                                }
                                return item;
                            });
                        } else {
                            data.push({ date: selectedDate, note });
                        }

                        saveToStorage(selectedCalendar.key, data);
                    }}>
                    SAVE NOTE
                </button>
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
