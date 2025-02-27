import PropTypes from 'prop-types';

export const RoundedFloatingBox = ({ value, label, min, max, colors }) => {
    const isModern = colors.custom !== undefined;

    return (
        <div className={`rounded-lg ${isModern ? 'bg-white' : 'bg-white'} p-4 shadow-lg mx-8`}
            style={isModern ? { backgroundColor: colors.custom.background } : {}}>
            <h3 className={isModern ? 'text-2xl font-bold' : `text-2xl font-bold text-${colors.primary}-700`}
                style={isModern ? { color: colors.custom.primary } : {}}>
                {min && max ? `${max}→${min}` : `${value}+`}
            </h3>
            <p className={isModern ? 'text-base' : `text-${colors.text.dark}`}
                style={isModern ? { color: colors.custom.text } : {}}>
                {label}
            </p>
        </div>
    );
};

RoundedFloatingBox.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        text: PropTypes.shape({
            dark: PropTypes.string.isRequired
        }).isRequired,
        custom: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string,
            accent: PropTypes.string,
            background: PropTypes.string,
            text: PropTypes.string
        })
    }).isRequired
};