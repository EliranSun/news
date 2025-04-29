import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Fire } from "@phosphor-icons/react";

export const StreakBadge = ({ streak, showValue = true, size }) => {
    if (streak === 0) return null;

    return (
        <Badge className="h-fit" size={size}>
            <Fire size={size === "big" ? 24 : 16} color="red" />
            {showValue && <span>{streak}d</span>}
        </Badge>
    )
};

StreakBadge.propTypes = {
    streak: PropTypes.number.isRequired,
};
