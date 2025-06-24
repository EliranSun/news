import { Calendars } from "./constants";
import { useMemo } from "react";
import { loadFromStorage } from "./utils";
import { isSameDay } from "date-fns"

export default function NotesByDayView() {
        const allCalendarData = useMemo(() => {
                return Object.values(Calendars).map((calendar) => {
                        return loadFromStorage(calendar.key).map(item => ({
                                ...item,
                                calendar: calendar.name
                        }));
                }).flat();
        }, []);

        console.log({ allCalendarData });

        return (
                <div className="font-mono p-8 space-y-8 h-screen w-screen overflow-y-auto">
                        {new Array(365).fill(0).map((_, index) => {
                                return (
                                        <div key={index}>
                                                <h1 className="text-xl font-bold">
                                                        {new Date(2025, 0, index + 1).toLocaleDateString("en-US", {
                                                                weekday: 'long',
                                                                month: 'long',
                                                                day: 'numeric'
                                                        })}
                                                </h1>
                                                <div className="flex flex-col gap-2">
                                                        {allCalendarData
                                                                .filter(item => {
                                                                        return item.note && isSameDay(item.date, new Date(2025, 0, index + 1));
                                                                })
                                                                .map((item, index) => {
                                                                        return <p key={index}>{item.calendar}: {item.note}</p>
                                                                })}
                                                </div>
                                        </div>
                                )
                        })}
                </div>
        );
}