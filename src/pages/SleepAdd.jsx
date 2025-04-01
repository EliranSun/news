import classNames from "classnames";
import { motion } from "motion/react";
import { useState, useCallback, useEffect } from "react";

const States = {
    Coffee: "coffee",
    Magnesium: "magnesium",
    Alcohol: "alcohol",
    Screen: "screen",
    Workout: "workout",
    Shower: "shower",
    Poop: "poop",
    Social: "social",
    LastMeal: "last_meal",
    LastMealDescription: "last_meal_description",
    SleepHour: "sleep_hour",
    WakeHour: "wake_hour",
    REM: "rem",
    Deep: "deep",
    Awake: "awake",
    Feeling: "feeling",
}

const query = new URLSearchParams(window.location.search);
const date = query.get("date");
const state = query.get("state") || States.Coffee;

const dateObject = new Date(date);

const Button = ({ children, onClick, bgColor, className }) => {
    return (
        <button
            className={classNames("active:bg-black active:text-white p-2 rounded-md", {
                "bg-red-500": bgColor === "red",
                "bg-orange-500": bgColor === "orange",
                "bg-yellow-500": bgColor === "yellow",
                "bg-green-500": bgColor === "green",
                "bg-blue-500": bgColor === "blue",
                "bg-cyan-500": bgColor === "cyan",
                "text-white": bgColor,
            }, className)}
            onClick={onClick}>
            {children}
        </button>
    );
};


const OptionType = {
    YES: "YES",
    NO: "NO",
    INPUT: "INPUT",
}

const StateQuestions = {
    [States.Coffee]: {
        question: "☕️ Coffee after 14pm?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Magnesium
    },
    [States.Magnesium]: {
        question: "💊 Magnesium before night?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Alcohol
    },
    [States.Alcohol]: {
        question: "🍷 Alcohol at dinner?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Screen
    },
    [States.Screen]: {
        question: "💻 Screen time after 20pm?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Workout
    },
    [States.Workout]: {
        question: "🏃‍♂️ Workout?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Shower
    },
    [States.Shower]: {
        question: "🚿 Shower?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Poop
    },
    [States.Poop]: {
        question: "💩 Poop?",
        options: [OptionType.YES, OptionType.NO],
        next: States.Social
    },
    [States.Social]: {
        question: "👥 Social?",
        options: [OptionType.YES, OptionType.NO],
        next: States.LastMeal
    },
    [States.LastMeal]: {
        question: "🍽️ Last meal time",
        options: [
            "18:00", "18:30",
            "19:00", "19:30",
            "20:00", "20:30",
            "21:00", "21:30",
            "22:00", "22:30",
            "23:00", "23:30",
            "00:00"
        ],
        next: States.LastMealDescription
    },
    [States.LastMealDescription]: {
        question: "🍽️ Last meal description",
        options: [OptionType.INPUT, OptionType.INPUT, OptionType.INPUT, OptionType.INPUT],
        next: States.SleepHour
    },
    [States.SleepHour]: {
        question: "💤 Sleep hour",
        cols: 3,
        options: ["22:00", "22:15", "22:30", "22:45", "23:00", "23:15",
            "23:30", "23:45", "00:00", "00:15", "00:30", "00:45",
            "01:00", "01:15", "01:30", "01:45", "02:00", "02:15",
            "02:30", "02:45", "03:00"
        ],
        next: States.WakeHour
    },
    [States.WakeHour]: {
        question: "🌞 Wake up time",
        cols: 4,
        options: ["06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45",
            "08:00", "08:15", "08:30", "08:45", "09:00"],
        next: States.REM
    },
    [States.REM]: {
        question: "💤 REM",
        cols: 4,
        options: ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50", "1:00", "1:10", "1:20",
            "1:30", "1:40", "1:50", "2:00", "2:10", "2:20", "2:30", "2:40", "2:50"],
        next: States.Deep
    },
    [States.Deep]: {
        question: "💤 Deep",
        cols: 4,
        options: ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50", "1:00", "1:10", "1:20",
            "1:30", "1:40", "1:50", "2:00", "2:10", "2:20", "2:30", "2:40", "2:50"],
        next: States.Awake
    },
    [States.Awake]: {
        question: "💤 Awake",
        cols: 4,
        options: ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50", "1:00", "1:10", "1:20",
            "1:30", "1:40", "1:50", "2:00", "2:10", "2:20", "2:30", "2:40", "2:50"],
        next: States.Feeling
    },
    [States.Feeling]: {
        question: "💤 Feeling",
        cols: 1,
        bgColors: [
            "red",
            "orange",
            "yellow",
            "green",
            "blue",
            "cyan"
        ],
        options: [
            "exhausted", "foggy", "tired",
            "rested", "refreshed", "sharp"],
        next: null
    }
};

