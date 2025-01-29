import PropTypes from "prop-types";

export const Button = ({ children, className, ...rest }) => {
	return (
		<button
			{...rest}
			className={`border border-gray-100 text-xs p-1.5
			 flex items-center justify-center ${className}`}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
