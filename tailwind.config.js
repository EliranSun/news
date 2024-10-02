/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				"grow-shrink": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.05)" },
				},
			},
			animation: {
				"grow-shrink": "grow-shrink 3s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
