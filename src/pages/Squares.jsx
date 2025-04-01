import { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
const SquareMap = [
    {
        "id": 1,
        "activity": "coffee & chill",
        "color": "🟪",
    },
    {
        "id": 2,
        "activity": "Bonella",
        "color": "🟫",
    },
    {
        "id": 3,
        "activity": "CSS",
        "color": "🟨",
    },
    {
        "id": 4,
        "activity": "Read",
        "color": "🟩",
    },
    {
        "id": 5,
        "activity": "Media",
        "color": "🟦",
    },
    {
        "id": 6,
        "activity": "Prep",
        "color": "🟥",
    },
];

const Hours = new Array(24 * 2).fill(0).map((_, index) => `${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`); // every 30 minutes
const START_HOUR = 7 * 2;
const END_HOUR = 19 * 2;

const Column = ({ children }) => {
    return (
        <div className="flex flex-col border-r border-black w-14 text-center overflow-hidden">
            {children}
        </div>
    )
};

const saveData = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
};

const exportToEmojiText = (data) => {
    return Object.entries(data).map(([date, hours]) => {
        return `${date}: ${Object.entries(hours).map(([hour, id]) => SquareMap.find((square) => square.id === id)?.color).join('')}`;
    }).join('\n');
};

const DayHoursColumn = ({
    data,
    date,
    hours,
    selectedDate,
    selectedHour,
    setSelectedDate,
    setSelectedHour,
    setData
}) => {
    const totalYellow = useMemo(() => {
        return Object.values(hours).filter((hour) => hour === 3).length;
    }, [hours]);

    return (
        <Column key={date}>
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    const previousDate = date;
                    const newDate = e.target.value;
                    setSelectedDate(newDate);
                    const newData = {
                        ...data,
                        [newDate]: previousDate ? data[previousDate] : {}
                    };

                    delete newData[previousDate];
                    setData(newData);
                }}
                className="text-center border-b border-black h-8" />
            {Hours.slice(START_HOUR, END_HOUR + 1).map((hour, index) =>
                <div
                    key={index}
                    onClick={() => {
                        setSelectedHour(index);
                        setSelectedDate(date);
                    }}
                    className={classNames({
                        "cursor-pointer h-6": true,
                        "bg-gray-100": !hours?.[index],
                        "bg-purple-400": hours?.[index] === 1,
                        "bg-orange-400": hours?.[index] === 2,
                        "bg-yellow-400": hours?.[index] === 3,
                        "bg-green-400": hours?.[index] === 4,
                        "bg-blue-400": hours?.[index] === 5,
                        "bg-red-400": hours?.[index] === 6,
                        "border border-black": selectedHour === index && selectedDate === date
                    })}></div>)}
            <div>
                {totalYellow * 0.5}h
            </div>
        </Column>
    )
}


export default function Squares() {
    const [sortBy, setSortBy] = useState('hour');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedHour, setSelectedHour] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {});

    useEffect(() => {
        saveData(data);
        console.log(data);
    }, [data]);

    return (
        <>
            <div className="flex font-mono">
                <Column>
                    <div className="text-center border-b border-black h-8">Hours</div>
                    {Hours.slice(START_HOUR, END_HOUR).map((hour, index) =>
                        <div key={index} className="h-6">{hour}</div>)}
                </Column>
                {Object
                    .entries(data)
                    .sort((a, b) => {
                        if (sortBy === 'hour') {
                            return new Date(b[0]) - new Date(a[0]);
                        } else if (sortBy === 'color') {
                            return b[1][selectedHour] - a[1][selectedHour];
                        }
                    })
                    .map(([date, hours]) =>
                        <DayHoursColumn
                            key={date}
                            date={date}
                            data={data}
                            hours={hours}
                            setSelectedDate={setSelectedDate}
                            setSelectedHour={setSelectedHour}
                            setData={setData} />
                    )}
                <Column>
                    <button onClick={() => {
                        const lastWeek = new Date(Object.keys(data).at(-1));
                        lastWeek.setDate(lastWeek.getDate() - 7);
                        setData({
                            ...data,
                            [lastWeek.toISOString().split('T')[0]]: data[lastWeek.toISOString().split('T')[0]] || {}
                        })
                    }}>+</button>
                </Column>
            </div>
            <div>
                {SquareMap.map((square) =>
                    <button
                        key={square.id}
                        className="text-xs"
                        onClick={() => {
                            setData({
                                ...data,
                                [selectedDate]: {
                                    ...data[selectedDate],
                                    [selectedHour]: square.id
                                }
                            });

                            setSelectedHour(selectedHour + 1);
                        }}>
                        {square.color} - {square.activity}
                    </button>)}
            </div>
            <button onClick={() => {
                setSortBy('color');
            }}>
                Sort by color
            </button>
            <button onClick={() => {
                const emojiText = exportToEmojiText(data);
                // copy to clipboard
                navigator.clipboard.writeText(emojiText);
            }}>
                Export
            </button>
        </>
    )
}
