import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Fire } from "@phosphor-icons/react";

export const StreakBadge = ({ streak, showValue = true }) => {
    if (streak === 0) return null;

    return (
        <Badge className="h-5">
            <Fire size={16} color="red" />
            {showValue && <span>{streak}d</span>}
        </Badge>
    )
};

StreakBadge.propTypes = {
    streak: PropTypes.number.isRequired,
};
