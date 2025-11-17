export const CharacterNames = {
    RYAN: "Ryan",
    STACY: "Stacy",
    CHARLOTTE: "Charlotte",
    ZEKE: "Zeke",
    MORGAN: "Morgan"
};

const Characters = {
    [CharacterNames.RYAN]: {
        head: "bg-blue-600",
        body: "bg-white",
        torso: "bg-white",
        legs: "bg-red-500",
        feet: "bg-red-200"
    },
    [CharacterNames.STACY]: {
        head: "bg-yellow-200",
        body: "bg-teal-300",
        torso: "bg-teal-300",
        legs: "bg-red-200",
        feet: "bg-red-200"
    },
    [CharacterNames.CHARLOTTE]: {
        head: "bg-black",
        body: "bg-white",
        torso: "bg-white",
        legs: "bg-yellow-700",
        feet: "bg-yellow-700",
    },
    [CharacterNames.ZEKE]: {
        head: "bg-red-200",
        body: "bg-gray-500",
        torso: "bg-gray-500",
        legs: "bg-gray-500",
        feet: "bg-black",
    },
    [CharacterNames.MORGAN]: {
        head: "bg-purple-600",
        body: "bg-black",
        torso: "bg-black",
        legs: "bg-red-200",
        feet: "bg-black",
    }
}

export const Character = ({ name = CharacterNames.RYAN }) => {
    const character = Characters[name];
    if (!character) return null;

    return (
        <div>
            <div id="head" className={`w-2 h-2 ${character.head}`} />
            <div id="body" className={`w-2 h-2 ${character.body}`} />
            <div id="torso" className={`w-2 h-2 ${character.torso}`} />
            <div id="legs" className={`w-2 h-2 ${character.legs}`} />
            <div id="feet" className={`w-2 h-2 ${character.feet}`} />
        </div>
    )
}