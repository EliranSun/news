import PropTypes from "prop-types";

export const Badge = ({ children }) => {
    return (
        <div className="border w-fit flex gap-1 
        items-center justify-center overflow-hidden 
        text-white px-2
        text-sm bg-black rounded-md">
            {children}
        </div>
    )
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
};
