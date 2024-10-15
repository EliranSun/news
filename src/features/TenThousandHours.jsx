import classNames from "classnames";
import { useState } from "react";

const tenThousandHoursArray = new Array(10000).fill(0);

export const TenThousandHours = () => {
    const [numberOfColumns, setNumberOfColumns] = useState(7);
    const [hours, setHours] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return parseInt(searchParams.get('hours')) || 10;
    });

    // const numberOfColumns = Math.ceil(window.innerWidth / (12 + 4 + 1));
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-4 mb-4">
                <input
                    type="number"
                    value={hours}
                    className="text-center text-2xl 
                py-4 border border-slate-700 
                size-16 
                rounded-full m-4"
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setHours(newValue);
                        const searchParams = new URLSearchParams(window.location.search);
                        searchParams.set('hours', newValue);
                        window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
                    }} />
                <div>
                    <h1>{numberOfColumns} days a week</h1>
                    <h1>{numberOfColumns} hour a day</h1>
                </div>
            </div>
            <div
                style={{ width: `${numberOfColumns * 12 + numberOfColumns * 4}px` }}
                className="relative flex items-center justify-start flex-wrap">
                {new Array(100).fill(0).map((_, index) => (
                    <h2
                        key={index}
                        style={{ top: `${12 * 52 * index}px` }}
                        className="absolute right-0 translate-x-full">
                        YEAR {index}
                    </h2>
                ))}
                {tenThousandHoursArray.map((_, index) => (
                    <div
                        key={index}
                        className={classNames({
                            "text-[8px]": true,
                            "size-3 m-0.5": true,
                            "bg-slate-700": index < hours,
                            "bg-slate-400": index >= hours,
                        })}
                    />
                ))}
            </div>
        </div>
    );
};
