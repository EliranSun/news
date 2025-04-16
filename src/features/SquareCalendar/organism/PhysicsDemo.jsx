import PhysicsSimulation from './SquareGoal';
import { useState } from 'react';

const saveToStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const loadFromStorage = (key) => {
    try {
        return Number(localStorage.getItem(key));
    } catch (error) {
        return 0;
    }
}

const PhysicsDemo = () => {
    const [boxCount, setBoxCount] = useState(loadFromStorage('boxCount'));

    return (
        <div className="physics-demo fixed inset-0">
            <h1 className="text-2xl font-bold fixed top-0 inset-x-0 text-center">
                2025 - {boxCount}/{300}
            </h1>
            <PhysicsSimulation
                initBoxCount={boxCount}
                onBoxAdded={() => {
                    setBoxCount(boxCount + 1)
                    saveToStorage('boxCount', boxCount)
                }} />
        </div>
    );
};

export default PhysicsDemo; 