import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";

export const DaysSinceBadge = ({ daysSince, withIcon = true }) => {
    if (daysSince === null || daysSince <= 1) return null;

    return (
        <Badge>
            {withIcon && <ClockCounterClockwise size={16} />}
            {daysSince}d
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    daysSince: PropTypes.number.isRequired,
};