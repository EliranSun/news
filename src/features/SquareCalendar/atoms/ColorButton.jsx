import classNames from "classnames";
import { getColorsClassList, ColorHexMap, contrastColor } from "../utils";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { Colors } from "../constants";

export const ColorButton = ({ color, onClick, legend, count }) => {
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
                "flex flex-col justify-center items-center shrink-0": true,
                "border border-black rounded-full p-2 size-12": true,
            })}>
            {/* <div className={classNames("size-4", } /> */}
            {legend && <label className="text-[8px]">{legend.name}</label>}
            <label className="text-[8px]">{count || 0}</label>
        </button>
    );
};

ColorButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    legend: PropTypes.object,
    count: PropTypes.number,
};
