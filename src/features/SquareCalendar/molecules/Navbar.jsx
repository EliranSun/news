import PropTypes from "prop-types";
import { exportCalendarData, importCalendarData } from "../utils";
import {
    List,
    TrayArrowDown,
    TrayArrowUp,
    Calendar,
    CalendarDot,
    CalendarDots,
    Cube
} from "@phosphor-icons/react";
import classNames from "classnames";

const NavbarButton = ({ icon: Icon, onClick, 
label, isSelected }) => {
    return (
        <button onClick={onClick} className={classNames({
            "flex flex-col rounded-none": true,
         "items-center justify-center h-16 w-full": true,
         "bg-transparent border-none": true,
        "text-amber-500": isSelected,
        })}>
            <Icon size={24} />
            {/* <label className="text-[8px]">{label}</label> */}
        </button>
    );
};

NavbarButton.propTypes = {
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
};

export const Navbar = ({ onListClick, selectedItem, onPhysicsClick,  }) => {
    return (
        <div className="fixed h-24 bg-white dark:bg-black
         bottom-0 border-t w-screen grid grid-cols-7 items-start justify-center">
            <NavbarButton 

            label="list" icon={List} onClick={onListClick} />
            <NavbarButton 
                        isSelected={selectedItem === "day"}
            label="day" icon={Calendar} onClick={() => { }} />
            <NavbarButton 
            isSelected={selectedItem === "month"}
            label="month" icon={CalendarDot} onClick={() => { }} />
            <NavbarButton 
        isSelected={selectedItem === "year"}
            label="year" icon={CalendarDots} onClick={() => { }} />
            <NavbarButton 
            
            label="import" icon={TrayArrowDown} onClick={importCalendarData} />
            <NavbarButton 
            
            label="export" icon={TrayArrowUp} onClick={exportCalendarData} />
            <NavbarButton 
            
            label="physics" icon={Cube} onClick={onPhysicsClick} />
        </div>
    );
};

Navbar.propTypes = {
    onListClick: PropTypes.func.isRequired
};