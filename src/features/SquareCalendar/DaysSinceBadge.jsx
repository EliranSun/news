import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import { useDaysSinceColor } from "./useDaysSinceColor";
import classNames from "classnames";
import { useMemo } from "react";

export const DaysSinceBadge = ({ daysSince, withIcon = true, calendar }) => {
    const { isRed, isYellow } = useDaysSinceColor(calendar);

    // if (daysSince === null) return null;

    const text = useMemo(() => {
        if (daysSince === null) return "Never";
        if (daysSince < 12) return "Today";
        return `${(daysSince / 24).toFixed(0)}d`;
    }, [daysSince]);

    return (
        <Badge className={classNames({
            "bg-red-500": isRed,
            "bg-yellow-500": isYellow,
        })}>
            {withIcon && <ClockCounterClockwise size={16} />}
            {text}
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    daysSince: PropTypes.number.isRequired,
    withIcon: PropTypes.bool,
    calendar: PropTypes.object.isRequired,
};