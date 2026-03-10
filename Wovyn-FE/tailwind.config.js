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
                    DEFAULT: '#c47e35',
                    hover: '#a3682b',
                },
                secondary: '#8f4f21',
                accent: '#e9b93e',
                background: '#1c1410',
                'card-bg': 'rgba(45, 34, 28, 0.7)',
                'text-main': '#f5f0e1',
                'text-dim': '#b8a398',
                glass: 'rgba(255, 255, 255, 0.02)',
                'glass-border': 'rgba(255, 255, 255, 0.05)',
                error: '#e63946',
                success: '#c47e35',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
