import Rooftop from "./Rooftop.png";
import Floor from "./Floor.png";
import Entrance from "./Entrance.png";
import { useMemo } from "react";
import classNames from "classnames";
import { Character, CharacterNames } from './Character';

const SkyColor = {
    Dawn: "bg-rose-100",   // soft pale pink-orange
    Morning: "bg-sky-100",    // light, fresh blue
    Noon: "bg-sky-200",    // bright, clean daytime blue
    Dusk: "bg-orange-300", // warm fading light
    Evening: "bg-indigo-700", // deep cool twilight
    Night: "bg-slate-900"   // near-black night sky
};

const getSkyColorByHour = (hour) => {
    if (hour >= 5 && hour < 7) {
        return SkyColor.Dawn;
    }

    if (hour >= 7 && hour < 11) {
        return SkyColor.Morning;
    }

    if (hour >= 11 && hour < 16) {
        return SkyColor.Noon;
    }

    if (hour >= 16 && hour < 19) {
        return SkyColor.Dusk;
    }

    if (hour >= 19 && hour < 22) {
        return SkyColor.Evening;
    }

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
            <div className={`flex md:gap-8 ${skyColor} justify-center`}>
                <div style={{ imageRendering: "pixelated" }} className="w-1/2 md:w-1/3 pt-32 px-16 relative">
                    <img src={Rooftop} className="w-full" />
                    {floors.map((floorSrc, index) => <img className="w-full" src={floorSrc} key={index} />)}
                    <img src={Entrance} className="w-full" />
                    <div className="absolute bottom-0 right-10">
                        <Character name={CharacterNames.RYAN} />
                    </div>
                    <div className="absolute bottom-0 right-4">
                        <Character name={CharacterNames.STACY} />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Character name={CharacterNames.CHARLOTTE} />
                    </div>
                    <div className="absolute bottom-0 -right-10">
                        <Character name={CharacterNames.ZEKE} />
                    </div>
                    <div className="absolute bottom-0 -right-14">
                        <Character name={CharacterNames.MORGAN} />
                    </div>
                </div>
                <div className="w-1/2 md:w-2/3 mt-32 md:p-8 space-y-8 merriweather-regular max-w-screen-sm clearfix text-justify">
                    <h1 className={classNames(
                        "whitespace-normal",
                        "mb-16 text-2xl md:text-7xl font-black text-white",
                        "md:w-full md:leading-[3.94rem] tracking-[-6px] press-start-2p-700"
                    )}>
                        CHARACTER SELECTION SCREEN
                    </h1>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">What is this?</h2>
                        <p>
                            It is a game about selecting a character, essentially. <br />
                            But what <i>DOES</i> building a character means?<br />
                            Looking through the lens of video games, it is the virtual aspect of selecting body parts, shapes, facial expressions and clothes. Going one layer of interperation under though, the <i>ACT</i> of choosing a face, body, clothes, expressions etc. is not that simple. <br />
                            <b>WHY</b> did you choose a smiley face? Why red as the color of the shirt? Why is she muscular? Why is he bald? Are you mimicing yourself? An ideal? Or are you representing something hidden from you - subconsicous even - and let it surface via the technical aspect of selecting a character?
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">
                            If this is about character, why is there a building?
                        </h2>
                        <p className="clearfix text-justify">
                            TBD
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">Show me something</h2>
                        <p>
                            OK.
                        </p>
                        <div className="w-full aspect-video rounded-xl shadow-2xl overflow-hidden border border-white/20">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/0FOd3owrfvM"
                                title="Character Selection Screen Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">What's the genre?</h2>
                        <p className="clearfix text-justify">
                            That&apos;s a good question. <br />
                            I think the primary genre is a psychological narrative adventure where you explore the building and neighbors and yourself.
                            Secondary genres are more of a mix: Social sim; Apartment building; Mini game puzzle collection... perhaps we can classify it all under &quot;Experimental&quot;.
                            <br />
                            Psycological, because I intend the players to experience choices in this building via interactions with characters. In this regard, I draw a big inspiration from the game{' '}
                            <a href="https://store.steampowered.com/app/335670/LISA_The_Painful/">
                                Lisa: The Painful
                            </a>.<br />
                            <img
                                className="w-full md:w-1/3 md:float-right md:ml-6 mt-4 md:mt-0 mb-4 rounded-lg shadow-lg"
                                src="https://www.verywellmind.com/thmb/N-oixlZbS6MeTK7Fd-p20X6l6J8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2795422-article-the-big-five-personality-dimensions-5a9083fb6edd650036603137.png" />
                            Also, the main technique to &quot;grow&quot; your character is by making choices and develop the Big 5 personality model. This is because I want to convey the feeling of the character going to a resort and working on themselves, while the players... kinda do the same
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">The Story</h2>
                        <p>
                            TBD
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">Gameplay</h2>
                        <p>
                            TBD
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">Why can't I scroll all the way up?</h2>
                        <p>
                            WIP
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="press-start-2p-700">Who are you?</h2>
                        <p>
                            Eliran Shemesh, AKA RyanMcklain AKA Just another indian boy.
                            Contact me via <a href="mailto:ryanmcklain@gmail.com">ryanmcklain@gmail.com</a> OR <a href="https://x.com/JustAnIndianBoy">my X account</a> OR <a href="https://discord.gg/hrJcB5FM">my discord server</a> OR <a href="https://web.telegram.org/a/#-5047308493">my Telegram group</a>.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div id="floor" className="bg-black h-[33vh] w-screen" />
            </div>
        </div>
    );
};

export default CharacterSelectionScreenPage;