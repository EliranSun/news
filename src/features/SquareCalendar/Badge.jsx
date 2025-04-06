import PropTypes from "prop-types";

export const Badge = ({ children }) => {
    return (
        <div className="w-full flex gap-0 items-center justify-center overflow-hidden text-sm">
            {children}
        </div>
    )
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
};
