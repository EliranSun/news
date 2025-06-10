import { Calendars } from "../constants";
import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const CalendarNames = Object.entries(Calendars).map(([_, calendar]) => calendar.name);

export const CalendarNavigation = ({ onCalendarClick }) => {
    const [activeCalendarIndex, setActiveCalendarIndex] = useState(0);
    const [activeCalendar, setActiveCalendar] = useState(CalendarNames[0]);

    const navigate = useCallback((index) => {
        const newIndex = activeCalendarIndex + index;
        if (newIndex < 0 || newIndex >= CalendarNames.length) return;

        const newCalendar = CalendarNames[newIndex];
        setActiveCalendarIndex(newIndex);
        setActiveCalendar(newCalendar);
        const nextCalendar = Object.entries(Calendars).find(([_, calendar]) => calendar.name === newCalendar)[1];
        onCalendarClick(nextCalendar);
    }, [activeCalendarIndex, onCalendarClick]);

    const navigateBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const navigateForward = useCallback(() => {
        navigate(1);
    }, [navigate]);

    return (
        <div className="flex gap-2 items-center">
            <button onClick={navigateBack}>
                <ArrowLeft size={16} />
            </button>
            <span>{activeCalendar}</span>
            <button onClick={navigateForward}>
                <ArrowRight size={16} />
            </button>
        </div>
    );
};