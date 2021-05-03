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

    configs: [],
    configIsDiffering: false, // true if the current config has to be saved/reverted

    messages: [],
    navbarState: {
        open: false, // used on mobile
    },
    modalState: {
        open: false,
        title: '',
        children: React.Fragment,
    },
};

export default initialState;
