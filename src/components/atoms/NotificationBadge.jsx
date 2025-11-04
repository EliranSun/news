import PropTypes from "prop-types";

export const NotificationBadge = ({ count, size = 24 }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className={`bg-neutral-100 dark:bg-neutral-900 flex justify-center items-center absolute -right-2 -top-2 shadow-md 
        mx-auto border border-slate-300 dark:border-slate-700 rounded-full text-[8px]`}>
            {count}
        </div>
    );
};

NotificationBadge.propTypes = {
    count: PropTypes.number.isRequired,
    size: PropTypes.number,
};