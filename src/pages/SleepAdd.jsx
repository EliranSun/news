import classNames from "classnames";
import { motion } from "motion/react";
import { useState, useCallback } from "react";

const States = {
    Coffee: "Coffee",
    Magnesium: "Magnesium",
    Alcohol: "Alcohol",
    Screen: "Screen",
    Workout: "Workout",
    Shower: "Shower",
    Poop: "Poop",
    Social: "Social",
    LastMeal: "LastMeal",
    LastMealDescription: "LastMealDescription",
    SleepHour: "SleepHour",
    WakeHour: "WakeHour",
    REM: "REM",
    Deep: "Deep",
    Awake: "Awake",
    Feeling: "Feeling",
}

const query = new URLSearchParams(window.location.search);
const date = query.get("date");
const state = query.get("state") || States.Coffee;

const dateObject = new Date(date);

const Button = ({ children, onClick, bgColor }) => {
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
                "w-full": true,
            })}
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

export default function SleepAdd() {
    const [view, setView] = useState(state);
    const [animate, setAnimate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const OnAnswer = useCallback((answer) => {
        if (StateQuestions[view].next) {
            query.set("state", StateQuestions[view].next);
            window.history.pushState({}, "", window.location.pathname + "?" + query.toString());
            setAnimate(true);
            setIsVisible(false);
            setTimeout(() => {
                setView(StateQuestions[view].next);
            }, 250);
        }
    }, [view]);

    return (
        <motion.div
            className="py-4 px-8 w-screen h-dvh flex flex-col justify-center"
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                restSpeed: 100
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
            <h1 className="space-grotesk-700 font-bold text-base">
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
                            <Options view={view} OnAnswer={OnAnswer} bgColors={StateQuestions[view].bgColors} />
                        </div>
                    </>}
            </div>
        </motion.div>
    );
}
