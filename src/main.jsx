import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import FireRekindle from "./FireRekindle";
import QrCodes from "./QrCodes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QrCodes />
	</React.StrictMode>
);
