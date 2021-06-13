import React, {useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from 'utilities';
import VisualRegister from './visual-register';
import {types} from 'types';

interface Props {
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}
function RegisterForm(props: Props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return username.length < 3 || password.length < 8;
    }

    function validateEntry() {
        function disprove(message: string) {
            return {
                entryIsValid: false,
                validationMessage: message,
            };
        }

        if (!email.includes('@')) {
            return disprove('email format invalid');
        }
        if (username.length < 3) {
            return disprove('username too short (≥ 3 characters)');
        }
        if (username.length > 20) {
            return disprove('username too long (≤ 20 characters)');
        }
        if (password.length < 8) {
            return disprove('Password too short (≥ 8 characters)');
        }
        if (password.length > 64) {
            return disprove('Password too long (≤ 64 characters)');
        }

        return {
            entryIsValid: true,
            validationMessage: 'Valid',
        };
    }

    function handleRegistration() {
        function success() {
            setSubmitting(false);
            props.openMessage('success-account-created');
        }

        function error(code: 400 | 500) {
            setSubmitting(false);
            props.openMessage(
                code === 400 ? 'error-email-taken' : 'error-server',
            );
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
            {...{
                email,
                setEmail,
                username,
                setUsername,
                password,
                setPassword,
            }}
            closeAllMessages={props.closeAllMessages}
            handleRegistration={handleRegistration}
            disabled={disabled()}
            submitting={submitting}
            {...validateEntry()}
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
