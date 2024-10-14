import { useState, useEffect, useMemo } from "react";

const MAX_TIME = 86400;
const initFireState = localStorage.getItem("fireState") || MAX_TIME;
const debug = new URLSearchParams(window.location.search).get("debug");

function FireTimer() {
	const [timeLeft, setTimeLeft] = useState(initFireState);
	const random = Math.random() * (2000 - 10) + 10;

	useEffect(() => {
		let timer;

		if (timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
				localStorage.setItem("fireState", timeLeft);
			}, random);
		}

		return () => clearInterval(timer);
	}, [timeLeft, random]);

	const scale = useMemo(() => Math.max(timeLeft / MAX_TIME, 0.1), [timeLeft]);
	const opacity = useMemo(() => Math.max(timeLeft / MAX_TIME, 0.1), [timeLeft]); // Ensures a minimum opacity

	return (
		<div
			className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white"
			onClick={() => {
				setTimeLeft((prev) => Math.min(Math.round((prev + 1) * 1.3), MAX_TIME));
			}}>
			<div
				className="relative z-10 transition duration-100"
				style={{
					opacity,
					transform: `scale(${scale})`,
					cursor: "pointer",
				}}>
				<h1 className="text-9xl select-none animate-grow-shrink">🔥</h1>
			</div>
			<div className="z-0 relative w-40 h-28">
				<div className="absolute -top-4 inset-x-0 text-8xl select-none rotate-90">
					🪵
				</div>
			</div>
			{debug ? (
				<>
					<label>{timeLeft}</label>
					<label>{opacity}</label>
					<label>{scale}</label>
					<label>{random}</label>
				</>
			) : null}
		</div>
	);
}

export default FireTimer;
