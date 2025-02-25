import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const RoundedFloatingBox = ({ value, label, min, max }) => {
    return (
        <div className="rounded-lg bg-white p-4 shadow-lg mx-8">
            <h3 className="text-2xl font-bold text-indigo-900">
                {min && max ? `${max}→${min}` : `${value}+`}
            </h3>
            <p className="text-gray-700">
                {label}
            </p>
        </div>
    );
};

const PrimaryButton = ({ children, inverse = false }) => {
    return (
        <button className={` hover:bg-indigo-700  
        font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 
        transform hover:scale-105 ${inverse ? "bg-white text-indigo-600"
                : "bg-indigo-600 text-white"}`}>
            {children}
        </button>
    );
};

const CallToActionQuestion = ({ children, type = "primary" }) => {
    return (
        <h2 className={`text-lg md:text-2xl lg:text-5xl
        font-bold text-indigo-900 leading-tight italic px-4
        ${type === "primary" ? "text-indigo-900" : "text-white"}`}>
            {children}
        </h2>
    );
};

const CallToActionAnswer = ({ children, type = "primary", highlight = false }) => {
    return (
        <h1 className={`text-[3.15rem] mx-auto heebo-900 
                        md:text-4xl font-semibold text-indigo-700
                        ${type === "primary" ? "text-indigo-700" : "text-white"}`}>
            {type === "primary" && highlight
                ? <mark className="bg-yellow-400 underline leading-tight">
                    {children}
                </mark> : children}
        </h1>
    );
};

const Questions = [
    "הילד שלך משקיע בלימודים אבל לא רואה ציונים גבוהים?",
    "הילד שלך מרגיש שהוא הולך לאיבוד בתוך כיתה של 30 תלמידים?",
    "הילד שלך מתקשה להתרכז בשיעורים ומאבד עניין במהירות?",
];

const queryParams = new URLSearchParams(window.location.search);
const highlight = queryParams.get('highlight');

export default function Orchuk() {
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuestionIndex((prevIndex) => (prevIndex + 1) % Questions.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans ">
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
                                    <CallToActionQuestion>
                                        {Questions[questionIndex]}
                                    </CallToActionQuestion>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <CallToActionAnswer highlight={highlight === "true"}>
                            קבוצות הלמידה הוקמו בדיוק בשביל זה.
                        </CallToActionAnswer>
                        <p className="text-base text-gray-700 mx-auto px-4">
                            השיטה שעזרה לתמידי כיתות ז׳ עד יב׳ לעלות <b>מציון של 60 לציון של 90 (ויותר!!)</b>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row pt-4 absolute bottom-4 z-10 inset-x-0 mx-10">
                    <PrimaryButton>
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
            <section className="container mx-auto px-4 pt-8 pb-16
            bg-indigo-600 space-y-8 shadow-inner
            md:py-24 text-center relative overflow-hidden">
                <h2 className="text-3xl font-bold text-white heebo-500">
                    נתונים מהשטח
                </h2>
                <RoundedFloatingBox
                    value={300}
                    label="תלמידים שליויתי"
                />
                <RoundedFloatingBox
                    value={2450}
                    label="שעות שלימדתי"
                />
                <RoundedFloatingBox
                    min={60}
                    max={95}
                    label="שיפור ממוצע הציונים"
                />
            </section>
            <section className="container mx-auto py-8 
         space-y-8 
            md:py-24 text-right relative overflow-hidde px-8">
                <h1 className="text-4xl heebo-500">
                    למה הילד שלך משקיע בלימודים אבל לא משיג את התוצאות שהוא רוצה?
                </h1>
                <p className="text-base text-gray-700  mx-auto">
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
                    בעזרת השיטה שלי הילד שלך יבין את ה"למה" מאחורי כל נושא וכך יהיה לו הרבה יותר פשוט להשיג תוצאות גבוהות יותר.
                </h3>
                <PrimaryButton>
                    אני רוצה ציונים כאלו לילד שלי
                </PrimaryButton>
            </section>
            <section className="container mx-auto px-8 pt-8 pb-16
            bg-indigo-600 space-y-8 shadow-inner text-white
            md:py-24 text-right relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CallToActionQuestion type="secondary">
                            הילד מרגיש שהוא הולך לאיבוד בתוך כיתה של 30 תלמידים?
                        </CallToActionQuestion>
                    </motion.div>
                </AnimatePresence>
                <CallToActionAnswer type="secondary">
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
                        ✅  קבוצת ווצאפ
                    </h4>
                    <h4 className="text-xl font-bold">
                        ✅ חברויות חדשות
                    </h4>
                    <h4 className="text-xl font-bold">
                        ✅ בניית ביטחון עצמי
                    </h4>
                </div>
                <PrimaryButton inverse>
                    אני רוצה שיעור ניסיון ב-₪19
                </PrimaryButton>
            </section>
        </div>
    );
}
