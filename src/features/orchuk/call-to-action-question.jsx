import PropTypes from 'prop-types';

export const CallToActionQuestion = ({ children, type = "primary", colors }) => {
    const isModern = colors.custom !== undefined;

    if (isModern) {
        return (
            <h2 className="text-lg md:text-2xl lg:text-5xl font-bold leading-tight italic px-4"
                style={{ color: type === "primary" ? colors.custom.text : 'white' }}>
                {children}
            </h2>
        );
    }

    return (
        <h2 className={`text-lg md:text-2xl lg:text-5xl
        font-bold leading-tight italic px-4
        ${type === "primary" ? `text-${colors.primary}-900` : "text-white"}`}>
            {children}
        </h2>
    );
};

CallToActionQuestion.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        custom: PropTypes.shape({
            text: PropTypes.string
        })
    }).isRequired
};