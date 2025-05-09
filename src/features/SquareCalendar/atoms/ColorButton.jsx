import classNames from "classnames";
import { getColorsClassList, contrastColor } from "../utils";
import { ColorHexMap } from "../constants";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { Colors } from "../constants";

export const ColorButton = ({ 
color, 
onClick, 
legend, 
count, 
selectedColorClass,
percentage
 }) => {
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
                "border border-black dark:border-white": selectedColorClass !== bgColor,
                "flex gap-3 justify-between items-center shrink-0 min-w-20 min-h-10": true,
                "p-2 rounded-xl text-xs": true,
            })}>
            {legend && <label className="">{legend.name}</label>}
            <span className="text-[8px]">
                {count || null}{percentage ? `(%${percentage})` : null}
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
