import classNames from "classnames";
import PropTypes from "prop-types";
export const Column = ({ children, size = "normal" }) => {
    return (
        <div className={classNames({
            "flex flex-col text-center": true,
            "w-14": size === "normal" || !size,
            "w-fit": size === "narrow",
            "w-full": size === "full",
        })}>
            {children}
        </div>
    )
};

Column.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
};