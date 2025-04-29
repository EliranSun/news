import { useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { HourlyActivitiesMap } from "../constants";
import { contrastColor } from "../utils";

const Hours = new Array(24 * 4)
    .fill(0)
    .map((_, index) => {
        const hour = Math.floor(index / 4);
        const minutes = (index % 4) * 15;
        return `${hour}:${minutes.toString().padStart(2, '0')}`;
    }); // every 15 minutes
const START_HOUR = 7 * 4;
const END_HOUR = 21 * 4;

const Column = ({ children, size = "normal" }) => {
    return (
        <div className={classNames({
            // "h-full": true,
            "flex shrink-0 flex-col border-r border-black text-center": true,
            "w-14": size === "normal" || !size,
            "w-fit": size === "narrow",
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
        return `${date}: ${Object.entries(hours).map(([hour, id]) => HourlyActivitiesMap.find((square) => square.id === id)?.color).join('')}`;
    }).join('\n');
};

const size = "size-6";

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

    return (
        <Column key={date} size="narrow">
            {/* <input
                type="date"
                value={date}
                className={classNames(size, "text-center border-b border-black")}
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
                }} /> */}
            <span className="text-xs flex flex-col items-center justify-center">
                <span>{date.split('-').at(-1)}</span>
                <span>{date.split('-').at(1)}</span>
            </span>
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
                        className={classNames(size, {
                            "cursor-pointer text-black outline outline-2 outline-black": true,
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
            <div className="text-xs">
                {totalYellow * 0.25}
            </div>
        </Column>
    )
}


export function HourView() {
    const [sortBy, setSortBy] = useState('hour');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedHour, setSelectedHour] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {});

    useEffect(() => {
        saveData(data);
        console.log(data);
    }, [data]);

    return (
        <div className="flex flex-col overflow-y-auto h-[calc(100vh-96px)] w-full space-y-2">
            <div className="flex justify-start gap-2">
                {HourlyActivitiesMap.map((square) =>
                    <button
                        key={square.id}
                        style={{ color: contrastColor({ bgColor: square.hex }) }}
                        className={classNames(square.color, {
                            "uppercase": true,
                            "size-10 rounded-full text-xs flex items-center justify-center": true,
                        })}
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
                        {square.activity.slice(0, 3)}
                    </button>)}
            </div>
            <div className="flex font-mono h-[calc(100vh-192px)] overflow-y-auto border border-red-500">
                <Column>
                    <div className={classNames("h-8 shrink-0 text-center border-b border-black")}>X</div>
                    {Hours.slice(START_HOUR, END_HOUR + 1).map((hour, index) =>
                        <div key={index} className="h-6 text-xs shrink-0 flex items-center justify-center">
                            {hour}
                        </div>)}
                </Column>
                <div className="">
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
            {/* <div className="flex flex-col gap-2">
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
            </div> */}
        </div>
    )
}

HourView.propTypes = {
    data: PropTypes.object.isRequired,
    selectedDate: PropTypes.string.isRequired,
    selectedHour: PropTypes.number.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    setSelectedHour: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
};
