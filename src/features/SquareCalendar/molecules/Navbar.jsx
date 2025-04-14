import PropTypes from "prop-types";
import { List, TrayArrowDown, TrayArrowUp, Calendar, CalendarDot, CalendarDots } from "@phosphor-icons/react";
import { exportCalendarData, importCalendarData } from "../utils";

const NavbarButton = ({ icon: Icon, onClick }) => {
    return (
        <button onClick={onClick} className="flex rounded-none
         items-center justify-center h-16 w-full
         bg-transparent border-none">
            <Icon size={24} />
        </button>
    );
};

NavbarButton.propTypes = {
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
};

export const Navbar = ({ onListClick }) => {
    return (
        <div className="fixed h-24 bg-white dark:bg-black
         bottom-0 border-t w-screen grid grid-cols-6 items-start justify-center">
            <NavbarButton icon={List} onClick={onListClick} />
            <NavbarButton icon={Calendar} onClick={() => { }} />
            <NavbarButton icon={CalendarDot} onClick={() => { }} />
            <NavbarButton icon={CalendarDots} onClick={() => { }} />
            <NavbarButton icon={TrayArrowDown} onClick={importCalendarData} />
            <NavbarButton icon={TrayArrowUp} onClick={exportCalendarData} />
        </div>
    );
};

Navbar.propTypes = {
    onListClick: PropTypes.func.isRequired
};