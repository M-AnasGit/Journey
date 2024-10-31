/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/*.{js,jsx,ts,tsx}',
        './modals/*.{js,jsx,ts,tsx}',
        './lessons/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                nunitoBlack: ['Nunito-Black', 'sans-serif'],
                nunitoBold: ['Nunito-Bold', 'sans-serif'],
                nunitoSemiBold: ['Nunito-SemiBold', 'sans-serif'],
                nunitoRegular: ['Nunito-Regular', 'sans-serif'],
                nunitoExtraLight: ['Nunito-ExtraLight', 'sans-serif']
            },
            colors: {
                palette: {
                    primary: '#202F36',
                    secondary: '#37464D',
                    accent: '#D83232',
                    accentShadow: '#841D1D',
                    whiteShadow: '#848484',
                    secondaryShadow: '#1C343F'
                },
                input: {
                    border: '#9A9A9A',
                    bg: 'ECEFF1'
                }
            },
            letterSpacing: {
                custom: '-2px'
            }
        }
    },
    plugins: []
}
