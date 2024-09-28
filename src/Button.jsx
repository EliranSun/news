export const Button = ({children, className, ...rest}) => {
    return (
        <button
            {...rest}
            className={`h-8 bg-gray-100 rounded text-xs p-1.5 flex items-center justify-center ${className}`}
            dir="ltr">
            {children}
        </button>
    )
}