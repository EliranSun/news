import React, { useState, useEffect } from 'react';

function FireTimer() {
  const [rekindleTime, setRekindleTime] = useState(60); // Default rekindle time
  const [timeLeft, setTimeLeft] = useState(rekindleTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Calculate scale and opacity based on timeLeft
  const calculateScale = () => Math.max(timeLeft / rekindleTime, 0.1); // Ensures a minimum size
  const calculateOpacity = () => Math.max(timeLeft / rekindleTime, 0.1); // Ensures a minimum opacity

  // Rekindle the fire by adding more time
  const rekindleFire = () => {
    setTimeLeft((prev) => Math.min(prev + 10, rekindleTime)); // Add 10 seconds, but not exceed rekindleTime
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white">
      <div
        className="transition-transform transition-opacity duration-100"
        onClick={rekindleFire}
        style={{
          transform: `scale(${calculateScale()})`,
          opacity: calculateOpacity(),
          cursor: 'pointer',
        }}
      >
        <h1 className="text-9xl">🔥</h1>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">
          Rekindle Time (s):
          <input
            type="number"
            value={rekindleTime}
            onChange={(e) => {
              setRekindleTime(Number(e.target.value));
              setTimeLeft(Number(e.target.value));
            }}
            className="ml-2 p-1 rounded bg-gray-700 border border-gray-600"
          />
        </label>
      </div>
      {!isRunning && timeLeft > 0 && (
        <button
          onClick={() => setIsRunning(true)}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
        >
          Start
        </button>
      )}
    </div>
  );
}

export default FireTimer;