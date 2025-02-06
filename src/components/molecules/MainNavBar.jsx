import { Bed, Rss, Skull, Menu, Briefcase, Clock } from "lucide-react";
import { useState } from "react";

const savePath = (path) => {
	localStorage.setItem("path", path);
	window.location.href = path;
};

const InnerMenu = () => {
	return (
		<div
			className="flex flex-col gap-6 justify-center items-center w-10 shadow-md rounded-xl p-4 mt-1
			animate-in slide-in-from-top duration-200 ease-in-out
			hover:scale-105 transition-transform">
			<span
				className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
				onClick={() => savePath("/sleep")}>
				<Bed size={20} />
			</span>
			<span
				className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
				onClick={() => savePath("/")}>
				<Rss size={20} />
			</span>
			<span
				className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
				onClick={() => savePath("/chart")}>
				<Skull size={20} />
			</span>
			<span
				className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
				onClick={() => savePath("/simple")}>
				<Briefcase size={20} />
			</span>
			<span
				className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
				onClick={() => savePath("/clock")}>
				<Clock size={20} />
			</span>
		</div>
	);
};

export const MainNavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="fixed top-1 right-5 z-20">
			<div
				className="flex justify-center items-center
				 shadow-md rounded-full p-2 cursor-pointer size-12
					transition-transform hover:scale-105 active:scale-95">
				<Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
			</div>
			<div
				className={`
				transform transition-all duration-200 ease-in-out origin-top
				${isMenuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}
			`}>
				{isMenuOpen && <InnerMenu />}
			</div>
		</div>
	);
};
