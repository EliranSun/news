import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./MainPage.jsx";
import { registerSW } from "virtual:pwa-register";
import { MainNavBar } from "./components/molecules/MainNavBar.jsx";
registerSW({ immediate: true });

import "./index.css";

const getPath = () => localStorage.getItem("path");
const queryParams = new URLSearchParams(window.location.search);
const hideNavBar = queryParams.get("hideNavBar");

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MainPage savedPath={getPath()} />
		{!hideNavBar && <MainNavBar />}
	</React.StrictMode>
);
