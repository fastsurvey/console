import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, authPostRequest} from 'utilities';
import VisualRegister from './visual-register';
import {types} from 'types';

interface Props {
    openMessage(message: types.Message): void;
    closeAllMessages(): void;
}
function RegisterForm(props: Props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return (
            username.length < 3 ||
            password.length < 8 ||
            password !== passwordConfirmation
        );
    }

    const input2Ref = useRef<HTMLInputElement>(null);
    const input3Ref = useRef<HTMLInputElement>(null);
    const input4Ref = useRef<HTMLInputElement>(null);

    function handleRegistration() {
        input2Ref.current?.blur();
        input3Ref.current?.blur();
        input4Ref.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest(`/users/${username}`, {email, password})
                .then(() => {
                    setSubmitting(false);
                    setPassword('');
                    setPasswordConfirmation('');
                    props.openMessage({
                        text:
                            'Success: Account created! Please verify your email now.',
                        type: 'success',
                    });
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
            ref={{input2Ref, input3Ref, input4Ref}}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
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

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logOut(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
