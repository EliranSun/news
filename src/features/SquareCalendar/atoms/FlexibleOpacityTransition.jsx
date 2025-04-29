import PropTypes from "prop-types";
import { motion } from "motion/react";
import classNames from "classnames";

export const FlexibleOpacityTransition = ({ children }) => {
    return (
        <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames({
                "flex flex-wrap h-10/12": true,
                "justify-center": true,
            })}>
            {children}
        </motion.div>
    )
}

FlexibleOpacityTransition.propTypes = {
    children: PropTypes.node.isRequired,
};
