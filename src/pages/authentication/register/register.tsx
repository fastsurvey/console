import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, authPostRequest} from 'utilities';
import VisualRegister from './visual-register';

interface RegisterFormProps {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function RegisterForm(props: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return password.length < 8 || password !== passwordConfirmation;
    }

    const input2Ref = useRef<HTMLInputElement>(null);
    const input3Ref = useRef<HTMLInputElement>(null);

    function handleRegistration() {
        input2Ref.current?.blur();
        input3Ref.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/register', {email, password})
                .then((response) => {
                    setSubmitting(false);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                    );
                })
                .catch((error) => {
                    setSubmitting(false);
                    const detail = error?.response?.data?.detail;
                    let messageText: string;
                    if (detail === 'email already taken') {
                        messageText = 'Email is already taken';
                    } else if (
                        detail === 'verification email could not be sent'
                    ) {
                        messageText = 'Email address invalid';
                    } else {
                        // Invalid password formats will be catched by frontend
                        messageText = 'Server error. Please try again later';
                    }
                    props.openMessage({
                        text: messageText,
                        type: 'error',
                    });
                });
        }
    }

    return (
        <VisualRegister
            // @ts-ignore
            ref={{input2Ref, input3Ref}}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordConfirmation={passwordConfirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            closeAllMessages={props.closeAllMessages}
            handleRegistration={handleRegistration}
            disabled={disabled()}
            submitting={submitting}
        />
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatchers.logOut(dispatch),
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
