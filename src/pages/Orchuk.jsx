import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

// Define color schemes
const colorSchemes = {
    default: {
        primary: 'indigo',
        secondary: 'blue',
        accent: 'yellow',
        text: {
            dark: 'gray-700',
            darker: 'gray-900',
            light: 'white',
        },
        bg: {
            gradient: 'from-blue-50 to-indigo-100',
            section: 'bg-indigo-600',
            highlight: 'bg-yellow-400',
        }
    },
    modern: {
        primary: 'blue',
        secondary: 'orange',
        accent: 'green',
        text: {
            dark: 'gray-800',
            darker: 'gray-900',
            light: 'white',
        },
        bg: {
            gradient: 'from-blue-50 to-blue-100',
            section: 'bg-blue-600',
            highlight: 'bg-orange-400',
        },
        // Custom Tailwind colors for the modern scheme
        custom: {
            primary: '#4A90E2', // Soft medium blue
            secondary: '#FF7F50', // Coral
            accent: '#2ECC71', // Muted green
            background: '#F5F5F5', // Light gray
            text: '#333333', // Dark gray
        }
    }
};

const RoundedFloatingBox = ({ value, label, min, max, colors }) => {
    const isModern = colors.custom !== undefined;

    return (
        <div className={`rounded-lg ${isModern ? 'bg-white' : 'bg-white'} p-4 shadow-lg mx-8`}
            style={isModern ? { backgroundColor: colors.custom.background } : {}}>
            <h3 className={isModern ? 'text-2xl font-bold' : `text-2xl font-bold text-${colors.primary}-700`}
                style={isModern ? { color: colors.custom.primary } : {}}>
                {min && max ? `${max}→${min}` : `${value}+`}
            </h3>
            <p className={isModern ? 'text-base' : `text-${colors.text.dark}`}
                style={isModern ? { color: colors.custom.text } : {}}>
                {label}
            </p>
        </div>
    );
};

RoundedFloatingBox.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        text: PropTypes.shape({
            dark: PropTypes.string.isRequired
        }).isRequired,
        custom: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string,
            accent: PropTypes.string,
            background: PropTypes.string,
            text: PropTypes.string
        })
    }).isRequired
};

const PrimaryButton = ({ children, inverse = false, colors }) => {
    const isModern = colors.custom !== undefined;

    if (isModern) {
        return (
            <button
                className="font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                style={{
                    backgroundColor: inverse ? 'white' : colors.custom.primary,
                    color: inverse ? colors.custom.primary : 'white',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = inverse ? 'white' : '#3A80D2'; // Darker blue on hover
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = inverse ? 'white' : colors.custom.primary;
                }}
            >
                {children}
            </button>
        );
    }

    return (
        <button className={` hover:bg-${colors.primary}-700  
        font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 
        transform hover:scale-105 ${inverse ? `bg-white text-${colors.primary}-600`
                : `bg-${colors.primary}-600 text-white`}`}>
            {children}
        </button>
    );
};

PrimaryButton.propTypes = {
    children: PropTypes.node.isRequired,
    inverse: PropTypes.bool,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        custom: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string
        })
    }).isRequired
};

const CallToActionQuestion = ({ children, type = "primary", colors }) => {
    const isModern = colors.custom !== undefined;

    if (isModern) {
        return (
            <h2 className="text-lg md:text-2xl lg:text-5xl font-bold leading-tight italic px-4"
                style={{ color: type === "primary" ? colors.custom.text : 'white' }}>
                {children}
            </h2>
        );
    }

    return (
        <h2 className={`text-lg md:text-2xl lg:text-5xl
        font-bold leading-tight italic px-4
        ${type === "primary" ? `text-${colors.primary}-900` : "text-white"}`}>
            {children}
        </h2>
    );
};

CallToActionQuestion.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        custom: PropTypes.shape({
            text: PropTypes.string
        })
    }).isRequired
};

