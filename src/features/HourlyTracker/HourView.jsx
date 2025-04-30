import { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { HourlyActivitiesButtons } from "./HourlyActivitiesButtons";
import { AddDayButton } from "./AddDayButton";
import { Column } from "./Column";
import { Hours, START_HOUR, END_HOUR } from "./constants";
import { saveData } from "./utils";
import { Day } from "./Day";

export function HourView() {
    const [sortBy, setSortBy] = useState('hour');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedHour, setSelectedHour] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {});

    useEffect(() => {
        saveData(data);
        console.log({ data });
    }, [data]);

    return (
        <div className="flex flex-col overflow-y-auto h-[calc(100vh-96px)] w-full space-y-2">
            <div className="flex overflow-y-auto h-[70vh]">
                <Column>
                    <div className={classNames("opacity-0 h-8 shrink-0 text-center border-b border-black")}>
                        X
                    </div>
                    {Hours.slice(START_HOUR, END_HOUR + 1).map((hour, index) =>
                        <div key={index} className="h-full text-[10px] flex text-center w-full px-1">
                            {hour.slice(0, 2)}
                        </div>)}
                </Column>
                {Object
                    .entries(data)
                    .sort((a, b) => {
                        return new Date(b[0]) - new Date(a[0]);
                    })
                    .map(([date, hours]) =>
                        <Day
                            key={date}
                            date={date}
                            hours={Hours.slice(START_HOUR, END_HOUR + 1)}
                            data={data}
                            sortBy={sortBy}
                            hoursData={hours}
                            selectedDate={selectedDate}
                            selectedHour={selectedHour}
                            setSelectedDate={setSelectedDate}
                            setSelectedHour={setSelectedHour}
                            setData={setData} />
                    )}
            </div>
            <HourlyActivitiesButtons
                data={data}
                selectedDate={selectedDate}
                selectedHour={selectedHour}
                setData={setData}
                setSelectedHour={setSelectedHour}
            />
            <AddDayButton />
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
    );
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
