export const Button = ({ children, className, ...rest }) => {
	return (
		<button
			{...rest}
			className={`size-8 bg-gray-100 dark:bg-gray-900 dark:text-white rounded text-xs p-1.5 flex items-center justify-center ${className}`}>
			{children}
		</button>
	);
};