import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Trophy } from "@phosphor-icons/react";

export const HighscoreBadge = ({ highscore, streak, showValue = true }) => {
    if (highscore === 0 || streak === highscore) return null;

    return (
        <Badge className="h-5 ">
            <Trophy size={16} color="gold" />
            {showValue && <span>{highscore}d</span>}
        </Badge>
    )
};

HighscoreBadge.propTypes = {
    highscore: PropTypes.number.isRequired,
};
