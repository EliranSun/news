import classNames from "classnames";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Calendars } from "../constants";
import { loadFromStorage, isSameDay, contrastColor, getColorsClassList } from "../utils";
import { ColorHexMap } from "../constants";
import PropTypes from "prop-types";
import { DateStrip } from "../molecules/DateStrip";

const ColorLabel = ({ color, label, textBefore, isVisible, isSuccess, connectingText, showPeriod = true, textAfter }) => {
    if (!isVisible) return null;

    return (
        <div className="inline">
            {textBefore && <span>{textBefore} </span>}
            {connectingText && <span>{connectingText} </span>}
            <span
                style={{
                    color: isSuccess
                        ? contrastColor({ bgColor: ColorHexMap[color] })
                        : ColorHexMap[color]
                }}
                className={classNames(isSuccess ? getColorsClassList(color) : "", {
                    "hidden": !label,
                    "font-bold px-2": isSuccess
                })}>{label?.toUpperCase()}</span>
            {textAfter && <span>{textAfter}</span>}
            {showPeriod && <span>. </span>}
        </div>
    );
};

ColorLabel.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    textBefore: PropTypes.string,
    isVisible: PropTypes.bool,
    connectingText: PropTypes.string,
    showPeriod: PropTypes.bool,
    isSuccess: PropTypes.bool,
};

export const TextualDayView = ({ selectedDate = new Date(), setSelectedDate }) => {
    const [fontToggle, setFontToggle] = useState(false);
    const [dayColours, setDayColours] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDayColours = async () => {
            if (!selectedDate) {
                setDayColours({});
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const colours = {};

                await Promise.all(Object.values(Calendars).map(async (cal) => {
                    try {
                        const stored = await loadFromStorage(cal.key) ?? [];
                        const entry = stored.find(e => isSameDay(e.date, selectedDate));
                        const legend = Object.values(Calendars).find(c => c.key === cal.key)?.legend;

                        colours[cal.key] = entry?.color ? {
                            color: entry.color,
                            note: entry.note,
                            label: legend?.find(l => l?.color === entry?.color)?.label ||
                                legend?.find(l => l?.color === entry?.color)?.name
                        } : null; // null → no colour that day
                    } catch (error) {
                        console.error(`Error loading data for calendar ${cal.key}:`, error);
                        colours[cal.key] = null;
                    }
                }));

                setDayColours(colours);
            } catch (error) {
                console.error('Error loading day colours:', error);
                setDayColours({});
            } finally {
                setIsLoading(false);
            }
        };

        loadDayColours();
    }, [selectedDate]);


    if (!selectedDate) return null;

    if (isLoading) {
        return (
            <>
                <DateStrip length={60} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div className="h-[70vh] flex items-center justify-center">
                    <div className="text-lg">Loading...</div>
                </div>
            </>
        );
    }

    const mood = dayColours[Calendars.Mood.key];
    const css = dayColours[Calendars.Css.key];
    const read = dayColours[Calendars.Read.key];
    const loneliness = dayColours[Calendars.Loneliness.key];
    // const friends = dayColours[Calendars.Friends.key];
    const remSleep = dayColours[Calendars.Sleep.key];
    const deepSleep = dayColours[Calendars.SleepDeep.key];
    const isCssSuccess = css && css?.color !== "black" && css?.color !== "clear";
    const isReadSuccess = read && read?.color !== "black" && read?.color !== "clear";

    return (
        <>
            <DateStrip length={60} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <div
                onClick={() => setFontToggle(!fontToggle)}
                className={classNames({
                    "h-[70vh] overflow-y-auto space-y-4": true,
                    "text-3xl font-bold my-0 text-left w-full leading-snug": true,
                    "merriweather-bold": fontToggle,
                    "space-grotesk-700": !fontToggle
                })}>
                <ColorLabel
                    isVisible
                    connectingText={mood ? "was" : ""}
                    isSuccess
                    textBefore={format(selectedDate, "EEEE")}
                    color={mood?.color}
                    label={mood?.label} />
                <div>
                    <ColorLabel
                        isVisible
                        label="CSS"
                        isSuccess={isCssSuccess}
                        showPeriod={false}
                        textBefore={isCssSuccess ? "I worked hard on" : "Did not manage to"}
                        color={css?.color || Calendars.Css.colors[0]} />
                    <span>{((css && !read) || (!css && read)) ? " but " : " and "}</span>
                    <ColorLabel
                        isSuccess={isReadSuccess}
                        label="READ"
                        isVisible
                        showPeriod={false}
                        textBefore={isReadSuccess ? "" : "did not"}
                        textAfter={isReadSuccess ? " for 30m" : ""}
                        color={read?.color || Calendars.Read.colors[0]} />
                    {(css && read) ? "! " : ". "}
                    {!css && !read && <span>Bummer.</span>}
                </div>
                <div>
                    <ColorLabel
                        isVisible={loneliness}
                        isSuccess
                        textBefore="Socially, I felt"
                        color={loneliness?.color} label={loneliness?.label} />
                    {/* <ColorLabel
                        isVisible={friends?.label}
                        textBefore="I met with"
                        isSuccess
                        color={friends?.color}
                        label={friends?.label} /> */}
                </div>
                <div>
                    <ColorLabel
                        isVisible={remSleep?.label}
                        isSuccess
                        textBefore="Mental recovery was"
                        color={remSleep?.color} label={remSleep?.label} />
                    <ColorLabel
                        isVisible={deepSleep?.label}
                        isSuccess
                        textBefore="Body recovery was"
                        color={deepSleep?.color} label={deepSleep?.label} />
                </div>
                {mood?.note && <div className="">I was thinking: &ldquo;{mood?.note}&rdquo;</div>}
            </div>
        </>
    );
};

TextualDayView.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    setSelectedDate: PropTypes.func.isRequired,
};
