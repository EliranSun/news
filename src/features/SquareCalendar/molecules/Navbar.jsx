
import { List, TrayArrowDown, TrayArrowUp, Calendar, CalendarDot, CalendarDots } from "@phosphor-icons/react";

const NavbarButton = ({ icon: Icon, onClick }) => {
    return (
        <button onClick={onClick} className="flex rounded-none
         items-center justify-center h-16 w-full
         bg-transparent border-none">
            <Icon size={24} />
        </button>
    );
};
export const Navbar = () => {
    return (
        <div className="fixed h-24 bg-white dark:bg-black
         bottom-0 border-t w-screen grid grid-cols-6 items-start justify-center">
            <NavbarButton icon={List} onClick={() => { }} />
            <NavbarButton icon={Calendar} onClick={() => { }} />
            <NavbarButton icon={CalendarDot} onClick={() => { }} />
            <NavbarButton icon={CalendarDots} onClick={() => { }} />
            <NavbarButton icon={TrayArrowDown} onClick={() => { }} />
            <NavbarButton icon={TrayArrowUp} onClick={() => { }} />
        </div>
    );
};