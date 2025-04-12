import classNames from "classnames";
import { X } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useState } from "react";

export const DayNoteModal = ({
    title,
    onClose,
    onUpdate
}) => {
    const [note, setNote] = useState("");

    return (
        <div className="fixed inset-0 z-20 m-auto backdrop-blur w-screen h-screen">
            <h1 className="text-base font-bold inter-500 w-full my-8 text-center">{title}</h1>
            <textarea
                value={note}
                placeholder="Note"
                onChange={event => setNote(event.target.value)}
                onBlur={() => onUpdate(note)}
                className={classNames({
                    "m-4 p-4 rounded-lg font-mono": true,
                    "border w-[calc(100%-2rem)] h-[calc(100%-15rem)] min-h-10": true,
                })}
            />
            <X
                size={20}
                color="black"
                weight="bold"
                className="absolute bottom-20 inset-x-0 m-auto bg-white dark:bg-gray-900 rounded-full size-10 p-2"
                onClick={onClose} />
        </div>
    )
}

DayNoteModal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};
