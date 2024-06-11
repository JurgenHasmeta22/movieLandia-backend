/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/views/**/*.ejs', './src/**/*.js', './public/**/*.html'],
    theme: {
        extend: {
            colors: {
                'custom-backroung-black': '#1e1e1e',
            },
        },
    },
    plugins: [],
};
