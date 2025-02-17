// filepath: /c:/Users/TurismoProyect/Documents/GatilinDigital/be_recolectores_desechos/frontend/tailwind.config.cjs
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                customBlue: '#205287',
                customGray: '#595957',
                customGreen: '#5FBB01',
                customGreenHover: '#5EAA22',
                customGrayOscuro: '#519F00'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};