import PropTypes from 'prop-types';

export const CallToActionAnswer = ({ children, type = "primary", highlight = false, colors }) => {
    const isModern = colors.custom !== undefined;

    if (isModern) {
        if (type === "primary" && highlight) {
            return (
                <h1 className="text-[3.15rem] mx-auto heebo-900 md:text-4xl font-semibold">
                    <mark style={{
                        backgroundColor: colors.custom.secondary,
                        textDecoration: 'underline',
                        lineHeight: '1.25'
                    }}>
                        {children}
                    </mark>
                </h1>
            );
        }

        return (
            <h1 className="text-[3.15rem] mx-auto heebo-900 md:text-4xl font-semibold"
                style={{ color: type === "primary" ? colors.custom.primary : 'white' }}>
                {children}
            </h1>
        );
    }

    return (
        <h1 className={`text-[3.15rem] mx-auto heebo-900 
                        md:text-4xl font-semibold 
                        ${type === "primary" ? `text-${colors.primary}-700` : "text-white"}`}>
            {type === "primary" && highlight
                ? <mark className={`${colors.bg.highlight} underline leading-tight`}>
                    {children}
                </mark> : children}
        </h1>
    );
};

CallToActionAnswer.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    highlight: PropTypes.bool,
    colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        bg: PropTypes.shape({
            highlight: PropTypes.string.isRequired
        }).isRequired,
        custom: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string
        })
    }).isRequired
};
