import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';

import ReduxStore from './redux-store';
import PageRouter from './page-router';

import 'typeface-quicksand';
import '/src/styles/tailwind.css';
import '/src/styles/special.css';
import '/src/styles/layout.css';
import '/src/styles/icons.css';

// only use sentry when image was built with docker AND
// when code uses production backend
if (
    import.meta.env.MODE === 'production' &&
    import.meta.env.VITE_ENV === 'production'
) {
    Sentry.init({
        dsn: `${import.meta.env.VITE_SENTRY_API}`,
        environment: `${import.meta.env.VITE_ENV}`,
        release: `${import.meta.env.VITE_COMMIT_SHA}`,
        sampleRate: 1.0,
    });
}

ReactDOM.render(
    <React.StrictMode>
        <ReduxStore>
            <PageRouter />
        </ReduxStore>
    </React.StrictMode>,
    document.getElementById('root'),
);
