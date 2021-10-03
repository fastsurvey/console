import React, {useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend, formUtils} from '@utilities';
import {types} from '@types';
import VisualRegister from './visual-register';

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

    function validateEntry(): types.ValidationResult {
        let results: types.ValidationResult[] = [
            formUtils.validators.email(email),
            formUtils.validators.username(username),
            formUtils.validators.password(password),
        ];

        // @ts-ignore
        return [...results.filter((r) => !r.valid), {valid: true}][0];
    }

    function handleRegistration() {
        function success() {
            setSubmitting(false);
            props.openMessage('success-account-created');
        }

        function error(code: 400 | 500 | 422) {
            setSubmitting(false);
            let messageId: types.MessageId = 'error-server';
            if (code === 400) {
                messageId = 'error-email-taken';
            } else if (code === 422) {
                messageId = 'error-email-invalid';
            }
            props.openMessage(messageId);
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
            validation={validateEntry()}
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
