import PropTypes from "prop-types";
import classNames from "classnames";

// TODO: Refactor to Pill
export const Badge = ({ children, className = "" }) => {
    return (
        <div className={classNames(className, {
            "w-fit flex gap-1": true,
            "items-center justify-center overflow-hidden": true,
            "text-white px-2": true,
            "text-sm bg-black rounded-xl": true,
        })}>
            {children}
        </div>
    )
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
