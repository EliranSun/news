import News from "./App.jsx";
import FireRekindle from "./FireRekindle";
import QrCodes from "./QrCodes";

const path = window.location.pathname;
const firePage = path === "/fire";
const imagePage = new URLSearchParams(window.location.search).get("image_id");

export const MainPage = () => {
	if (imagePage) {
		return <QrCodes imageID={imagePage} />;
	}

	if (firePage) {
		return <FireRekindle />;
	}

	return <News />;
};
