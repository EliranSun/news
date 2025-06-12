import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./MainPage.jsx";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

import "./index.css";

const getPath = () => localStorage.getItem("path");
const queryParams = new URLSearchParams(window.location.search);
const hideNavBar = queryParams.get("hideNavBar");

const savedPath = getPath();
const path = new URL(window.location.href).pathname;

console.log({ path, savedPath });

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MainPage savedPath={path} />
		{/* {(!hideNavBar && !path.includes("square-calendar")) && <MainNavBar />} */}
	</React.StrictMode>
);
