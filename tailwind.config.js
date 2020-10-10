module.exports = {
    purge: {
        enabled: false,
        content: [
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
            './public/**/*.html',
        ],
    },
    theme: {
        extend: {
            spacing: {
                '50vh': '50vh',
                '100vh': '100vh',
                '50vw': '50vw',
                '100vw': '100vw',
            },
        },
    },
};
