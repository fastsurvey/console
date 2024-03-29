import React, {useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from '/src/utilities';
import {types} from '/src/types';
import VisualLogin from './components/visual-login';

function LoginForm(props: {
    logIn(
        accessToken: types.AccessToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ): void;
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}) {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    function disabled() {
        return identifier.length < 3 || password.length < 8;
    }

    function error(reason: 'credentials' | 'not-verified' | 'server') {
        setSubmitting(false);
        switch (reason) {
            case 'credentials':
                props.openMessage('error-login-credentials');
                break;
            case 'not-verified':
                props.openMessage('warning-login-not-verified');
                break;
            case 'server':
                props.openMessage('error-server');
                break;
        }
    }

    function handleLogin() {
        if (!disabled()) {
            setSubmitting(true);
            backend.loginWithForm(
                {
                    identifier,
                    password,
                },
                props.logIn,
                error,
            );
        }
    }

    return (
        <VisualLogin
            // @ts-ignore
            identifier={identifier}
            setIdentifier={setIdentifier}
            password={password}
            setPassword={setPassword}
            closeAllMessages={props.closeAllMessages}
            handleLogin={handleLogin}
            disabled={disabled()}
            submitting={submitting}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logIn(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
