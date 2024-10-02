import News from "./App.jsx";
import FireRekindle from "./FireRekindle";
import QrCodes from "./QrCodes";

const queryParams = new URLSearchParams(window.location.search);
const imageID = queryParams.get("image_id");
const fireRekindle = queryParams.get("fire");

export const MainPage = () => {
	if (imageID) {
		return <QrCodes imageID={imageID} />;
	}

	if (fireRekindle) {
		return <FireRekindle />;
	}

	return <News />;
};
