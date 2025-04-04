import classNames from "classnames";
import { getColorsClassList } from "./utils";

export const ColorButton = ({ color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex justify-center items-center rounded-full p-2">
            <div className={classNames("size-4", getColorsClassList(color))} />
        </button>
    );
};
