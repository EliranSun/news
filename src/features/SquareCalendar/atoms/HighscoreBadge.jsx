import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Trophy } from "@phosphor-icons/react";

export const HighscoreBadge = ({ highscore, visible, streak, size, transparent = false }) => {
    if (!visible || highscore === 0 || streak === highscore) return null;

    return (
        <Badge className="h-fit" size={size} transparent={transparent}>
            <Trophy size={size === "big" ? 18 : 16} color="gold" />
            <span className={transparent ? "text-yellow-400" : "text-white"}>{highscore}d</span>
        </Badge>
    )
};

HighscoreBadge.propTypes = {
    highscore: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    showValue: PropTypes.bool,
    size: PropTypes.string,
};
