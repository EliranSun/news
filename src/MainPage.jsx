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

export const MainPage = ({ savedPath }) => {
	// Use savedPath if provided, otherwise use current path
	const currentPath = savedPath || window.location.pathname;
	const imagePage = new URLSearchParams(window.location.search).get("image_id");

	// Handle image page separately since it's a query parameter
	if (imagePage) {
		return <BirthdayImagePage imageID={imagePage} />;
	}

	switch (currentPath) {
		case "/qr":
			return <BirthdayQrCodes />;

		case "/fire":
			return <FireRekindle />;

		case "/chart":
			return <OnePieceLastEpisodesChart />;

		case "/sleep":
			return <SleepTrackerComponent />;

		case "/ten":
			return <TenThousandHours />;

		case "/cv":
			return <CurriculumVitae />;

		case "/simple":
			return <SimpleTracker />;

		case "/clock":
			return <Clock />;

		default:
			return <News />;
	}
};
