import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';

import ReduxStore from './redux-store';
import PageRouter from './page-router';

import 'typeface-quicksand';
import '/src/styles/tailwind.css';
import '/src/styles/fixes.css';

// only use sentry when image was built with docker
if (import.meta.env.MODE === 'production') {
    Sentry.init({
        dsn: `${import.meta.env.VITE_SENTRY_API}`,
        environment: `${import.meta.env.VITE_ENV}`,
        release: `${import.meta.env.VITE_COMMIT_SHA}`,
        sampleRate: 1.0,
    });
}

ReactDOM.render(
    <React.StrictMode>
        {import.meta.env.MODE === 'production' && (
            <script
                data-host='https://microanalytics.io'
                data-dnt='false'
                src='https://microanalytics.io/js/script.js'
                id='ZwSg9rf6GA'
                async
                defer
            ></script>
        )}
        <ReduxStore>
            <PageRouter />
        </ReduxStore>
    </React.StrictMode>,
    document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
        .then((registration) => {
            registration.unregister();
        })
        .catch((error) => {
            console.error(error.message);
        });
}