const CallToActionAnswer = ({ children, type = "primary", highlight = false, colors }) => {
    const isModern = colors.custom !== undefined;

    if (isModern) {
        if (type === "primary" && highlight) {
            return (
                <h1 className="text-[3.15rem] mx-auto heebo-900 md:text-4xl font-semibold">
                    <mark style={{ backgroundColor: colors.custom.secondary, textDecoration: 'underline', lineHeight: 'tight' }}>
                        {children}
                    </mark>
                </h1>
            );
        }

        return (
            <h1 className="text-[3.15rem] mx-auto heebo-900 md:text-4xl font-semibold"
                style={{ color: type === "primary" ? colors.custom.primary : 'white' }}>
                {children}
            </h1>
        );
    }

    return (
        <h1 className={`text-[3.15rem] mx-auto heebo-900 
                        md:text-4xl font-semibold 
                        ${type === "primary" ? `text-${colors.primary}-700` : "text-white"}`}>
            {type === "primary" && highlight
                ? <mark className={`${colors.bg.highlight} underline leading-tight`}>
                    {children}
                </mark> : children}
        </h1>
    );
};

CallToActionAnswer.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    highlight: PropTypes.bool,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        bg: PropTypes.shape({
            highlight: PropTypes.string.isRequired
        }).isRequired,
        custom: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string
        })
    }).isRequired
};

const Questions = [
    "הילד שלך משקיע בלימודים אבל לא רואה ציונים גבוהים?",
    "הילד שלך מרגיש שהוא הולך לאיבוד בתוך כיתה של 30 תלמידים?",
    "הילד שלך מתקשה להתרכז בשיעורים ומאבד עניין במהירות?",
];

