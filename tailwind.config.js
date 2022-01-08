// prettier-ignore

const colors = require('tailwindcss/colors')
const customColors = {
    // Primary
    blue: {
        50: "#DCEEFB",
        75: "#c9e7fc",
        100: "#B6E0FE",
        150: "#9DD2F9",
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
    gray: {
        50: '#f8fafc',
        75: '#f4f7fa',
        100: '#f1f5f9',
        150: '#e9eef4',
        200: '#e2e8f0',
        300: '#cbd5e1',
        350: '#afbccc',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        750: '#283548',
        800: '#1e293b',
        850: '#162032',
        900: '#0f172a',
        950: '#0B111F'
    },
  
    green: {
        50: "#F0FCF9",
        75: "#dbf9f1",
        100: "#C6F7E9",
        150: "#aaf2dd",
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
        75: "#fcdddd",
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
        75: "#fdf4d9",
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
    rose: colors.rose,
    'rose-75': '#ffeaec',
    cyan: colors.cyan,
};

module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: customColors,
            fill: customColors
        }
    },
    plugins: [
        require('tailwindcss-interaction-variants'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp')
    ],
};
