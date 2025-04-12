import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Trophy } from "@phosphor-icons/react";

export const HighscoreBadge = ({ highscore, streak }) => {
    if (highscore === 0 || streak === highscore) return null;
    return (
        <Badge>
            <Trophy size={16} />
            <span>{highscore}d</span>
        </Badge>
    )
};

HighscoreBadge.propTypes = {
    highscore: PropTypes.number.isRequired,
};
