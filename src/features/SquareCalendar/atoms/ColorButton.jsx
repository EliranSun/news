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
        <button
            onClick={onClick}
            style={{ color: textColor }}
            className={classNames(bgColor, {
                "w-full flex justify-between items-center shrink-0": true,
                "border border-black p-2 h-7 rounded-xl text-xs": true,
            })}>
            {legend && <label className="">{legend.name}</label>}
            <span className="">
                {count || null}{percentage ? `- %${percentage}` : null}
            </span>
        </button>
    );
};

ColorButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    legend: PropTypes.object,
    count: PropTypes.number,
};
