import PropTypes from "prop-types";
import { List, TrayArrowDown, TrayArrowUp, Calendar, CalendarDot, CalendarDots } from "@phosphor-icons/react";
import { exportCalendarData, importCalendarData } from "../utils";

const NavbarButton = ({ icon: Icon, onClick, label }) => {
    return (
        <button onClick={onClick} className="flex flex-col rounded-none
         items-center justify-center h-16 w-full
         bg-transparent border-none">
            <Icon size={24} />
            {/* <label className="text-[8px]">{label}</label> */}
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
            <NavbarButton label="list" icon={List} onClick={onListClick} />
            <NavbarButton label="day" icon={Calendar} onClick={() => { }} />
            <NavbarButton label="month" icon={CalendarDot} onClick={() => { }} />
            <NavbarButton label="year" icon={CalendarDots} onClick={() => { }} />
            <NavbarButton label="import" icon={TrayArrowDown} onClick={importCalendarData} />
            <NavbarButton label="export" icon={TrayArrowUp} onClick={exportCalendarData} />
        </div>
    );
};

Navbar.propTypes = {
    onListClick: PropTypes.func.isRequired
};