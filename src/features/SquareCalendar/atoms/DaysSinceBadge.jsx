import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useDaysSinceColor } from "../useDaysSinceColor";
import classNames from "classnames";
import { useMemo } from "react";

export const DaysSinceBadge = ({ hoursSince, withIcon = true, calendar, showValue = true }) => {
    const { isRed, isYellow } = useDaysSinceColor(calendar);

    // if (daysSince === null) return null;

    const text = useMemo(() => {
        if (hoursSince === null) return "Never";
        if (hoursSince < 12) return "Today";
        return `${Math.round(hoursSince / 24).toFixed(0)}d`;
    }, [hoursSince]);

    return (
        <Badge className={classNames('h-5', {
            "bg-red-500": isRed,
            "bg-yellow-400": isYellow,
            "bg-lime-400": !isRed && !isYellow,
        })}>
            {withIcon && <ClockCounterClockwise size={16} />}
            {showValue && text}
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    hoursSince: PropTypes.number,
    withIcon: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
};