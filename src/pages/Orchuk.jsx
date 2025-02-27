import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colorSchemes } from "../features/orchuk/color-scheme";
import { RoundedFloatingBox } from "../features/orchuk/rounding-floating-box";
import { PrimaryButton } from "../features/orchuk/primary-button";
import { CallToActionQuestion } from "../features/orchuk/call-to-action-question";
import { CallToActionAnswer } from "../features/orchuk/call-to-action-answer";
import { WaveDivider } from "../features/orchuk/wave-divider";
import { Questions } from "../features/orchuk/constants";


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
            <section className="h-[calc(100vh-20px)] container mx-auto px-8 pt-8 md:py-24 
            text-right relative overflow-hidden pb-20">
                {/* Background Image - Positioned behind content but above background */}
                <div className="flex flex-col md:flex-row items-center 
                justify-between gap-8 relative z-10">
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

                {/* Wave divider at the bottom of hero section */}
                <WaveDivider
                    colors={colors}
                    fillColor={colors.custom.primary}
                    position="bottom"
                    pattern="smooth"
                    height={80}
                    zIndex={5} />
            </section>

            {/* Stats Section */}
            <section
                className={`container relative mx-auto px-4
                     pt-8 pb-24 space-y-8 shadow-inner md:py-24 
                     text-center ${colors.custom ? '' : colors.bg.section}`}
                style={colors.custom ? { backgroundColor: colors.custom.primary } : {}}>
                {/* <WaveDivider colors={colors} position="top" pattern="smooth" height={80} zIndex={5} /> */}
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

                {/* Wave divider at the bottom of stats section */}
                <WaveDivider
                    fillColor={colors.custom.background}
                    position="bottom"
                    pattern="smooth" height={80} zIndex={5} />
            </section>

            {/* Why Section */}
            <section className="container mx-auto py-8 space-y-8 md:py-24 text-right relative overflow-hidden px-8 pb-24">
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

                {/* Wave divider at the bottom of why section */}
                <WaveDivider colors={colors} position="bottom" pattern="smooth" height={80} zIndex={5} />
            </section>

            {/* How Section */}
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
