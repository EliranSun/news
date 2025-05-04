import classNames from "classnames";
import { getColorsClassList, contrastColor } from "../utils";
import { ColorHexMap } from "../constants";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { Colors } from "../constants";

export const ColorButton = ({ color, onClick, legend, count, percentage }) => {
    const bgColor = useMemo(() => getColorsClassList(color), [color]);
    const textColor = useMemo(() => {
        if (color === Colors.Clear) {
            return "text-black";
        }

        try {
            return contrastColor({ bgColor: ColorHexMap[color] });
        } catch (error) {
            console.trace(error);
            return "text-black";
        }
    }, [color]);

    return (
        <div className="flex flex-col justify-center items-center shrink-0 w-full">
            <button
                onClick={onClick}
                style={{ color: textColor }}
                className={classNames(bgColor, {
                    "flex flex-col justify-center items-center shrink-0": true,
                    "border border-black p-2 w-full h-7 rounded-xl": true,
                })}>
                {/* <div className={classNames("size-4", } /> */}
                {legend && <label className="text-xs">{legend.name}</label>}
            </button>
            {count || null} {percentage || null}
        </div>
    );
};

ColorButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    legend: PropTypes.object,
    count: PropTypes.number,
};
