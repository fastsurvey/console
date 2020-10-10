import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ReduxWrapper from './Wrapper/ReduxWrapper';
import Router from './Wrapper/Router';
import './tailwind.out.css';

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
