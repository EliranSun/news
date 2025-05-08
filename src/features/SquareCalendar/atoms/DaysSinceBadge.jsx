import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useDaysSinceColor } from "../useDaysSinceColor";
import classNames from "classnames";
import { useMemo } from "react";

export const DaysSinceBadge = ({
    hoursSince,
    withIcon = true,
    transparent = false,
    calendar,
    visible = true,
    size
}) => {
    const { isRed, isYellow } = useDaysSinceColor(calendar);

    if (!visible) return null;

    const text = useMemo(() => {
        if (hoursSince === null) return "Never";
        if (hoursSince < 12) return "Today";
        return `${Math.round(hoursSince / 24).toFixed(0)}d`;
    }, [hoursSince]);

    console.log({ text, isRed, isYellow });

    return (
        <Badge
            textBlack={transparent}
            size={size}
            className={classNames('h-fit', transparent ? {
                "text-red-500": isRed,
                "text-yellow-400": isYellow,
                "text-lime-400": !isRed && !isYellow,
            } : {
                "bg-red-500": isRed,
                "bg-yellow-400": isYellow,
                "bg-lime-400": !isRed && !isYellow,
            })}>
            {withIcon && <ClockCounterClockwise size={size === "big" ? 18 : 16} />}
            {text}
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    hoursSince: PropTypes.number,
    withIcon: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
    transparent: PropTypes.bool,
    showValue: PropTypes.bool,
};