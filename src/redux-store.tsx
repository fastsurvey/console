import React, {useState, useEffect} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {backend, reduxUtils} from 'utilities';
import {types} from 'types';

const store = createStore(
    (
        state: types.ReduxState = reduxUtils.initialState,
        action: types.ReduxAction,
    ) => reduxUtils.updateState(state, action),
);

interface Props {
    children: React.ReactChild;
}
export function ReduxStore(props: Props) {
    const [cookieLogin, setCookieLogin] = useState(false);

    useEffect(() => {
        async function triggerLogin() {
            await backend.loginWithCookie(
                reduxUtils.dispatchers.logIn(store.dispatch),
                reduxUtils.dispatchers.logOut(store.dispatch),
            );
        }

        if (!cookieLogin) {
            setCookieLogin(true);
            triggerLogin();
        }
    }, [cookieLogin]);

    return <Provider store={store}>{props.children}</Provider>;
}

export default ReduxStore;
