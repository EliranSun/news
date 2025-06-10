import PropTypes from "prop-types";
import { Badge } from "./Badge";
import { Fire } from "@phosphor-icons/react";
import classNames from "classnames";

export const StreakBadge = ({ streak, visible = true, size, transparent = false }) => {
    if (!visible || streak === 0) return null;

    return (
        <Badge 
            size={size} 
            transparent={transparent}
            className={classNames("h-fit", {
                "text-red-700 dark:text-red-300": transparent,
                "text-white": !transparent,
            })}>
            <Fire size={size === "big" ? 18 : 16} />
            <span>{streak}d</span>
        </Badge>
    )
};

StreakBadge.propTypes = {
    streak: PropTypes.number.isRequired,
};
