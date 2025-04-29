import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Trophy } from "@phosphor-icons/react";

export const HighscoreBadge = ({ highscore, streak, showValue = true, size }) => {
    if (highscore === 0 || streak === highscore) return null;

    return (
        <Badge className="h-fit" size={size}>
            <Trophy size={size === "big" ? 24 : 16} color="gold" />
            {showValue && <span>{highscore}d</span>}
        </Badge>
    )
};

HighscoreBadge.propTypes = {
    highscore: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    showValue: PropTypes.bool,
    size: PropTypes.string,
};
