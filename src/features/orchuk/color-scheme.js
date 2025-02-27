
// Define color schemes
export const colorSchemes = {
    default: {
        primary: 'indigo',
        secondary: 'blue',
        accent: 'yellow',
        text: {
            dark: 'gray-700',
            darker: 'gray-900',
            light: 'white',
        },
        bg: {
            gradient: 'from-blue-50 to-indigo-100',
            section: 'bg-indigo-600',
            highlight: 'bg-yellow-400',
        }
    },
    modern: {
        primary: 'blue',
        secondary: 'orange',
        accent: 'green',
        text: {
            dark: 'gray-800',
            darker: 'gray-900',
            light: 'white',
        },
        bg: {
            gradient: 'from-blue-50 to-blue-100',
            section: 'bg-blue-600',
            highlight: 'bg-orange-400',
        },
        // Custom Tailwind colors for the modern scheme
        custom: {
            primary: '#4A90E2', // Soft medium blue
            secondary: '#FF7F50', // Coral
            accent: '#2ECC71', // Muted green
            background: '#F5F5F5', // Light gray
            text: '#333333', // Dark gray
        }
    }
};
