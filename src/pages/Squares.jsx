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
    {
        "id": 7,
        "activity": "WebDev",
        "color": "🟧",
    },
];

const Hours = new Array(24 * 2).fill(0).map((_, index) => `${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`); // every 30 minutes
const START_HOUR = 7 * 2;
const END_HOUR = 21 * 2;

const Column = ({ children, size = "normal" }) => {
    return (
        <div className={classNames({
            "flex shrink-0 flex-col border-r border-black text-center overflow-hidden": true,
            "w-14": size === "normal" || !size,
            "w-10": size === "narrow",
        })}>
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
    setData,
    sortBy
}) => {
    const totalYellow = useMemo(() => {
        return Object.values(hours).filter((hour) => hour === 3).length;
    }, [hours]);

    const dataWithIndex = useMemo(() => {
        return Hours.slice(START_HOUR, END_HOUR + 1).map((hour, index) => ({ hour, index }));
    }, [hours]);

    console.log({
        dataWithIndex,
        hours,
        sortBy,
    });

    return (
        <Column key={date} size="narrow">
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
            {dataWithIndex
                .sort((a, b) => {
                    if (sortBy === 'hour') {
                        return a.hour - b.hour;
                    } else if (sortBy === 'color') {
                        return hours[b.index] - hours[a.index];
                    }
                })
                .map(({ hour, index }) =>
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedHour(index);
                            setSelectedDate(date);
                        }}
                        className={classNames({
                            "cursor-pointer h-6 text-black": true,
                            "bg-gray-100 dark:bg-gray-800": !hours?.[index],
                            "bg-purple-400": hours?.[index] === 1,
                            "bg-orange-900": hours?.[index] === 2,
                            "bg-yellow-400": hours?.[index] === 3,
                            "bg-green-400": hours?.[index] === 4,
                            "bg-blue-400": hours?.[index] === 5,
                            "bg-red-400": hours?.[index] === 6,
                            "bg-orange-400": hours?.[index] === 7,
                            "border border-black":
                                selectedHour === index && selectedDate === date
                        })}>
                    </div>
                )}
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
        <div className="flex flex-col overflow-y-auto h-screen p-4">
            <div className="flex font-mono">
                <Column>
                    <div className="text-center border-b border-black h-8">Hours</div>
                    {Hours.slice(START_HOUR, END_HOUR + 1).map((hour, index) =>
                        <div key={index} className="h-6 text-xs">{hour}</div>)}
                </Column>
                <div className="flex overflow-x-auto w-full">
                    {Object
                        .entries(data)
                        .sort((a, b) => {
                            return new Date(b[0]) - new Date(a[0]);
                        })
                        .map(([date, hours]) =>
                            <DayHoursColumn
                                key={date}
                                date={date}
                                data={data}
                                sortBy={sortBy}
                                hours={hours}
                                selectedDate={selectedDate}
                                selectedHour={selectedHour}
                                setSelectedDate={setSelectedDate}
                                setSelectedHour={setSelectedHour}
                                setData={setData} />
                        )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="">
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
                            {square.color} {square.activity}
                        </button>)}
                </div>
                <button onClick={() => {
                    setData({
                        ...data,
                        [selectedDate]: {
                            ...data[selectedDate],
                            [selectedHour]: 0
                        }
                    });
                }}>
                    Add today
                </button>
                <button onClick={() => {
                    setSortBy('color');
                }}>
                    Sort by color
                </button>
                <button onClick={() => {
                    const url = new URL(window.location.href);
                    url.pathname = "/";
                    window.location.href = url;
                }}>
                    Squares
                </button>
                <button onClick={() => {
                    const emojiText = exportToEmojiText(data);
                    // copy to clipboard
                    navigator.clipboard.writeText(emojiText);
                }}>
                    Export
                </button>
            </div>
        </div>
    )
}
