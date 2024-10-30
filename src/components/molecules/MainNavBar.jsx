import { Bed, Rss, Skull, Menu } from "lucide-react";
import { useState } from "react";
const savePath = (path) => {
	localStorage.setItem("path", path);
	window.location.href = path;
};

const InnerMenu = () => {
	return (
		<div className="flex flex-col gap-4 justify-center items-center w-full w-10 bg-white shadow-md rounded-lg p-4">
			<span onClick={() => savePath("/sleep")}>
				<Bed size={20} />
			</span>
			<span onClick={() => savePath("/")}>
				<Rss size={20} />
			</span>
			<span onClick={() => savePath("/chart")}>
				<Skull size={20} />
			</span>
		</div>
	);
};

export const MainNavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="fixed top-2 right-2 z-20">
			<div className="bg-white shadow-md rounded-full p-2 cursor-pointer size-10">
				<Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
			</div>
			{isMenuOpen ? <InnerMenu /> : null}
		</div>
	);
};
