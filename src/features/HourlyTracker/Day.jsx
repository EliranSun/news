import { useMemo } from "react";
import classNames from "classnames";
import { Hours, START_HOUR, END_HOUR } from "./constants";
import PropTypes from "prop-types";
import { Column } from "./Column";

export const Day = ({
    date,
    hours,
    hoursData,
    selectedDate,
    selectedHour,
    setSelectedDate,
    setSelectedHour,
    data,
    setData,
    sortBy
}) => {
    const totalYellow = useMemo(() => {
        return Object.values(hoursData).filter((hour) => hour === 3).length;
    }, [hoursData]);

    const dataWithIndex = useMemo(() => {
        return Hours.slice(START_HOUR, END_HOUR + 1).map((hour, index) => ({ hour, index }));
    }, []);

    console.log({ dataWithIndex });
    /**
     * 
     * dataWithIndex
                    .sort((a, b) => {
                        if (sortBy === 'hour') {
                            return a.hour - b.hour;
                        } else if (sortBy === 'color') {
                            return hours[b.index] - hours[a.index];
                        }
                    })
     */

    return (
        <Column size="full">
            <span className="text-xs flex flex-col items-center justify-center">
                <span>{date.split('-').at(-1)}</span>
                <span>{date.split('-').at(1)}</span>
            </span>
            {new Array(hours.length * 4).fill(null).map((_, index) =>
                <div
                    key={index}
                    onClick={() => {
                        setSelectedHour(index);
                        setSelectedDate(date);
                    }}
                    className={classNames({
                        "w-full h-6 border border-black/60": true,
                        "cursor-pointer text-black": true,
                        "bg-gray-100 dark:bg-gray-800": !hoursData?.[index],
                        "bg-purple-400": hoursData?.[index] === 1,
                        "bg-orange-900": hoursData?.[index] === 2,
                        "bg-yellow-400": hoursData?.[index] === 3,
                        "bg-green-400": hoursData?.[index] === 4,
                        "bg-blue-400": hoursData?.[index] === 5,
                        "bg-red-400": hoursData?.[index] === 6,
                        "bg-orange-400": hoursData?.[index] === 7,
                        "border-dashed":
                            selectedHour === index && selectedDate === date
                    })}>
                </div>
            )}
            <div className="text-xs" >
                {totalYellow * 0.25}
            </div>
        </Column>
    )
}

Day.propTypes = {
    data: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    hours: PropTypes.object.isRequired,
    hoursData: PropTypes.object.isRequired,
    selectedDate: PropTypes.string.isRequired,
    selectedHour: PropTypes.number.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    setSelectedHour: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
}
