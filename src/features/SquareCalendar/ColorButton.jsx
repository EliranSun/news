import classNames from "classnames";
import { getColorsClassList } from "./utils";

export const ColorButton = ({ color, onClick, legend }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col justify-center items-center rounded-full p-2">
            <div className={classNames("size-4", getColorsClassList(color))} />
            {legend && <label className="text-xs">{legend.name}</label>}
        </button>
    );
};
