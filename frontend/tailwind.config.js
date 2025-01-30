/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'eco-green': '#2ecc71',       // Verde ambiental
                'eco-blue': '#3498db',        // Azul ecológico
                'eco-gray': '#34495e',        // Gris profesional
                'eco-white': '#ffffff',       // Blanco puro
                'eco-yellow': '#f1c40f',      // Amarillo energético
                'eco-dark-green': '#049434',  // Verde oscuro
                'eco-red': '#e74c3c',         // Rojo ecológico
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
    plugins: [],
};