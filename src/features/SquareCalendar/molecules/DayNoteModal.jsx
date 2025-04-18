import classNames from "classnames";
import { X, Check } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

export const DayNoteModal = ({
    title,
    note: initialNote,
    onClose,
    onUpdate,
    isOpen
}) => {
    const [note, setNote] = useState(initialNote);

useEffect(() => setNote(initialNote), [initialNote]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={classNames({
                "fixed inset-0 z-20 m-auto backdrop-blur w-screen h-screen": true,
                "pointer-events-none": !isOpen
            })}
        >
            <h1 className="text-base font-bold inter-500 w-full my-8 text-center">{title}</h1>
            <textarea
                value={note}
                placeholder="Note"
                onChange={event => setNote(event.target.value)}
                
                className={classNames({
                    "m-4 p-4 rounded-lg font-mono": true,
                    "border w-[calc(100%-2rem)] h-[calc(100%-15rem)] min-h-10": true,
                })}
            />
            <div className="absolute bottom-20 inset-x-0 m-auto flex gap-4 items-center justify-center">
            <X
                size={20}
                weight="bold"
                className="border
                bg-white dark:bg-gray-900 rounded-full size-10 p-2"
                onClick={onClose} />
                <Check
                size={20}
                weight="bold"
                className=" border
                bg-white dark:bg-gray-900 rounded-full size-10 p-2"
                onClick={() => onUpdate(note)} />
                </div>
        </motion.div>,
        document.getElementById('note-modal-portal') || document.body

    );
}

DayNoteModal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    note: PropTypes.string,
};
