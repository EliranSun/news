import Rooftop from "./Rooftop.png";
import Floor from "./Floor.png";
import Entrance from "./Entrance.png";
import { useMemo } from "react";

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
    const floors = useMemo(() => new Array(50).fill(null).map(() => Floor), []);

    const skyColor = useMemo(() => {
        const currentHour = new Date().getHours();
        return getSkyColorByHour(currentHour);
    }, []);

    return (
        <>
            <div className={`merriweather-regular flex gap-8 w-screen ${skyColor}`}>
                <div style={{ imageRendering: "pixelated" }} className="w-1/3 pt-32 px-16">
                    <img src={Rooftop} className="w-full" />
                    {floors.map((floorSrc, index) => <img className="w-full" src={floorSrc} key={index} />)}
                    <img src={Entrance} className="w-full" />
                </div>
                <div className="w-2/3 h-screen p-8 flex items-center">
                    <h1 className="my-8 text-9xl font-black text-white w-96 leading-[6rem]">
                        Character Selection Screen
                    </h1>
                </div>
            </div>
            <div id="floor" className="w-full bg-black h-[33vh]" />
        </>
    );
};

export default CharacterSelectionScreenPage;