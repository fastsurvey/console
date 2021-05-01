import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from 'utilities';
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

        function success() {
            setSubmitting(false);
            setPassword('');
            setPasswordConfirmation('');
            props.openMessage({
                text: 'Success: Account created! Please verify your email now.',
                type: 'success',
            });
        }

        function error(code: 400 | 500) {
            setSubmitting(false);
            let messageText: string;
            if (code === 400) {
                messageText = 'Email is already taken';
            } else {
                // Invalid password formats will be catched by frontend
                messageText = 'Server error. Please try again later';
            }
            props.openMessage({
                text: messageText,
                type: 'error',
            });
        }

        if (!disabled()) {
            setSubmitting(true);

            backend.createAccount(
                {
                    email_address: email,
                    username,
                    password,
                },
                success,
                error,
            );
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
