import { Button } from "./Button.jsx";
import classNames from "classnames";
import PropTypes from "prop-types";

export const RoundButton = ({ children, onClick, big }) => {
    return (
        <Button
            className={classNames({
                "relative": true,
                "size-16 text-[16px]": big,
                "size-10 text-[8px]": !big,
                "rounded-full": true,
            })}
            onClick={onClick}>
            {children}
        </Button>
    );
};

RoundButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    big: PropTypes.bool,
};
