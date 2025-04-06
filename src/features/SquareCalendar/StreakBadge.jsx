import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Fire } from "@phosphor-icons/react";

export const StreakBadge = ({ streak }) => {
    if (streak === 0) return null;

    return (
        <Badge>
            <Fire size={16} />
            <span>{streak}d</span>
        </Badge>
    )
};

StreakBadge.propTypes = {
    streak: PropTypes.number.isRequired,
};
