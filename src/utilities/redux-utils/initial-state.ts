import React from 'react';
import {types} from '/src/types';

const initialState: types.ReduxState = {
    loggingIn: true,
    loggedIn: false,
    accessToken: '',
    account: {
        email: '',
        username: '',
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
