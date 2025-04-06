import PropTypes from "prop-types";
import { Badge } from "./Badge";

export const HighscoreBadge = ({ highscore }) => {
    return (
        <Badge>
            {highscore > 0 &&
                <>
                    <span className="w-10">{highscore}d</span>
                    <span>🏆</span>
                </>
            }
        </Badge>
    )
};

HighscoreBadge.propTypes = {
    highscore: PropTypes.number.isRequired,
};
