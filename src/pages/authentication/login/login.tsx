import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from 'utilities';
import VisualLogin from './visual-login';
import {types} from 'types';

interface Props {
    logIn(
        authToken: types.AuthToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ): void;
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}

function LoginForm(props: Props) {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    function disabled() {
        return identifier.length < 3 || password.length < 8;
    }

    const input2Ref = useRef<HTMLInputElement>(null);

    function abortLogin(code: 401 | 500) {
        setSubmitting(false);
        props.openMessage(code === 401 ? 'error-credentials' : 'error-server');
    }

    function handleLogin() {
        input2Ref.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            backend.loginWithForm(
                {
                    identifier,
                    password,
                },
                props.logIn,
                abortLogin,
            );
        }
    }

    return (
        <VisualLogin
            // @ts-ignore
            ref={{input2Ref}}
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
