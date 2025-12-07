/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#09090b',
                'card-bg': 'rgba(24, 24, 27, 0.6)',
                'primary': '#8b5cf6',
                'danger': '#ef4444',
                'gold': '#fbbf24',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
