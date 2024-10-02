import { useMemo } from "react";
import Image1 from "./assets/nofar-1.gif";
import Image2 from "./assets/nofar-2.gif";
import Image3 from "./assets/nofar-3.gif";
import Image4 from "./assets/nofar-4.gif";
import Image5 from "./assets/nofar-14.gif";
import Image6 from "./assets/nofar-16.gif";
import Image7 from "./assets/nofar-27.gif";
import Image8 from "./assets/nofar-28.gif";

export const ImagePage = ({ imageID }) => {
	const imageSrc = useMemo(() => {
		switch (imageID) {
			case "5":
				return Image1;

			case "3":
				return Image2;

			case "4":
				return Image3;

			case "6":
				return Image4;

			case "2":
				return Image5;

			case "1":
				return Image6;

			case "12":
				return Image7;

			case "11":
				return Image8;
		}
	}, [imageID]);

	return (
		<div className="flex flex-col items-center h-screen gap-4">
			<img
				src={imageSrc}
				alt="nofar"
			/>
			<p className="font-mono">
				Age: {imageSrc.split("-")[1].replace(".gif", "")}
			</p>
		</div>
	);
};
