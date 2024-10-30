import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./MainPage.jsx";
// import {registerSW} from 'virtual:pwa-register'

// registerSW({immediate: true});

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MainPage />
	</React.StrictMode>
);
