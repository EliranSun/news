import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ColorHexMap } from "../constants";

export const ColorWheel = ({ calendar, onColorSelect, initialColor, date = new Date() }) => {
    const [selectedColor, setSelectedColor] = React.useState(initialColor || null);

    useEffect(() => {
        setSelectedColor(initialColor || null);
    }, [date]);

    if (!calendar || !Array.isArray(calendar.colors)) return null;

    const colors = calendar.colors;
    const numColors = colors.length;
    const radius = 60;
    const strokeWidth = 28;
    const center = 80;
    const r = radius;

    // Helper to get arc path for each color
    const getArc = (index) => {
        const angle = (index / numColors) * 2 * Math.PI;
        const nextAngle = ((index + 1) / numColors) * 2 * Math.PI;
        const x1 = center + r * Math.cos(angle - Math.PI / 2);
        const y1 = center + r * Math.sin(angle - Math.PI / 2);
        const x2 = center + r * Math.cos(nextAngle - Math.PI / 2);
        const y2 = center + r * Math.sin(nextAngle - Math.PI / 2);
        return `M ${center} ${center} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
    };

    return (
        <svg
            // className="absolute inset-x-0 bottom-5"
            width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}
            style={{ display: "block", margin: "auto" }}>
            {colors.map((color, i) => (
                <path
                    key={color}
                    d={getArc(i)}
                    fill={ColorHexMap[color] || color}
                    style={{
                        cursor: "pointer",
                        filter: selectedColor === color ? "drop-shadow(0 0 6px #0008)" : undefined,
                        stroke: selectedColor === color ? "#222" : "#fff",
                        strokeWidth: selectedColor === color ? 4 : 2,
                        transition: "stroke 0.2s, filter 0.2s"
                    }}
                    onClick={() => {
                        setSelectedColor(color);
                        onColorSelect && onColorSelect(color);
                    }}
                />
            ))}
            {/* Donut hole */}
            <circle cx={center} cy={center} r={radius - strokeWidth} fill="#fff">

            </circle>
            <text x={center} y={center} textAnchor="middle" dominantBaseline="middle"
                fontSize="12" fill="#000">
                {date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })}
            </text>
        </svg>
    );
};

ColorWheel.propTypes = {
    calendar: PropTypes.shape({
        colors: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    onColorSelect: PropTypes.func,
    initialColor: PropTypes.string,
    date: PropTypes.instanceOf(Date)
};
