import { createContext, useState } from "react";

export const PointerContext = createContext({
    pointerX: 0,
    pointerY: 0,
    setPointerX: () => { },
    setPointerY: () => { },
});

export const PointerProvider = ({ children }) => {
    const [pointerX, setPointerX] = useState(0);
    const [pointerY, setPointerY] = useState(0);

    return (
        <PointerContext.Provider value={{ pointerX, pointerY, setPointerX, setPointerY }}>
            {children}
        </PointerContext.Provider>
    );
};