const TextInput = ({ options = [], updateInputs }) => {
    const [input, setInput] = useState("");

    return (
        <input
            type="text"
            value={input}
            onBlur={() => updateInputs(input)}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2"
        />
    );
};

const Options = ({ view, OnAnswer, bgColors }) => {
    const [inputs, setInputs] = useState({});

    return (
        <>
            {StateQuestions[view].options.map((option, index) => {
                if (option === OptionType.INPUT) {
                    return (
                        <TextInput
                            key={index}
                            options={StateQuestions[view].options}
                            updateInputs={input => setInputs({ ...inputs, [index]: input })}
                        />
                    );
                }

                return (
                    <Button
                        key={option}
                        onClick={() => OnAnswer(option)}
                        bgColor={bgColors && bgColors[index]}
                    >
                        {option}
                    </Button>
                );
            })}
            {view === States.LastMealDescription &&
                <Button onClick={() => OnAnswer(inputs)}>
                    NEXT
                </Button>}
        </>
    )
};

const storedData = localStorage.getItem("sleep_data-" + dateObject.toISOString().split("T")[0]);
export default function SleepAdd() {
    const [view, setView] = useState(state);
    const [animate, setAnimate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    // TODO: THEN COPY
    const [data, setData] = useState(storedData ? JSON.parse(storedData) : {
        date: dateObject.toISOString().split("T")[0],
    })

    useEffect(() => {
        console.log({ data });
    }, [data]);

    const OnAnswer = useCallback((answer) => {
        setData({
            ...data,
            [view.toLowerCase()]: answer === OptionType.YES
                ? true
                : answer === OptionType.NO
                    ? false
                    : answer
        });

        setIsVisible(false);

        if (StateQuestions[view].next) {
            setAnimate(true);
            query.set("state", StateQuestions[view].next);
            window.history.pushState({}, "", window.location.pathname + "?" + query.toString());
            setTimeout(() => {
                setView(StateQuestions[view].next);
            }, 250);
        }
    }, [view]);

    return (
        <div className="flex flex-col justify-center w-screen h-dvh py-4 px-8">
            <motion.div
                className=""
                transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                    restSpeed: 0
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    x: animate ? -300 : 0
                }}
                onAnimationComplete={() => {
                    setAnimate(false);
                    setIsVisible(true);
                }}
            >
                <h1 className="space-grotesk-700 font-bold text-base mb-8">
                    {dateObject.toLocaleDateString("en-GB", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </h1>
                <div className="merriweather-regular text-2xl space-y-4 w-full">
                    {StateQuestions[view] &&
                        <>
                            <div>{StateQuestions[view].question}</div>
                            <div className={classNames("grid gap-2 w-full justify-center", {
                                "grid-cols-2": !StateQuestions[view].cols,
                                "grid-cols-3": StateQuestions[view].cols === 3,
                                "grid-cols-4": StateQuestions[view].cols === 4,
                                "grid-cols-1": StateQuestions[view].cols === 1,
                            })}>
                                <Options
                                    view={view}
                                    OnAnswer={OnAnswer}
                                    bgColors={StateQuestions[view].bgColors} />
                            </div>
                        </>}
                </div>
            </motion.div>
            <Button
                className="fixed bottom-4 right-4 w-fit"
                onClick={() => {
                    const csvData = Object.values(data).join("\t");
                    navigator.clipboard.writeText(csvData);
                    const key = "sleep_data-" + dateObject.toISOString().split("T")[0];
                    localStorage.setItem(key, csvData);
                }}>
                Copy data
            </Button>
        </div>
    );
}
