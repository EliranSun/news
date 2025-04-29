import PropTypes from "prop-types";
import classNames from "classnames";

// TODO: Refactor to Pill
export const Badge = ({ children, className = "", textBlack = false }) => {
    return (
        <div className={classNames({
            "w-fit flex gap-1": true,
            "items-center justify-center overflow-hidden": true,
            "px-2": true,
            "text-sm bg-black  rounded-xl": true,
            "text-black dark:text-white": textBlack,
            "text-white": !textBlack,
        }, className)}>
            {children}
        </div>
    )
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    textBlack: PropTypes.bool,
};
