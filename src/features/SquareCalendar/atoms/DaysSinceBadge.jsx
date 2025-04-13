import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useDaysSinceColor } from "../useDaysSinceColor";
import classNames from "classnames";
import { useMemo } from "react";

export const DaysSinceBadge = ({ hoursSince, withIcon = true, calendar }) => {
    const { isRed, isYellow } = useDaysSinceColor(calendar);

    // if (daysSince === null) return null;

    const text = useMemo(() => {
        console.log({ hoursSince });
        if (hoursSince === null) return "Never";
        if (hoursSince < 12) return "Today";
        return `${(hoursSince / 24).toFixed(0)}d`;
    }, [hoursSince]);

    return (
        <Badge className={classNames({
            "bg-red-500": isRed,
            "bg-yellow-500": isYellow,
            "bg-green-500": !isRed && !isYellow,
        })}>
            {withIcon && <ClockCounterClockwise size={16} />}
            {text}
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    hoursSince: PropTypes.number,
    withIcon: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
};