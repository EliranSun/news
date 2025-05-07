import PropTypes from "prop-types";
import { exportCalendarData, importCalendarData } from "../utils";
import {
    List,
    TrayArrowDown,
    TrayArrowUp,
    TextAa,
    CalendarDots,
    Cube,
    X,
    ListBullets,
    Note,
    Timer,
    Rows
} from "@phosphor-icons/react";
import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";

const NavbarButton = ({
    icon: Icon,
    onClick,
    isSelected
}) => {
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
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    isSelected: PropTypes.bool,
};

const NavbarMenuItem = ({ icon, label, onClick }) => {
    return (
        <div className="flex w-full p-4 bg-gray-50 dark:bg-gray-900  odd:bg-gray-100 dark:odd:bg-gray-900" onClick={onClick}>
            <span className="w-10">{icon}</span>
            {label}
        </div>
    );
};

NavbarMenuItem.propTypes = {
    icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const OpacityTransition = ({ children, isOpen }) => {
    return (
        <motion.div
            className={classNames({
                "pointer-events-none": !isOpen,
                "pointer-events-auto": isOpen,
            })}
            transition={{ duration: 0.3 }}
            animate={{ opacity: isOpen ? 1 : 0, }}>
            {children}
        </motion.div>
    );
};

OpacityTransition.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export const Navbar = ({ onListClick, selectedItem, onPhysicsClick, onItemClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <OpacityTransition isOpen={isMenuOpen}>
                <div className="fixed z-20 inset-0 m-auto flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center justify-center h-fit
                    text-lg gap-0 p-4 rounded-lg
                    w-10/12 m-auto bg-white dark:bg-black">
                        <NavbarMenuItem
                            icon={<Note size={24} />}
                            isSelected={selectedItem === "note"}
                            label="Notes list"
                            onClick={() => {
                                onItemClick("note");
                                setIsMenuOpen(false);
                            }}
                        />
                        <NavbarMenuItem icon={<Cube size={24} />} label="CSS cubes" onClick={() => {
                            onPhysicsClick();
                            setIsMenuOpen(false);
                        }} />
                        <NavbarMenuItem icon={<TrayArrowDown size={24} />} label="Import" onClick={importCalendarData} />
                        <NavbarMenuItem icon={<TrayArrowUp size={24} />} label="Export" onClick={exportCalendarData} />
                        <NavbarMenuItem icon={<X size={24} />} label="Close" onClick={() => { setIsMenuOpen(false) }} />
                    </div>
                </div>
            </OpacityTransition>
            <div className="fixed h-24 bg-white dark:bg-black
         bottom-0 border-t w-screen grid grid-cols-6 items-start justify-center">
                <NavbarButton
                    isSelected={selectedItem === "list"}
                    label="list"
                    icon={ListBullets}
                    onClick={onListClick}
                />
                <NavbarButton
                    isSelected={selectedItem === "day"}
                    label="day"
                    icon={TextAa}
                    onClick={() => { onItemClick("day") }}
                />
                <NavbarButton
                    isSelected={selectedItem === "hour"}
                    label="hour"
                    icon={Timer}
                    onClick={() => { onItemClick("hour") }}
                />
                <NavbarButton
                    isSelected={selectedItem === "feed"}
                    label="feed"
                    icon={Rows}
                    onClick={() => { onItemClick("feed") }}
                />
                <NavbarButton
                    isSelected={selectedItem === "year"}
                    label="year" icon={CalendarDots}
                    onClick={() => { onItemClick("year") }}
                />
                <NavbarButton
                    label="list"
                    icon={List}
                    onClick={() => { setIsMenuOpen(true) }} />
            </div>
        </>
    );
};

Navbar.propTypes = {
    onListClick: PropTypes.func.isRequired,
    selectedItem: PropTypes.string.isRequired,
    onPhysicsClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired
};