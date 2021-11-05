import React from 'react';
import ReactDOM from 'react-dom';
import ReduxStore from './redux-store';
import PageRouter from './page-router';

import 'typeface-quicksand';
import '/src/styles/tailwind.css';
import '/src/styles/fixes.css';

ReactDOM.render(
    <React.StrictMode>
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
