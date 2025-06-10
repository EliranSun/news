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
import SquareCalendars from "./features/SquareCalendar/SquareCalendars.jsx";
import { PhysicsDemoWrapper } from "./App.jsx";
import { useEffect } from "react";

export const MainPage = ({ savedPath }) => {
	// Use savedPath if provided, otherwise use current path
	const currentPath = savedPath || window.location.pathname;
	const imagePage = new URLSearchParams(window.location.search).get("image_id");

	useEffect(() => {
		const updateThemeColor = () => {
			const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const themeColor = isDarkMode ? "oklch(21.6% 0.006 56.043)" : "#FFFFFF";
			const metaThemeColor = document.querySelector("meta[name=theme-color]");
			if (metaThemeColor) {
				metaThemeColor.setAttribute("content", themeColor);
			} else {
				const newMetaThemeColor = document.createElement("meta");
				newMetaThemeColor.setAttribute("name", "theme-color");
				newMetaThemeColor.setAttribute("content", themeColor);
				document.head.appendChild(newMetaThemeColor);
			}
		};

		updateThemeColor();

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const themeChangeHandler = () => updateThemeColor();
		mediaQuery.addListener(themeChangeHandler);

		return () => {
			mediaQuery.removeListener(themeChangeHandler); // Cleanup listener on component unmount
		};
	}, []);

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

		case currentPath.includes("/square-calendar"):
			return <SquareCalendars />;

		case currentPath.includes("/physics"):
			return <PhysicsDemoWrapper />;

		case currentPath.includes("/news"):
			return <News />;

		default:
			return <SquareCalendars />;
	}
};
