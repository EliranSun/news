import { Calendars } from "../constants"
import { CalendarMonth } from "../organism/CalendarMonth";
import PropTypes from "prop-types";
import { isSameDay } from "date-fns";

export const FeedView = ({
    selectedDate,
    selectedDateNote,
    updateColor,
    data,
    setSelectedDate,
    setSelectedDateNote,
    onNoteUpdate
}) => {
    return (
        <div className="w-full h-dvh overflow-y-auto">
            {Object.values(Calendars).map((calendar) => (
                <div key={calendar.key} className="border-b border-gray-200 py-8">
                    <h1 className="text-3xl font-bold">{calendar.name.toUpperCase()}</h1>
                    <CalendarMonth
                        selectedDate={selectedDate}
                        size="medium"
                        note={selectedDateNote}
                        calendar={calendar}
                        onColorSelect={updateColor}
                        data={data}
                        monthIndex={selectedDate.getMonth()}
                        onNoteUpdate={onNoteUpdate}
                        setSelectedDate={newDate => {
                            setSelectedDate(newDate);
                            const dayItem = data.find(item => isSameDay(item.date, newDate));
                            setSelectedDateNote(dayItem?.note || "");
                        }} />
                </div>
            ))}
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
