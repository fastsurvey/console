import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, authPostRequest} from 'utilities';
import VisualSetPassword from './visual-set-password';

interface Props {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function SetPassword(props: Props) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return password.length < 8 || password !== passwordConfirmation;
    }

    const token = new URLSearchParams(window.location.search).get('token');

    const input2Ref = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        input2Ref.current?.blur();
        if (!disabled() && token !== null) {
            setSubmitting(true);
            authPostRequest('/set-new-password', {password, token})
                .then((response) => {
                    setSubmitting(false);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                    );
                    setSuccess(true);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage({
                            text: 'Invalid Link',
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
        <VisualSetPassword
            // @ts-ignore
            ref={{input2Ref}}
            password={password}
            setPassword={setPassword}
            passwordConfirmation={passwordConfirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            success={success}
            tokenExists={token !== null}
            disabled={disabled()}
            submitting={submitting}
            handleSubmit={handleSubmit}
            closeAllMessages={props.closeAllMessages}
        />
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatchers.logIn(dispatch),
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