export default function Orchuk() {
    const [questionIndex, setQuestionIndex] = useState(0);

    // Get query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const highlight = queryParams.get('highlight');
    const schemeParam = queryParams.get('colorScheme');

    // Select color scheme based on query parameter
    const colors = colorSchemes[schemeParam === 'modern' ? 'modern' : 'default'];

    useEffect(() => {
        const interval = setInterval(() => {
            setQuestionIndex((prevIndex) => (prevIndex + 1) % Questions.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            dir="rtl"
            className={`min-h-screen font-sans ${colors.custom ? "" : `bg-gradient-to-br ${colors.bg.gradient}`}`}
            style={colors.custom ?
                { background: `linear-gradient(to bottom right, ${colors.custom.background}, #E6F0FF)` } :
                {}}>
            {/* Hero Section */}
            <section className="h-[calc(100vh-10px)] container mx-auto px-8 py-8 md:py-24 
            text-right relative overflow-hidden">
                {/* Background Image - Positioned behind content but above background */}


                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    {/* Text Content */}
                    <div className="md:w-1/2 space-y-6">
                        <div className="flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={questionIndex}
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CallToActionQuestion colors={colors}>
                                        {Questions[questionIndex]}
                                    </CallToActionQuestion>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <CallToActionAnswer highlight={highlight === "true"} colors={colors}>
                            קבוצות הלמידה הוקמו בדיוק בשביל זה.
                        </CallToActionAnswer>
                        <p className={`text-base text-${colors.text.dark} mx-auto px-4`}>
                            השיטה שעזרה לתמידי כיתות ז׳ עד יב׳ לעלות <b>מציון של 60 לציון של 90 (ויותר!!)</b>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row pt-4 absolute bottom-4 z-10 inset-x-0 mx-10">
                    <PrimaryButton colors={colors}>
                        אני רוצה שיעור ניסיון ב-₪19
                    </PrimaryButton>
                    <button className="text-white underline bg-transparent 
                            font-bold py-3 px-6 rounded-xl max-w-48 mx-auto
                            transition duration-300 transform hover:scale-105">
                        אני רוצה לדעת עוד
                    </button>
                </div>
                <div className="absolute inset-0 z-0 flex justify-center items-end">
                    <img
                        src="https://orshemesh-math.com/wp-content/uploads/2024/12/%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%9C%D7%9C%D7%90-%D7%A9%D7%9D-3.png"
                        alt="תלמידים לומדים מתמטיקה"
                        className="w-auto h-[45%] max-w-lg object-contain 
                        brightness-125 grayscale
                        transform hover:scale-105 transition duration-500"
                    />
                </div>
                {/* Add gradient shadow at bottom of screen */}
                <div className="absolute inset-0 z-0 bottom-0 flex justify-center items-end opacity-40">
                    <div className="w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
                </div>
            </section>
            <section className={colors.custom ?
                "container mx-auto px-4 pt-8 pb-16 space-y-8 shadow-inner md:py-24 text-center relative overflow-hidden" :
                `container mx-auto px-4 pt-8 pb-16 ${colors.bg.section} space-y-8 shadow-inner md:py-24 text-center relative overflow-hidden`}
                style={colors.custom ? { backgroundColor: colors.custom.primary } : {}}>
                <h2 className="text-3xl font-bold text-white heebo-500">
                    נתונים מהשטח
                </h2>
                <RoundedFloatingBox
                    value={300}
                    label="תלמידים שליויתי"
                    colors={colors}
                />
                <RoundedFloatingBox
                    value={2450}
                    label="שעות שלימדתי"
                    colors={colors}
                />
                <RoundedFloatingBox
                    min={60}
                    max={95}
                    label="שיפור ממוצע הציונים"
                    colors={colors}
                />
            </section>
            <section className="container mx-auto py-8 
         space-y-8 
            md:py-24 text-right relative overflow-hidde px-8">
                <h1 className="text-4xl heebo-500">
                    למה הילד שלך משקיע בלימודים אבל לא משיג את התוצאות שהוא רוצה?
                </h1>
                <p className={`text-base text-${colors.text.dark} mx-auto`}>
                    יכולות להיות לכך מספר סיבות:
                </p>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <h4 className="text-xl font-bold">
                        ❌ הילד שלך לא מבין את החומר
                    </h4>
                    <h4 className="text-xl font-bold">
                        ❌ הילד שלך לא מבין את החומר
                    </h4>
                    <h4 className="text-xl font-bold">
                        ❌ הילד שלך לא מבין את החומר
                    </h4>
                </div>
                <h3 className="text-2xl font-bold">
                    בעזרת השיטה שלי הילד שלך יבין את ה&quot;למה&quot; מאחורי כל נושא וכך יהיה לו הרבה יותר פשוט להשיג תוצאות גבוהות יותר.
                </h3>
                <PrimaryButton colors={colors}>
                    אני רוצה ציונים כאלו לילד שלי
                </PrimaryButton>
            </section>
            <section className={colors.custom ?
                "container mx-auto px-8 pt-8 pb-16 space-y-8 shadow-inner text-white md:py-24 text-right relative overflow-hidden" :
                `container mx-auto px-8 pt-8 pb-16 ${colors.bg.section} space-y-8 shadow-inner text-white md:py-24 text-right relative overflow-hidden`}
                style={colors.custom ? { backgroundColor: colors.custom.primary } : {}}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CallToActionQuestion type="secondary" colors={colors}>
                            הילד מרגיש שהוא הולך לאיבוד בתוך כיתה של 30 תלמידים?
                        </CallToActionQuestion>
                    </motion.div>
                </AnimatePresence>
                <CallToActionAnswer type="secondary" colors={colors}>
                    בדיוק בשביל זה הקמתי את קבוצות הלמידה ברמלה.
                </CallToActionAnswer>
                <h3>
                    איך זה עובד?
                </h3>
                <p>
                    קבוצה חזקה של עד 6 תלמידים שמעלה את המוטביציה של הילד שלך ללמידה
                </p>
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    <h4 className="text-xl font-bold">
                        ✅ ליווי אישי
                    </h4>
                    <h5>
                        הילד לפעמים מתבייש לשאול את המורה שאלות בכיתה?
                    </h5>
                    <p>
                        בדיוק בשביל זה יצרתי כיתות קטנות שהן כל תלמיד מקבל יחס אישי.
                    </p>
                    <h4 className="text-xl font-bold">
                        <span style={colors.custom ? { color: colors.custom.accent } : {}}>✅</span> קבוצת ווצאפ
                    </h4>
                    <h4 className="text-xl font-bold">
                        <span style={colors.custom ? { color: colors.custom.accent } : {}}>✅</span> חברויות חדשות
                    </h4>
                    <h4 className="text-xl font-bold">
                        <span style={colors.custom ? { color: colors.custom.accent } : {}}>✅</span> בניית ביטחון עצמי
                    </h4>
                </div>
                <PrimaryButton inverse colors={colors}>
                    אני רוצה שיעור ניסיון ב-₪19
                </PrimaryButton>
            </section>
        </div>
    );
}
