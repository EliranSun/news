import classNames from "classnames";
import PropTypes from "prop-types";

export const Pill = ({ isSelected, onClick, children }) => {
    return (
        <div
            className={classNames("min-w-fit px-3 py-1 rounded-full cursor-pointer transition-colors", {
                "bg-gray-200 hover:bg-gray-300": !isSelected,
                "bg-black text-white hover:bg-gray-800": isSelected
            })}
            onClick={onClick}
        >
            {children}
        </div>
    );
};


Pill.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};


