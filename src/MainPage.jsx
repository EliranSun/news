import News from "./App.jsx";
import FireRekindle from "./FireRekindle";
import QrCodes from "./QrCodes";
import { ImagePage } from "./ImagePage";
const path = window.location.pathname;
const firePage = path === "/fire";
const qrPage = path === "/qr";
const imagePage = new URLSearchParams(window.location.search).get("image_id");

export const MainPage = () => {
	if (qrPage) {
		return <QrCodes />;
	}

	if (firePage) {
		return <FireRekindle />;
	}

	if (imagePage) {
		return <ImagePage imageID={imagePage} />;
	}

	return <News />;
};
