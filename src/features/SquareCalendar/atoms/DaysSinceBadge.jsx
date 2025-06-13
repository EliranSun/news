import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useDaysSinceColor } from "../useDaysSinceColor";
import classNames from "classnames";
import { useMemo } from "react";
import { getDaysSinceLastEntry } from "../utils";

export const DaysSinceBadge = ({
    withIcon = true,
    transparent = false,
    calendar,
    visible = true,
    size,
    data = [],
    hideToday = false,
    daysSinceLastEntry
}) => {
    const { isRed, isYellow } = useDaysSinceColor(calendar, data);

    const text = useMemo(() => {
        if (daysSinceLastEntry === null) return "Never";
        if (daysSinceLastEntry === 0) if (hideToday) return null; else return "Today";
        if (daysSinceLastEntry < 12) if (hideToday) return null; else return "Today";
        return `${Math.round(daysSinceLastEntry / 24).toFixed(0)}d ago`;
    }, [daysSinceLastEntry, hideToday]);

    if (!visible || !text) return null;

    return (
        <Badge
            size={size}
            transparent
            className={classNames('h-fit', transparent ? {
                "text-red-700 dark:text-red-300": isRed,
                "text-yellow-700 dark:text-yellow-300": isYellow,
                "text-lime-700 dark:text-lime-300": !isRed && !isYellow,
            } : {
                "bg-red-500": isRed,
                "bg-yellow-400": isYellow,
                "bg-lime-400": !isRed && !isYellow,
            })}>
            {withIcon && <ClockCounterClockwise size={size === "big" ? 18 : 16} weight="bold" />}
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
    data: PropTypes.array,
    visible: PropTypes.bool,
    size: PropTypes.string,
};