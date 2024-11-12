import { useState, useEffect } from "react";
import { format, getDaysInMonth, addDays, isSameDay } from "date-fns";
import classNames from "classnames";

const today = new Date();
const daysInMonth = getDaysInMonth(today);
const daysList = new Array(daysInMonth).fill(0);

const useThemeByTime = () => {
    useEffect(() => {
		const updateThemeColor = () => {
			const hour = new Date().getHours();
			const themeColor = hour >= 6 && hour < 18 ? "#FFFFFF" : "#000000"; // White during the day, black at night
			const metaThemeColor = document.querySelector("meta[name=theme-color]");
			if (metaThemeColor) {
				metaThemeColor.setAttribute("content", themeColor);
			} else {
				const newMetaThemeColor = document.createElement("meta");
				newMetaThemeColor.setAttribute("name", "theme-color");
				newMetaThemeColor.setAttribute("content", themeColor);
				document.head.appendChild(newMetaThemeColor);
			}
		};

		updateThemeColor();
		const intervalId = setInterval(updateThemeColor, 60 * 60 * 1000); // Update every hour

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, []);
};

export const SimpleTracker = () => {
    useThemeByTime();
    
    const [trackerData, setTrackerData] = useState(() => {
        // Load initial state from local storage or default to an empty array
        const savedData = localStorage.getItem("trackerData");
        return savedData ? JSON.parse(savedData) : new Array(daysInMonth).fill({ text: "", checkboxes: [false, false, false], number: 0 });
    });

    useEffect(() => {
        // Save tracker data to local storage whenever it changes
        localStorage.setItem("trackerData", JSON.stringify(trackerData));
    }, [trackerData]);

    const handleInputChange = (index, field, value) => {
        const updatedData = trackerData.map((item, i) => {
            if (i === index) {
                if (field === "text") {
                    return { ...item, text: value };
                } else if (field === "number") {
                    return { ...item, number: value };
                } else {
                    const updatedCheckboxes = [...item.checkboxes];
                    updatedCheckboxes[field] = value;
                    return { ...item, checkboxes: updatedCheckboxes };
                }
            }
            return item;
        });
        setTrackerData(updatedData);
    };

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return (
        <section className="relative merriweather-light">
	           <h1>{format(today, "MMMM")}</h1>
												
													 <div className="w-screen z-20 top-0 pr-[26px] pt-5 flex justify-end items-end text-right text-xs">
                <div className="flex flex-col items-start justify-center 
            gap-1 w-fit  -rotate-90">
                    <p>Screen != bed</p>
                    <p>Coffee &lt; 14pm</p>
                    <p>2h CSS</p>
                </div>
                <p className="w-8 h-8 flex items-end justify-center">% fat</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 merriweather-light w-screen p-4 text-xs">
                {daysList.map((day, index) => {
                    const currentDay = addDays(firstDayOfMonth, index);
                    const isToday = isSameDay(today, currentDay);
                    const dayName = format(currentDay, "EEEEEE");

                    return (
                        <div key={index} className={classNames("flex items-center justify-center gap-2 px-2 py-px", {
                            "border": isToday
                        })}>
                            <p className="w-4 h-8 font-mono dark:bg-gray-800 flex items-center">{index + 1}</p>
                            <p className="w-6 h-8 dark:bg-gray-800 flex items-center">{dayName}</p>
                            <input
                                type="text"
                                className="border w-1/2"
                                value={trackerData[index].text}
                                onChange={(e) => handleInputChange(index, "text", e.target.value)}
                            />
                            {trackerData[index].checkboxes.map((checked, i) => (
                                <input
                                    key={i}
                                    type="checkbox"
                                    className="border"
                                    checked={checked}
                                    onChange={(e) => handleInputChange(index, i, e.target.checked)}
                                />
                            ))}
                            <input
                                type="number"
                                className="border w-10"
                                value={trackerData[index].number}
                                onChange={(e) => handleInputChange(index, "number", e.target.value)}
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    );
};
