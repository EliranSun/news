import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ColorHexMap } from "../constants";
import { PointerContext } from "../PointerContext";

export const ColorWheel = ({ calendar, onColorSelect, initialColor, date = new Date() }) => {
    const [selectedColor, setSelectedColor] = React.useState(initialColor || null);
    const { pointerX, pointerY, setPointerX, setPointerY } = useContext(PointerContext);

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

    // Helper to get label position for each color
    const getLabelPosition = (index) => {
        const angle = ((index + 0.5) / numColors) * 2 * Math.PI; // Midpoint of arc
        const labelRadius = radius + strokeWidth / 3; // Slightly inside the arc
        const x = center + labelRadius * Math.cos(angle - Math.PI / 2);
        const y = center + labelRadius * Math.sin(angle - Math.PI / 2);
        return { x, y };
    };

    if (!pointerX || !pointerY) return null;

    return (
        <svg
            className="absolute"
            style={{
                left: pointerX - center || 0,
                top: pointerY - center / 2 + 25 || 0,
            }}
            width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}>
            {colors.map((color, i) => (
                <g key={color}>
                    <path
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
                    {/* Legend label */}
                    {(() => {
                        const legendEntry = calendar.legend?.find(l => l.color === color);
                        const label = legendEntry?.name || legendEntry?.label || color;
                        const { x, y } = getLabelPosition(i);
                        // Estimate width based on label length and font size (11px)
                        const fontSize = 11;
                        const padding = 6;
                        const labelLength = label.length;
                        const rectWidth = labelLength * fontSize * 0.6 + padding * 2;
                        const rectHeight = fontSize + 4;
                        return (
                            <g>
                                <rect
                                    x={x - rectWidth / 2}
                                    y={y - rectHeight / 2}
                                    width={rectWidth}
                                    height={rectHeight}
                                    rx={6}
                                    // fill={ColorHexMap[color] || color}
                                    fill="#fff"
                                    opacity={0.85}
                                />
                                <text
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={fontSize}
                                    fill="#222"
                                    style={{
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    }}
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })()}
                </g>
            ))}
            {/* Arrow pointing up */}
            <polygon
                points={`
                    ${center},${center - radius - 16}
                    ${center - 16},${center - radius}
                    ${center + 16},${center - radius}
                `}
                fill="#fff"
            />
            {/* Donut hole */}
            <circle
                onClick={() => {
                    setPointerX(null);
                    setPointerY(null);
                }}

                cx={center} cy={center} r={radius - strokeWidth} fill="#fff" />
            <text x={center} y={center} textAnchor="middle" dominantBaseline="middle"
                fontSize="12" fill="#000">
                {date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })}
            </text>
        </svg>
    );
};

ColorWheel.propTypes = {
    calendar: PropTypes.shape({
        colors: PropTypes.arrayOf(PropTypes.string),
        legend: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                label: PropTypes.string,
                color: PropTypes.string
            })
        )
    }).isRequired,
    onColorSelect: PropTypes.func,
    initialColor: PropTypes.string,
    date: PropTypes.instanceOf(Date)
};
