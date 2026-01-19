/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F766E', // Emerald 700
                    foreground: '#FFFFFF',
                },
                secondary: {
                    DEFAULT: '#F59E0B', // Amber 500
                    foreground: '#FFFFFF',
                },
                accent: {
                    DEFAULT: '#E11D48', // Rose 600
                    foreground: '#FFFFFF',
                },
                background: '#FAF9F6', // Off-white
                surface: '#FFFFFF',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
