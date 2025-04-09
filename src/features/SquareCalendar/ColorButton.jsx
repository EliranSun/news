import classNames from "classnames";
import { getColorsClassList } from "./utils";

export const ColorButton = ({ color, onClick, legend }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(getColorsClassList(color), {
                "flex flex-col justify-center items-center rounded p-2 size-12": true,
            })}>
            {/* <div className={classNames("size-4", } /> */}
            {legend && <label className="text-[8px]">{legend.name}</label>}
        </button>
    );
};
