import { useState, useEffect, useCallback } from 'react';

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
        const dateParam = query.get('date');

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

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="font-extrabold font-mono text-9xl">
                {`${String(timeLeft.days).padStart(2, '0')}:${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}`}
            </div>
            <input
                defaultValue={date}
                type="date"
                className="text-center text-xs fixed top-10"
                onChange={handleDateChange} />
        </div>
    );
};
