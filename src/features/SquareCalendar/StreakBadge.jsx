import PropTypes from "prop-types";
import { Badge } from "./Badge";

export const StreakBadge = ({ streak }) => {
    return (
        <Badge>
            {streak > 0 &&
                <>
                    <span className="w-10">{streak}d</span>
                    <span>🔥</span>
                </>
            }
        </Badge>
    )
};

StreakBadge.propTypes = {
    streak: PropTypes.number.isRequired,
};
