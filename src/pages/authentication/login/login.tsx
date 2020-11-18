import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, authPostRequest} from 'utilities';
import VisualLogin from './visual-login';

interface LoginFormProps {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}

function LoginForm(props: LoginFormProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    function disabled() {
        return email.length < 5 || password.length < 8;
    }

    const input2Ref = useRef<HTMLInputElement>(null);

    function handleLogin() {
        input2Ref.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/login/form', {email, password})
                .then((response) => {
                    setSubmitting(false);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                    );
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage({
                            text: 'Invalid credentials',
                            type: 'error',
                        });
                    } else {
                        // Invalid password formats will be catched by frontend
                        props.openMessage({
                            text: 'Server error. Please try again later',
                            type: 'error',
                        });
                    }
                });
        }
    }

    return (
        <VisualLogin
            // @ts-ignore
            ref={{input2Ref}}
            email={email}
            setEmail={setEmail}
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
