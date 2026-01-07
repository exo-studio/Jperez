/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}", // Added manually since your structure is flat
        "./*.{js,ts,jsx,tsx}", // For files in root like App.tsx
    ],
    theme: {
        extend: {
            colors: {
                foton: {
                    blue: '#0066B3',
                }
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
