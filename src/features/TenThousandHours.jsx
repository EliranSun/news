import classNames from "classnames";
import { useState } from "react";

const BLOCK_COUNT = 1000;
const tenThousandHoursArray = new Array(BLOCK_COUNT).fill(0);

export const TenThousandHours = () => {
    const [isCondensed, setIsCondensed] = useState(false);
    const [numberOfColumns, setNumberOfColumns] = useState(7);
    const [hours, setHours] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return parseInt(searchParams.get('hours')) || 10;
    });

    // const numberOfColumns = Math.ceil(window.innerWidth / (12 + 4 + 1));
    const rowsCount = isCondensed
        ? Math.ceil(BLOCK_COUNT / 38)
        : Math.ceil(BLOCK_COUNT / numberOfColumns);

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
                <div className="text-sm">
                    <div>{numberOfColumns} days a week</div>
                    <div>{numberOfColumns} hour a day</div>
                </div>
                <button onClick={() => setIsCondensed(!isCondensed)}>Condense</button>
            </div>
            <div
                style={{
                    width: isCondensed
                        ? `${numberOfColumns * 52 + numberOfColumns * 4}px`
                        : `${numberOfColumns * 12 + numberOfColumns * 4}px`
                }}
                className="relative flex items-center justify-start flex-wrap">
                {new Array(Math.round(isCondensed ? rowsCount : rowsCount / 50)).fill(0).map((_, index) => (
                    <h2
                        key={index}
                        style={{
                            top: isCondensed
                                ? `${10 * index}px`
                                : `${12 * 52 * index}px`
                        }}
                        className="absolute right-0 translate-x-full text-[8px]">
                        YEAR {index}
                    </h2>
                ))}
                {tenThousandHoursArray.map((_, index) => (
                    <div
                        key={index}
                        className={classNames({
                            "size-3 m-0.5": !isCondensed,
                            "size-2 m-px": isCondensed,
                            "bg-slate-700": index < hours,
                            "bg-slate-400": index >= hours,
                            "bg-red-500": index % 52 === 0,
                            "bg-green-500": index % 7 === 0,
                        })}
                    />
                ))}
            </div>
        </div>
    );
};
