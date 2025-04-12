import classNames from "classnames";
import { Note, X } from "@phosphor-icons/react";
import { ColorButton } from "../atoms/ColorButton";
import { useState } from "react";
import PropTypes from "prop-types";
import { DayNoteModal } from "./DayNoteModal";

export const DayDrawer = ({ isOpen, onNoteUpdate, onClose, title, calendar, onColorSelect }) => {
    const [isNoteOpen, setIsNoteOpen] = useState(false);

    return (
        <>
            {isNoteOpen && (
                <DayNoteModal
                    title={title}
                    onClose={() => setIsNoteOpen(false)}
                    onUpdate={onNoteUpdate} />
            )}
            <div className={classNames({
                "flex flex-col w-screen h-[24vh] gap-4 user-select-none": true,
                "absolute inset-x-0 m-auto bg-gray-100 dark:bg-neutral-800": true,
                "rounded-t-2xl p-4 shadow-lg": true,
                "bottom-0": true,
                "hidden": !isOpen
            })}>
                <h1 className="text-base font-bold inter-500 w-full text-center">
                    {title}
                </h1>
                <div className="flex justify-between w-full">
                    <Note
                        size={32}
                        className="cursor-pointer rounded-full p-2 border size-12 border-black dark:border-white"
                        onClick={() => {
                            setIsNoteOpen(true)
                        }} />
                    <div className="flex overflow-x-auto gap-0.5">
                        {calendar.colors.map(color =>
                            <ColorButton
                                key={color}
                                color={color}
                                legend={calendar.legend?.find(item => item.color === color)}
                                onClick={() => onColorSelect(color)}
                            />
                        )}
                        <ColorButton color="⬜️" onClick={() => onColorSelect('clear')} />
                    </div>
                    <X
                        size={20}
                        color="black"
                        weight="bold"
                        className="absolute bottom-10 inset-x-0 m-auto bg-white dark:bg-gray-900 rounded-full size-10 p-2"
                        onClick={onClose} />
                </div>
            </div>
        </>
    )
}

DayDrawer.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    onColorSelect: PropTypes.func.isRequired,
    onNoteUpdate: PropTypes.func.isRequired,
};