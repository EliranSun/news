import classNames from "classnames";

export const CalendarButton = ({ children, isSelected, ...rest }) =>
    <button 
        className={classNames("min-w-20 shrink-0", {
        "bg-black text-white": isSelected,
        "text-sm flex": true,
    })} {...rest}>
    {children}
    </button>;
