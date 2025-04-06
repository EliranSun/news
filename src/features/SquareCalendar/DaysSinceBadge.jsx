import { Badge } from "./Badge";
import PropTypes from "prop-types";

export const DaysSinceBadge = ({ daysSince }) => {
    if (daysSince === null || daysSince <= 1) return null;

    return (
        <Badge>
            <span className="w-10">{daysSince}d</span>
            <span>🔄</span>
        </Badge>
    )
};

DaysSinceBadge.propTypes = {
    daysSince: PropTypes.number.isRequired,
};