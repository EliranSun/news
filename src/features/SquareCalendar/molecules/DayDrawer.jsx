import classNames from "classnames";
import { Note, X } from "@phosphor-icons/react";
import { ColorButton } from "../atoms/ColorButton";
import { useState } from "react";
import PropTypes from "prop-types";
import { DayNoteModal } from "./DayNoteModal";
import { motion } from "motion/react"

export const DayDrawer = ({ isOpen, onNoteUpdate, onClose, title, calendar, onColorSelect, note }) => {
    const [isNoteOpen, setIsNoteOpen] = useState(false);

    return (
        <>
            <DayNoteModal
                title={title}
                note={note}
                isOpen={isNoteOpen}
                onClose={() => setIsNoteOpen(false)}
                onUpdate={note => {
                    onNoteUpdate(note);
                    setIsNoteOpen(false);
                }} />
            <motion.div
                className="absolute inset-x-0 bottom-0 z-10"
                animate={{ y: isOpen ? 10 : "100%" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className={classNames({
                    "flex flex-col w-screen h-[24vh] gap-4 user-select-none": true,
                    "m-auto bg-gray-100 dark:bg-neutral-800": true,
                    "rounded-t-2xl shadow-lg": true,
                    "p-4": true,
                    // "absolute inset-x-0 bottom-0": false, // Removed as it's now on the motion.div
                    // "absolute z-10": true, // Removed as it's now on the motion.div
                    // "hidden": !isOpen
                })}>
                    <h1 className="text-base font-bold inter-500 w-full text-center">
                        {title}
                    </h1>
                    <div className="flex justify-between gap-4 w-full">
                        <Note
                            size={32}
                            weight={note ? "fill" : "regular"}
                            className="shrink-0cursor-pointer rounded-full p-2 border size-12 border-black dark:border-white"
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
                            className="absolute bottom-10 inset-x-0 border m-auto bg-white dark:bg-gray-900 rounded-full size-10 p-2"
                            onClick={onClose} />
                    </div>
                </div>
            </motion.div>
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
    note: PropTypes.string,
};