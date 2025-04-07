import { Badge } from "./Badge";
import PropTypes from "prop-types";
import { ClockCounterClockwise } from "@phosphor-icons/react";

export const DaysSinceBadge = ({ daysSince, withIcon = true, showToday = false }) => {
    if (daysSince === null || !showToday) return null;

    return (
        <Badge>
            {withIcon && <ClockCounterClockwise size={16} />}
            {(daysSince < 12) ? "Today" : `${(daysSince / 24).toFixed(0)}d`}
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    daysSince: PropTypes.number.isRequired,
    withIcon: PropTypes.bool,
    showToday: PropTypes.bool,
};