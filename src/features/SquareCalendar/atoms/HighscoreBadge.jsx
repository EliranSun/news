import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Trophy } from "@phosphor-icons/react";
import classNames from "classnames";

export const HighscoreBadge = ({ highscore, visible, streak, size, transparent = false }) => {
    if (!visible || highscore === 0 || streak === highscore) return null;

    return (
        <Badge 
            size={size} 
            transparent={transparent}
            className={classNames("h-fit", {
                "text-yellow-700 dark:text-yellow-300": transparent,
                "text-white": !transparent,
            })}>
            <Trophy size={size === "big" ? 18 : 16}/>
            <span>{highscore}d</span>
        </Badge>
    )
};

HighscoreBadge.propTypes = {
    highscore: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    showValue: PropTypes.bool,
    size: PropTypes.string,
};
