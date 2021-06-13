// prettier-ignore

const colors = require('tailwindcss/colors')
const customColors = {
    // Primary
    blue: {
        50: "#DCEEFB",
        100: "#B6E0FE",
        200: "#84C5F4",
        300: "#62B0E8",
        400: "#4098D7",
        500: "#2680C2",
        600: "#186FAF",
        700: "#0F609B",
        800: "#0A558C",
        900: "#003E6B"
    },  
  
    // Neutrals
    gray: colors.blueGray,
  
    green: {
        50: "#F0FCF9",
        100: "#C6F7E9",
        200: "#8EEDD1",
        300: "#5FE3C0",
        400: "#2DCCA7",
        500: "#17B897",
        600: "#079A82",
        700: "#048271",
        800: "#016457",
        900: "#004440"
    },  
    
    red: {
        50: "#FFEEEE",
        100: "#FACDCD",
        200: "#F29B9B",
        300: "#E66A6A",
        400: "#D64545",
        500: "#BA2525",
        600: "#A61B1B",
        700: "#911111",
        800: "#780A0A",
        900: "#610404"
    },
    
    yellow: {
        50: "#FFFAEB",
        100: "#FCEFC7",
        200: "#F8E3A3",
        300: "#F9DA8B",
        400: "#F7D070",
        500: "#E9B949",
        600: "#C99A2E",
        700: "#A27C1A",
        800: "#7C5E10",
        900: "#513C06"
    },

    orange: colors.orange,
    teal: colors.teal,
    rose: colors.rose
};

module.exports = {
    mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx}',
      ],
    theme: {
        extend: {
            colors: customColors,
            fill: customColors,
            opacity: {
                '60': '.6',
                '70': '.7',
                '80': '.8',
                '90': '.9',
            },
            boxShadow: {
                'control-strip': '0 10px 10px 0 rgb(241, 245, 249)'
            },
            lineHeight: {
                '12': '3rem'
            },
            transitionProperty: {
                'height': 'height',
                'width': 'width',
                'size': 'margin, padding, width, height, max-height, line-height',
                'size-colors': 'margin, padding, width, height, text-color, background-color, box-shadow',
            },
            transitionDuration: {
                '50': '50ms'
            },
            transitionDelay: {
                 '0': '0ms',
                '50': '50ms'
            },
            spacing: {
                '5vh': '5vh',
                '10vh': '10vh',
                '15vh': '15vh',
                '20vh': '20vh',
                '25vh': '25vh',
                '30vh': '30vh',
                '35vh': '35vh',
                '40vh': '40vh',
                '45vh': '45vh',
                '50vh': '50vh',
                '60vh': '60vh',
                '70vh': '70vh',
                '80vh': '80vh',
                '90vh': '90vh',
                '100vh': '100vh',
                '5vw': '5vw',
                '10vw': '10vw',
                '15vw': '15vw',
                '20vw': '20vw',
                '25vw': '25vw',
                '30vw': '30vw',
                '35vw': '35vw',
                '40vw': '40vw',
                '45vw': '45vw',
                '50vw': '50vw',
                '60vw': '60vw',
                '70vw': '70vw',
                '80vw': '80vw',
                '90vw': '90vw',
                '100vw': '100vw',

                '1.5': '0.375rem',
                '4': '1rem',
                '4.5': '1.125rem',
                '5': '1.25rem',
                '11': '2.75rem',
                '12': '3.00rem',
                '13': '3.25rem',
                '14': '3.50rem',
                '15': '3.75rem',
                '16': '4.00rem',
                '17': '4.25rem',
                '18': '4.50rem',
                '19': '4.75rem',
                '20': '5.0rem',
                '22': '5.5rem',
                '24': '6.0rem',
                '26': '6.5rem',
                '28': '7.0rem',
                '30': '7.5rem',
                '32': '8.0rem',
                '33': '8.25rem',
                '34': '8.5rem',
                '35': '8.75rem',
                '36': '9.0rem',
                '38': '9.5rem',
                '40': '10.0rem',
                '42': '10.5rem',
                '44': '11.0rem',
                '46': '11.5rem',
                '48': '12.0rem',
                '50': '12.5rem',
                '52': '13.0rem',
                '54': '13.5rem',
                '56': '14.0rem',
                '58': '14.5rem',
                '60': '15.0rem',
                '62': '15.5rem',
                '64': '16.0rem',
                '66': '16.5rem',
                '68': '17.0rem',
                '70': '17.5rem',
                '72': '18.0rem',
                '80': '20.0rem',
                '90': '22.5rem',
                '100': '25.0rem',
                '104': '26.0rem',
                '110': '27.5rem',
                '120': '30.0rem',

                '124': '31.0rem',
                '126': '31.5rem',
                '128': '32.0rem',
                '130': '32.5rem',
                '132': '33.0rem',
                '144': '36.0rem',

                '10%': '10%',
                '15%': '15%',
                '20%': '20%',
                '25%': '25%',
                '30%': '30%',
                '35%': '35%',
                '40%': '40%',
                '45%': '45%',
                '50%': '50%',
                '55%': '55%',
                '60%': '60%',
                '65%': '65%',
                '70%': '70%',
                '75%': '75%',
                '80%': '80%',
                '85%': '85%',
                '90%': '90%',
            },
            inset: {
                '1/2': '50%',
            },
            maxHeight: {
                '0':  '0',
                '64':  '16.0rem',
                '128':  '32.0rem'
            },
            minHeight: {
                '12':  '3.0rem',
            },
        },
    },
    plugins: [
        require('tailwindcss-interaction-variants'),
    ],
};
