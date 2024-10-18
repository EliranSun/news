import { Button } from "./Button.jsx";
import PropTypes from "prop-types";

export const NotificationBadge = ({ count, size = 24 }) => {
    return (
        <Button
            style={{
                width: size,
                height: size,
            }}
            className={`absolute -right-2 -top-2 shadow-md 
        mx-auto border border-slate-300 rounded-full text-[8px]`}>
            {count}
        </Button>
    );
};

NotificationBadge.propTypes = {
    count: PropTypes.number.isRequired,
};