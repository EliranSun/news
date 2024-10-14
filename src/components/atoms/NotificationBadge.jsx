import { Button } from "./Button.jsx";
import PropTypes from "prop-types";

export const NotificationBadge = ({ count }) => {
    return (
        <Button
            className={`absolute -right-2 -top-2 shadow-md size-7 mx-auto border border-slate-300 rounded-full text-[8px]`}>
            {count}
        </Button>
    );
};

NotificationBadge.propTypes = {
    count: PropTypes.number.isRequired,
};