import News from "./App.jsx";
import FireRekindle from "./features/FireRekindle.jsx";
import BirthdayQrCodes from "./features/BirthdayQrCodes.jsx";
import { BirthdayImagePage } from "./features/BirthdayImagePage.jsx";
import OnePieceLastEpisodesChart from "./features/OnePieceLastEpisodesChart.jsx";

const path = window.location.pathname;
const firePage = path === "/fire";
const qrPage = path === "/qr";
const chartPage = path === '/chart';
const imagePage = new URLSearchParams(window.location.search).get("image_id");

export const MainPage = () => {
    if (qrPage) {
        return <BirthdayQrCodes/>;
    }
    
    if (firePage) {
        return <FireRekindle/>;
    }
    
    if (imagePage) {
        return <BirthdayImagePage imageID={imagePage}/>;
    }
    
    if (chartPage) {
        return <OnePieceLastEpisodesChart/>;
    }
    
    return <News/>;
};
