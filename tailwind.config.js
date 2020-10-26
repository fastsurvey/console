// prettier-ignore
module.exports = {
    purge: {
        enabled: true,
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
            transitionProperty: {
                'height': 'height'
            },
            spacing: {
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

                '56': '14.0rem',
                '58': '14.5rem',
                '60': '15.0rem',
                '62': '15.5rem',
                '64': '16.0rem',
                '66': '16.5rem',
                '68': '17.0rem',
                '70': '17.5rem',
                '72': '18.0rem',

                '124': '31.0rem',
                '126': '31.5rem',
                '128': '32.0rem',
                '130': '32.5rem',
                '132': '33.0rem',
            },
            inset: {
                '1/2': '50%',
            }
        },
    },
};
