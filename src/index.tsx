import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ReduxWrapper from './wrapper/ReduxWrapper';
import Router from './wrapper/Router';
import './styles/tailwind.out.css';
import './styles/compatibilityFixes.css';

ReactDOM.render(
    <React.StrictMode>
        <ReduxWrapper>
            <Router />
        </ReduxWrapper>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
