import sleepData from "../data/sleep.json";
import classNames from "classnames";
import PropTypes from "prop-types";
import { format } from 'date-fns';

const days = new Array(31).fill(0).map((_, index) => ({
    number: index + 1,
    name: format(new Date(new Date().setMonth(new Date().getMonth() - 1, index + 1)), 'EEE').slice(0, 2)
}));

const Row = ({ item }) => {
    const totalREM = Number(item.REM.split(":")[0]) * 60 + Number(item.REM.split(":")[1]);
    const totalDeep = Number(item.deep.split(":")[0]) * 60 + Number(item.deep.split(":")[1]);

    // Calculate total sleep duration
    const [sleepHour, sleepMinute] = item.sleep_hour.split(":").map(Number);
    const [wakeHour, wakeMinute] = item.wake_hour.split(":").map(Number);

    const sleepTime = new Date();
    const wakeTime = new Date();
    sleepTime.setHours(sleepHour, sleepMinute, 0, 0);
    wakeTime.setHours(wakeHour, wakeMinute, 0, 0);

    let totalSleep = (wakeTime - sleepTime) / (1000 * 60); // Convert milliseconds to minutes
    if (totalSleep < 0) {
        totalSleep += 24 * 60; // Adjust for overnight sleep
    }

    const totalSleepWithoutREMAndDeep = totalSleep - totalREM - totalDeep;

    const coffee = item.coffee ? "☕" : "";
    const magnesium = item.magnesium ? "💊" : "";
    const alcohol = item.alcohol ? "🍷" : "";
    const screen = item.screen ? "📱" : "";
    const workout = item.workout ? "🏃‍♂️" : "";
    const shower = item.shower ? "🚿" : "";
    const poop = item.poop ? "💩" : "";
    const social = item.social ? "👯‍♂️" : "";

    const adjustedHour = sleepHour >= 12 ? sleepHour - 24 : sleepHour;
    const totalMinutes = adjustedHour * 60 + sleepMinute;

    const baseOffset = 60;
    const maxRange = 200;

    const widthPercent = Math.max(0, Math.min(1, (totalMinutes + baseOffset) / maxRange)) * 100;

    return (
        <div className={classNames("w-screen max-w-screen-md flex gap-2 relative")}>
            <div className="flex gap-2">
                <div className="flex gap-2 w-4">{coffee}</div>
                <div className="flex gap-2 w-4">{magnesium}</div>
                <div className="flex gap-2 w-4">{alcohol}</div>
                <div className="flex gap-2 w-4">{screen}</div>
                <div className="flex gap-2 w-4">{workout}</div>
                <div className="flex gap-2 w-4">{shower}</div>
                <div className="flex gap-2 w-4">{poop}</div>
                <div className="flex gap-2 w-4">{social}</div>
                <div className="flex gap-2 w-40">{item.last_meal_description.join(", ")}</div>
            </div>
            <div className={classNames("top-0 left-0 w-4 h-full shrink-0", {
                "bg-red-500": item.feeling === "tired",
                "bg-orange-500": item.feeling === "foggy",
                "bg-yellow-500": item.feeling === "exhausted",
                "bg-green-500": item.feeling === "rested",
                "bg-blue-500": item.feeling === "refreshed",
                "bg-purple-500": item.feeling === "sharp",
            })}></div>
            <div className={classNames("w-14 h-full shrink-0", {
                // "text-red-500": item.feeling === "tired",
                // "text-orange-500": item.feeling === "foggy",
                // "text-yellow-500": item.feeling === "exhausted",
                // "text-green-500": item.feeling === "rested",
                // "text-blue-500": item.feeling === "refreshed",
                // "text-purple-500": item.feeling === "sharp",
            })}>{item.feeling}</div>
            <div style={{ width: `${widthPercent}%` }}>{item.sleep_hour}</div>
            <div
                className="flex relative">
                <div
                    className={classNames("top-0 left-0 h-full bg-cyan-300 text-black")}
                    style={{
                        width: `${totalREM / 20}rem`,
                    }}>
                    {item.REM}
                </div>
                <div
                    className={classNames("top-0 left-0 h-full bg-purple-800 text-white")}
                    style={{
                        width: `${totalDeep / 20}rem`,
                    }}>
                    {item.deep}
                </div>
                <div
                    className={classNames("top-0 left-0 h-full bg-blue-500 text-black")}
                    style={{
                        width: `${totalSleepWithoutREMAndDeep / 40}rem`,
                    }}>
                </div>
                <div className="absolute top-0 right-0 w-5 text-center">{Math.round(totalSleep / 60)}</div>
            </div>
            <div style={{
            }}>{item.wake_hour}</div>
        </div>
    );
};

Row.propTypes = {
    item: PropTypes.object.isRequired,
};

export default function SleepGraph() {
    return (
        <div>
            <h1 className="text-5xl font-bold merriweather-black my-4">Sleep Graph</h1>
            {days.map((day) => {
                return (
                    <div key={day} className={classNames("flex text-xs gap-px even:bg-gray-500 even:dark:bg-gray-800", {
                        "border-b border-gray-200": day.name === "Sa"
                    })}>
                        <div className="font-mono w-8 text-center">{day.number}{day.name.slice(0, 1)}</div>
                        {sleepData.filter((item) => {
                            const date = new Date(item.date);
                            return date.getDate() === day.number;
                        }).map((item) => (
                            <Row
                                key={item.date}
                                item={item} data-date={item.date} />
                        ))}
                    </div>
                )
            })}
        </div>
    );
}
