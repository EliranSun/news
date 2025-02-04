import { useState, useEffect, useCallback } from 'react';
import { sub, format } from 'date-fns';

const getTimeLeft = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day);
    const now = new Date();
    const diffTime = targetDate - now;

    if (diffTime > 0) {
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
        const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

        return { days: diffDays, hours: diffHours, minutes: diffMinutes };
    }

    return { days: 0, hours: 0, minutes: 0 };
}

export const Clock = () => {
    const [fontName, setFontName] = useState("space-grotesk-700");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const [date, setDate] = useState('');

    const handleDateChange = useCallback((event) => {
        const newDate = event.target.value;
        const query = new URLSearchParams(window.location.search);
        query.set('date', newDate);
        window.history.replaceState(null, '', '?' + query.toString());

        const timeLeft = getTimeLeft(newDate);
        setTimeLeft(timeLeft);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const dateParam = query.get('date') || "2025-03-31";

        if (dateParam) {
            setDate(dateParam);
            const timeLeft = getTimeLeft(dateParam);
            setTimeLeft(timeLeft);
        }

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                let { days, hours, minutes } = prevTime;

                if (minutes > 0) {
                    minutes -= 1;
                } else if (hours > 0) {
                    hours -= 1;
                    minutes = 59;
                } else if (days > 0) {
                    days -= 1;
                    hours = 23;
                    minutes = 59;
                }

                return { days, hours, minutes };
            });
        }, 60 * 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    console.log(timeLeft);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold space-grotesk-700 text-amber-400">CSS Demo</h1>
            <div
                onClick={() => setFontName(fontName === "space-grotesk-700" ? "font-mono" : "space-grotesk-700")}
                className={`font-extrabold ${fontName} text-[20vw] xl:text-[14rem]`}>
                {`${String(timeLeft.days).padStart(2, '0')}:${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}`}
            </div>
            <div className="flex gap-1 w-20 flex-wrap -rotate-90 scale-x-[-1]">
                {new Array(100).fill(null).map((_, index) => (
                    <div key={index} className={`size-2 text-xs ${index < (100 - timeLeft.days)
                        ? 'bg-black dark:bg-white'
                        : 'bg-black/40 dark:bg-white/40'}`}>
                            {format(sub(new Date(2025, 2, 31), { days: index + 1 }), "d")}
                    </div>
                ))}
            </div>
            <input
                defaultValue={date}
                type="date"
                className="text-center text-xs fixed top-10"
                onChange={handleDateChange} />
        </div>
    );
};
