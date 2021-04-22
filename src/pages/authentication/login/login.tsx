import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, configTypes, loginWithForm} from 'utilities';
import VisualLogin from './visual-login';

interface Props {
    logIn(
        authToken: stateTypes.AuthToken,
        account: stateTypes.Account,
        configs: configTypes.SurveyConfig[],
    ): void;
    openMessage(message: stateTypes.Message): void;
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

        switch (code) {
            case 401:
                props.openMessage({
                    text: 'Invalid credentials',
                    type: 'error',
                });
                break;
            case 500:
                props.openMessage({
                    text: 'Server error. Please try again later',
                    type: 'error',
                });
                break;
        }
    }

    function handleLogin() {
        input2Ref.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            loginWithForm(
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

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatchers.logIn(dispatch),
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
