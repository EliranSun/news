import { Calendars } from "./constants";

export const CalendarsList = ({ onClick }) => {
    // Group calendars by category
    const groupedCalendars = Object.entries(Calendars).reduce((acc, [key, calendar]) => {
        if (!acc[calendar.category]) {
            acc[calendar.category] = [];
        }
        acc[calendar.category].push({
            ...calendar,
            key
        });
        return acc;
    }, {});

    return (
        <div className="fixed top-0 left-0 w-full border space-y-2
        border-black dark:border-white p-8 rounded-lg z-10
        h-full bg-white dark:bg-black backdrop-blur-sm">
            {Object.entries(groupedCalendars).map(([category, calendars]) => (
                <div key={category}>
                    <h3 className="text-xl font-bold">{category}</h3>
                    {calendars.map((calendar) => (
                        <div key={calendar.key} onClick={() => {
                            onClick(calendar.key, calendar);
                        }}>
                            {calendar.icon} {calendar.name}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
