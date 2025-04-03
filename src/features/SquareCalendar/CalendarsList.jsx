import { Calendars } from "./constants";

export const CalendarsList = () => {
    // Group calendars by category
    const groupedCalendars = Object.values(Calendars).reduce((acc, calendar) => {
        if (!acc[calendar.category]) {
            acc[calendar.category] = [];
        }
        acc[calendar.category].push(calendar);
        return acc;
    }, {});

    return (
        <div>
            {Object.entries(groupedCalendars).map(([category, calendars]) => (
                <div key={category}>
                    <h3 style={{ textTransform: 'capitalize' }}>{category}</h3>
                    {calendars.map((calendar) => (
                        <div key={calendar.key}>{calendar.name}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};
