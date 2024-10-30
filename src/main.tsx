import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./MainPage.jsx";
import { Bed, Rss, Skull } from "lucide-react";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

import "./index.css";

const savePath = (path) => {
	localStorage.setItem("path", path);
	window.location.href = path;
};

const getPath = () => localStorage.getItem("path");

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MainPage savedPath={getPath()} />
		<div className="fixed bottom-4 inset-x-0 flex gap-4 justify-center items-center w-full">
			<button onClick={() => savePath("/sleep")}>
				<Bed />
			</button>
			<button onClick={() => savePath("/")}>
				<Rss />
			</button>
			<button onClick={() => savePath("/chart")}>
				<Skull />
			</button>
		</div>
	</React.StrictMode>
);
