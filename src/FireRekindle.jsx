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

  const handleRekindle = () => {
    setTimeLeft(rekindleTime);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-9xl mb-4 animate-bounce">🔥</h1>
      <h2 className="text-2xl mb-4">Time Left: {timeLeft}s</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Rekindle Time (s):
          <input
            type="number"
            value={rekindleTime}
            onChange={(e) => setRekindleTime(Number(e.target.value))}
            className="ml-2 p-1 rounded bg-gray-700 border border-gray-600"
          />
        </label>
      </div>
      {timeLeft === 0 ? (
        <button
          onClick={handleRekindle}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-medium"
        >
          Rekindle Fire
        </button>
      ) : (
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      )}
    </div>
  );
}

export default FireTimer;