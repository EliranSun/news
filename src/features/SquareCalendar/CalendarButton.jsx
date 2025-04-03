import classNames from "classnames";
export const CalendarButton = ({ children, isSelected, ...rest }) =>
    <button className={classNames("min-w-28 shrink-0", {
        "bg-black text-white": isSelected
    })} {...rest}>{children}</button>;
