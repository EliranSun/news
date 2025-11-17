import Rooftop from "./Rooftop.png";
import Floor from "./Floor.png";
import Entrance from "./Entrance.png";
import { useMemo } from "react";
import classNames from "classnames";

const SkyColor = {
    Dawn: "bg-rose-100",   // soft pale pink-orange
    Morning: "bg-sky-100",    // light, fresh blue
    Noon: "bg-sky-200",    // bright, clean daytime blue
    Dusk: "bg-orange-300", // warm fading light
    Evening: "bg-indigo-700", // deep cool twilight
    Night: "bg-slate-900"   // near-black night sky
};

const getSkyColorByHour = (hour) => {
    // Dawn: 5-7 (5am-7am)
    if (hour >= 5 && hour < 7) {
        return SkyColor.Dawn;
    }
    // Morning: 7-11 (7am-11am)
    if (hour >= 7 && hour < 11) {
        return SkyColor.Morning;
    }
    // Noon: 11-15 (11am-3pm)
    if (hour >= 11 && hour < 15) {
        return SkyColor.Noon;
    }
    // Dusk: 15-19 (3pm-7pm)
    if (hour >= 15 && hour < 19) {
        return SkyColor.Dusk;
    }
    // Evening: 19-22 (7pm-10pm)
    if (hour >= 19 && hour < 22) {
        return SkyColor.Evening;
    }
    // Night: 22-5 (10pm-5am)
    return SkyColor.Night;
};

const CharacterSelectionScreenPage = () => {
    const floors = useMemo(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            return new Array(200).fill(null).map(() => Floor);
        }
        return new Array(50).fill(null).map(() => Floor);
    }, []);

    const skyColor = useMemo(() => {
        const currentHour = new Date().getHours();
        return getSkyColorByHour(currentHour);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden">
            <div className={`flex md:gap-8 ${skyColor}`}>
                <div style={{ imageRendering: "pixelated" }} className="w-1/2 md:w-1/3 pt-32 px-16">
                    <img src={Rooftop} className="w-full" />
                    {floors.map((floorSrc, index) => <img className="w-full" src={floorSrc} key={index} />)}
                    <img src={Entrance} className="w-full" />
                </div>
                <div className="w-1/2 md:w-2/3 mt-32 md:p-8 space-y-8">
                    <h1 className={classNames(
                        "text-wrap break-words whitespace-normal",
                        "mb-16 text-2xl md:text-7xl font-black text-white",
                        "md:w-full md:leading-[3.5rem] tracking-[-6px] press-start-2p-700"
                    )}>
                        Character Selection Screen
                    </h1>
                    <div className="merriweather-regular max-w-screen-md space-y-4">
                        <h2 className="press-start-2p-700">What is this?</h2>
                        <p>
                            It is a game about selecting a character, essentially.
                        </p>
                    </div>
                    <div className="merriweather-regular max-w-screen-md space-y-4">
                        <h2 className="press-start-2p-700">Trailer</h2>
                        <p>
                            It is a game about selecting a character, essentially.
                        </p>
                    </div>
                    <div className="merriweather-regular max-w-screen-md space-y-4">
                        <h2 className="press-start-2p-700">Genre</h2>
                        <p className="clearfix">
                            That&apos;s a good question. <br />
                            I think the primary genre is a psychological narrative adventure where you explore the building and neighbors and yourself.
                            Secondary genres are more of a mix: Social sim; Apartment building; Mini game puzzle collection... perhaps we can classify it all under &quot;Experimental&quot;.
                            <br />
                            Psycological, because I intend the players to experience choices in this building via interactions with characters. In this regard, I draw a big inspiration from the game{' '}
                            <a href="https://store.steampowered.com/app/335670/LISA_The_Painful/">
                                Lisa: The Painful
                            </a>. Also, the main technique to &quot;grow&quot; your character is by making choices and develop the Big 5 personality model.
                            <img
                                className="w-full md:w-1/3 md:float-right md:ml-6 mt-4 md:mt-0 mb-4 rounded-lg shadow-lg"
                                src="https://www.verywellmind.com/thmb/N-oixlZbS6MeTK7Fd-p20X6l6J8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2795422-article-the-big-five-personality-dimensions-5a9083fb6edd650036603137.png" />
                        </p>
                    </div>
                    <div className="merriweather-regular max-w-screen-md space-y-4">
                        <h2 className="press-start-2p-700">Gameplay</h2>
                        <p>
                            It is a game about selecting a character, essentially.
                        </p>
                    </div>
                    <div className="merriweather-regular max-w-screen-md space-y-4">
                        <h2 className="press-start-2p-700">Who am I?</h2>
                        <p>
                            Eliran Shemesh, AKA RyanMcklain AKA Just another indian boy.
                        </p>
                    </div>
                </div>
            </div>
            <div id="floor" className="bg-black h-[33vh] w-screen" />
        </div>
    );
};

export default CharacterSelectionScreenPage;