import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, authPostRequest} from 'utilities';
import VisualLogin from './visual-login';
import {authGetRequest} from 'utilities/ajax-helpers/axios-clients';

interface Props {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}

function LoginForm(props: Props) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    function disabled() {
        return email.length < 3 || password.length < 8;
    }

    const input2Ref = useRef<HTMLInputElement>(null);

    function handleLogin() {
        input2Ref.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/authentication', {identifier: email, password})
                .then((authResponse: any) => {
                    // TODO: refresh token

                    console.log('LOGGED IN');

                    const jwt: stateTypes.OAuth2Token = {
                        access_token: authResponse.data.access_token,
                        refresh_token: authResponse.data.access_token,
                        bearer: authResponse.data.token_type,
                    };

                    authGetRequest(`/users/${email}`, jwt)
                        .then((accountResponse: any) => {
                            console.log('FETCHED');
                            setSubmitting(false);
                            props.logIn(jwt, accountResponse.data);
                        })
                        .catch((error) => {
                            setSubmitting(false);
                            props.openMessage({
                                text: 'Server error. Please try again later',
                                type: 'error',
                            });
                        });
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
