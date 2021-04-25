import React from 'react';
import {types} from 'types';

const initialState: types.ReduxState = {
    loggingIn: true,
    loggedIn: false,
    authToken: {
        access_token: '',
        token_type: '',
    },
    account: {
        email_address: '',
        username: '',
        verified: false,
    },
    messages: [],
    configs: [],
    configIsDiffering: false,
    navbarState: {
        open: false,
    },
    modalState: {
        open: false,
        title: '',
        children: React.Fragment,
    },
};

export default initialState;
