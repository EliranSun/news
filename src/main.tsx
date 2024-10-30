import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./MainPage.jsx";
import { registerSW } from "virtual:pwa-register";
import { MainNavBar } from "./components/molecules/MainNavBar.jsx";
registerSW({ immediate: true });

import "./index.css";

const getPath = () => localStorage.getItem("path");

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MainPage savedPath={getPath()} />
		<MainNavBar />
	</React.StrictMode>
);
