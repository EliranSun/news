import classNames from "classnames";
import { getColorsClassList } from "../utils";
// import { contrastColor } from 'contrast-color';
import { useMemo } from "react";
import PropTypes from "prop-types";
import { Colors } from "../constants";

const contrastColor = ({
    bgColor = '#FFFFFF',
    fgDarkColor = '#000000',
    fgLightColor = '#FFFFFF',
    defaultColor = '#000000',
    threshold = 128,
} = {}) => {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

    let bgColorArray = String(bgColor)
        .toUpperCase()
        .split('')
        .filter(c => hexChars.includes(c))

    switch (bgColorArray.length) {
        case 3:
        case 4:
            bgColorArray = bgColorArray.slice(0, 3).map(c => `${c}${c}`)
            break
        case 6:
        case 8:
            bgColorArray = bgColorArray
                .slice(0, 6)
                .reduce((acc, curr, n, arr) => n % 2 ? [...acc, `${arr[n - 1]}${curr}`] : acc, [])
            break
        default:
            return defaultColor
    }

    const [r, g, b] = bgColorArray.map(h => parseInt(h, 16))
    const yiq = (r * 299 + g * 587 + b * 114) / 1000

    return yiq >= threshold ? fgDarkColor : fgLightColor
}

export const ColorButton = ({ color, onClick, legend }) => {
    const bgColor = useMemo(() => getColorsClassList(color), [color]);
    console.log({ bgColor });
    const textColor = useMemo(() => {
        if (color === Colors.Clear) {
            return "text-black";
        }

        try {
            console.log({ color });
            return contrastColor({ bgColor: color });
        } catch (error) {
            console.trace(error);
            return "text-black";
        }
    }, [color]);

    console.log({ textColor });

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
        </button>
    );
};

ColorButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    legend: PropTypes.object,
};
