import { useState } from "react";
import { FeedView } from "./FeedView";
import { WeeklyListView } from "./WeeklyListView";
import { ViewToggle } from "./ViewToggle";

export const CalendarContainer = ({
    selectedDate,
    selectedDateNote,
    updateColor,
    data,
    setSelectedDate,
    setSelectedDateNote,
    onNoteUpdate,
}) => {
    const [currentView, setCurrentView] = useState("feed");

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    return (
        <div>
            <ViewToggle
                currentView={currentView}
                onViewChange={handleViewChange}
            />

            {currentView === "feed" ? (
                <FeedView
                    selectedDate={selectedDate}
                    selectedDateNote={selectedDateNote}
                    updateColor={updateColor}
                    data={data}
                    setSelectedDate={setSelectedDate}
                    setSelectedDateNote={setSelectedDateNote}
                    onNoteUpdate={onNoteUpdate}
                />
            ) : (
                <WeeklyListView />
            )}
        </div>
    );
}; 