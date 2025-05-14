import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Fire } from "@phosphor-icons/react";

export const StreakBadge = ({ streak, visible = true, size, transparent = false }) => {
    if (!visible) return null;

    return (
        <Badge className="h-fit" size={size} transparent={transparent}>
            <Fire size={size === "big" ? 18 : 16} className="text-red-400" />
            <span className={transparent ? "text-red-400" : "text-white"}>{streak}d</span>
        </Badge>
    )
};

StreakBadge.propTypes = {
    streak: PropTypes.number.isRequired,
};
