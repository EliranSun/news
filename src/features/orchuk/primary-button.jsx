import PropTypes from 'prop-types';

export const PrimaryButton = ({ children, inverse = false, colors }) => {
    const isModern = colors.custom !== undefined;

    if (isModern) {
        return (
            <button
                className="font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                style={{
                    backgroundColor: inverse ? 'white' : colors.custom.primary,
                    color: inverse ? colors.custom.primary : 'white',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = inverse ? 'white' : '#3A80D2'; // Darker blue on hover
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = inverse ? 'white' : colors.custom.primary;
                }}
            >
                {children}
            </button>
        );
    }

    return (
        <button className={` hover:bg-${colors.primary}-700  
        font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 
        transform hover:scale-105 ${inverse ? `bg-white text-${colors.primary}-600`
                : `bg-${colors.primary}-600 text-white`}`}>
            {children}
        </button>
    );
};

PrimaryButton.propTypes = {
    children: PropTypes.node.isRequired,
    inverse: PropTypes.bool,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        custom: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string
        })
    }).isRequired
};