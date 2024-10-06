import { useMemo } from "react";
import Image1 from "./assets/nofar-1.gif";
import Image2 from "./assets/nofar-2.gif";
import Image3 from "./assets/nofar-3.gif";
import Image4 from "./assets/nofar-4.gif";
import Image7 from "./assets/nofar-27.gif";
import Image8 from "./assets/nofar-28.gif";

export const ImagePage = ({ imageID }) => {
	const pageData = useMemo(() => {
		switch (imageID) {
			case "5":
				return {
					src: Image1,
					age: "1",
					caption: `אוכלת גרבר בגיל שנה, וזה ממש בסדר,\n\rאהבה לאוכל, הרי, גוברת על כל היתר.\nאהבות ושנאות מגיעים ישר מהילדות,\nאז איך זה שהיום את בקושי אוהבת תות?!`,
				};

			case "3":
				return {
					src: Image2,
					age: "2",
					caption: `אתה בוא! היא קוראת בגיל שנתיים\nבוא בוא, העצבים עולים כפליים\nזה מצחיק איך בגיל כל כך מוקדם אפשר לראות אישיות,\nרק חבל שהיום זה בא על חשבון הבריאות (שלי)\n`,
				};

			case "4":
				return {
					src: Image3,
					age: "3",
					caption: `תראו אותך שרה לה, כבר לקראת גיל שלוש\nאיזה זמרת פרפורמרית, בקדמת הבמה, נותנת בראש\nיש לך אישיות בועטת בגיל מאוד צעיר…\nהכל תמיד על 200, בלי בושה ובלי להסתיר!`,
				};

			case "6":
				return {
					src: Image4,
					age: "4",
					caption: `היפראקטיביות לשמה ותלתלים לרוב,\nאישיות כה קסומה שבא לך רק לחבק קרוב.\nאיפה התלתל? אמא אותך שואלת,\nהנה הוא פה! בפזילה ובחיוך את אומרת`,
				};

			case "11":
				return {
					src: Image7,
					age: "27",
					caption: `מאמנת את אלה במסירות ובהתמדה,\nכזאת היא דמותך, מעוררת השראה.\nאהבה אינסופית לחיות ולכלבים,\nזה מה שאני אוהב בך - תמיד דואגת לאחרים`,
				};

			case "12":
				return {
					src: Image8,
					age: "28",
					caption: `והנה אנחנו לקראת סוף המסע…\nאת מאכילה במביים בחיוך ובאהבה\n29 שנים חלפו להן כך במהירות ובזרימה,\nעכשיו כל שנותר זה… מתנה (כמעט)!`,
				};
		}
	}, [imageID]);

	return (
		<div className="flex flex-col items-center h-screen gap-4">
			<img
				src={pageData.src}
				alt="nofar"
			/>
			<p className="font-mono">Age: {pageData.age}</p>
			<p
				className="w-[90vw] m-auto text-right"
				dir="rtl">
				{pageData.caption}
			</p>
		</div>
	);
};
