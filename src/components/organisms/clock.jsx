import { useState, useEffect } from 'react';

export const Clock = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const dateParam = query.get('date');

        if (dateParam) {
            const [day, month, year] = dateParam.split('-').map(Number);
            const targetDate = new Date(year + 2000, month - 1, day); // Adjust for 2-digit year
            const now = new Date();

            const diffTime = targetDate - now;
            if (diffTime > 0) {
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
                const diffMinutes = Math.floor((diffTime / (1000 * 60)) % 60);

                setTimeLeft({ days: diffDays, hours: diffHours, minutes: diffMinutes });
            }
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
        <div className="text-center 
        font-extrabold font-mono text-9xl
        h-screen flex justify-center items-center">
            {`${String(timeLeft.days).padStart(2, '0')}:${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}`}
        </div>
    );
};
