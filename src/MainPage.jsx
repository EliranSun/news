import News from "./App.jsx";
import FireRekindle from "./features/FireRekindle.jsx";
import BirthdayQrCodes from "./features/BirthdayQrCodes.jsx";
import { BirthdayImagePage } from "./features/BirthdayImagePage.jsx";
import OnePieceLastEpisodesChart from "./features/OnePieceLastEpisodesChart.jsx";
import { TenThousandHours } from "./features/TenThousandHours.jsx";
import { SleepTrackerComponent } from "./components/organisms/sleep-tracker.tsx";
import { CurriculumVitae } from "./components/organisms/cv.jsx";
import { SimpleTracker } from "./components/organisms/simple-tracker.jsx";
import { Clock } from "./components/organisms/clock.jsx";
import SleepGraph from "./pages/SleepGraph.jsx";
import SleepAdd from "./pages/SleepAdd.jsx";
import Orchuk from "./pages/Orchuk.jsx";
import Squares from "./pages/Squares.jsx";
export const MainPage = ({ savedPath }) => {
	// Use savedPath if provided, otherwise use current path
	const currentPath = savedPath || window.location.pathname;
	const imagePage = new URLSearchParams(window.location.search).get("image_id");

	// Handle image page separately since it's a query parameter
	if (imagePage) {
		return <BirthdayImagePage imageID={imagePage} />;
	}

	switch (true) {
		case currentPath.includes("/qr"):
			return <BirthdayQrCodes />;

		case currentPath.includes("/fire"):
			return <FireRekindle />;

		case currentPath.includes("/chart"):
			return <OnePieceLastEpisodesChart />;

		// case currentPath.includes("/sleep"):
		// 	return <SleepTrackerComponent />;

		case currentPath.includes("/ten"):
			return <TenThousandHours />;

		case currentPath.includes("/cv"):
			return <CurriculumVitae />;

		case currentPath.includes("/simple"):
			return <SimpleTracker />;

		case currentPath.includes("/clock"):
			return <Clock />;

		case currentPath.includes("/sleep-graph"):
			return <SleepGraph />;

		case currentPath.includes("/sleep/add"):
			return <SleepAdd />;

		case currentPath.includes("/orchuk"):
			return <Orchuk />;

		case currentPath.includes("/squares"):
			return <Squares />;

		default:
			return <News />;
	}
};
