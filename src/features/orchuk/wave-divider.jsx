import PropTypes from "prop-types";
import "./wave-divider.css";

// Different wave pattern options
const wavePatterns = {
    default: [
        {
            d: "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
            opacity: 0.25
        },
        {
            d: "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
            opacity: 0.5
        },
        {
            d: "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z",
            opacity: 1
        }
    ],
    gentle: [
        {
            d: "M0,0V30c150,30,350-30,500,0s350,30,500,0s200-30,200-30V0Z",
            opacity: 0.3
        },
        {
            d: "M0,0V20c200,20,300-20,600,0s400-10,600,0V0Z",
            opacity: 0.6
        },
        {
            d: "M0,0V10c150,15,350-15,700,10s350-15,500-10V0Z",
            opacity: 1
        }
    ],
    sharp: [
        {
            d: "M0,0V40l100,-20l100,40l100,-30l100,20l100,-40l100,30l100,-20l100,40l100,-30l100,20l100,-40l100,30V0Z",
            opacity: 0.3
        },
        {
            d: "M0,0V30l120,-30l120,30l120,-30l120,30l120,-30l120,30l120,-30l120,30l120,-30l120,30V0Z",
            opacity: 0.6
        },
        {
            d: "M0,0V20l200,-20l200,20l200,-20l200,20l200,-20l200,20V0Z",
            opacity: 1
        }
    ],
    smooth: [
        {
            d: "M0,0V20c300,80,900,-80,1200,20V0Z",
            opacity: 0.3
        },
        {
            d: "M0,0V15c200,60,1000,-60,1200,15V0Z",
            opacity: 0.6
        },
        {
            d: "M0,0V10c400,40,800,-40,1200,10V0Z",
            opacity: 1
        }
    ]
};

export const WaveDivider = ({
    colors,
    position = "top",
    inverted = false,
    pattern = "default",
    height = 70,
    zIndex = 10,
    fillColor
}) => {
    // Determine the fill color based on the provided colors and position
    const getFillColor = () => {
        if (colors.custom) {
            return position === "top"
                ? (inverted ? colors.custom.primary : "white")
                : (inverted ? "white" : colors.custom.primary);
        }

        // For default color schemes, use the appropriate Tailwind classes
        const bgClass = position === "top"
            ? (inverted ? colors.bg.section.replace("bg-", "") : "white")
            : (inverted ? "white" : colors.bg.section.replace("bg-", ""));

        // If using Tailwind classes, return a placeholder that will be replaced with a class
        return bgClass === "white" ? "#FFFFFF" : "var(--wave-color)";
    };

    // Determine the CSS class for the fill color if using Tailwind
    const getColorClass = () => {
        if (colors.custom) return "";

        const bgClass = position === "top"
            ? (inverted ? colors.bg.section : "")
            : (inverted ? "" : colors.bg.section);

        return bgClass.replace("bg-", "text-");
    };

    // Get the selected wave pattern or default to the default pattern
    const selectedPattern = wavePatterns[pattern] || wavePatterns.default;
    //  bg-[#4A90E2] ${getColorClass()}
    return (
        <div
            className={`wave-divider w-full 
                overflow-hidden ${position === "bottom" ? "rotate-180" : ""} 
               `}
            style={{
                height: `${height}px`,
                position: 'absolute',
                left: 0,
                right: 0,
                [position]: 0,
                transform: position === "bottom"
                    ? "translateY(-0%) rotate(180deg)"
                    : "translateY(-0%)",
                zIndex: zIndex,
                pointerEvents: 'none' // Allows clicking through the wave
            }}
        >
            <svg
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{
                    display: "block"
                }}
            >
                {selectedPattern.map((pathData, index) => (
                    <path
                        key={index}
                        d={pathData.d}
                        opacity={pathData.opacity}
                        fill={fillColor || "white"}
                    // stroke={getFillColor()}
                    />
                ))}
            </svg>
        </div>
    );
};

WaveDivider.propTypes = {
    colors: PropTypes.object.isRequired,
    position: PropTypes.oneOf(["top", "bottom"]),
    inverted: PropTypes.bool,
    pattern: PropTypes.oneOf(["default", "gentle", "sharp", "smooth"]),
    height: PropTypes.number,
    zIndex: PropTypes.number
}; 