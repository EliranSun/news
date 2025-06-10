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
    percentage,
    display = "default"
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
                // "border-4 border-black dark:border-white": selectedColorClass === bgColor,
                "grayscale-0 opacity-100": selectedColorClass === bgColor,
                "grayscale-[90%] opacity-40": selectedColorClass !== bgColor,
                // "border border-black dark:border-white": selectedColorClass !== bgColor,
                "flex gap-3 justify-between items-center min-h-10": true,
                "p-2 rounded-xl text-xs shrink-0 min-w-20": display !== "compact",
                "p-1 rounded-none text-xs min-w-10": display === "compact",
            })}>
            {legend &&
                <label className={display === "compact" ? "text-[8px]" : ""}>
                    {display === "compact" ? legend.name.slice(0, 5) : legend.name}
                </label>}
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
