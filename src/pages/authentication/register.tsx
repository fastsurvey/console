import React, {useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend, formUtils} from '/src/utilities';
import {types} from '/src/types';
import VisualRegister from './components/visual-register';

interface Props {
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}
function RegisterForm(props: Props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [openMessages, setOpenMessages] = useState(false);

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
            setOpenMessages(true);
            props.openMessage('success-account-created');
        }

        function error(reason: 'email' | 'username' | 'format' | 'server') {
            switch (reason) {
                case 'email':
                    props.openMessage('error-email-taken');
                    break;
                case 'username':
                    props.openMessage('error-username-taken');
                    break;
                case 'format':
                    props.openMessage('error-email-invalid');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    break;
            }
            setSubmitting(false);
            setOpenMessages(true);
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
            closeAllMessages={() => {
                if (openMessages) {
                    setOpenMessages(false);
                    props.closeAllMessages();
                }
            }}
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
