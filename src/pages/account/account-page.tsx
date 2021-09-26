import React, {useState} from 'react';
import {connect} from 'react-redux';
import {types} from '@types';
import {backend, reduxUtils, formUtils} from '@utilities';
import VisualAccountPage from './visual-account-page';

function AccountPage(props: {
    account: types.Account;
    accessToken: types.AccessToken;
    openMessage: (messageId: types.MessageId) => void;
}) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordPending, setPasswordPending] = useState(false);

    const [username, setUsername] = useState(props.account.username);
    const [usernamePending, setUsernamePending] = useState(false);

    function validatePassword(): types.ValidationResult {
        if (password.length < 8) {
            return {
                valid: false,
                message: 'Password too short (< 8 characters)',
            };
        } else if (password !== passwordConfirmation) {
            return {
                valid: false,
                message: 'Password and confirmation do not match',
            };
        } else {
            return {
                valid: true,
            };
        }
    }

    const validateUsername = () => formUtils.validators.username(username);

    function submitPassword() {
        function success() {
            props.openMessage('success-password-changed');
            setPassword('');
            setPasswordConfirmation('');
            setPasswordPending(false);
        }
        function error() {
            props.openMessage('error-server');
            setPasswordPending(false);
        }

        setPasswordPending(true);
        backend.updateAccount(
            props.account,
            props.accessToken,
            {password},
            success,
            error,
        );
    }

    function submitUsername() {
        function success() {
            props.openMessage('success-username-changed');
            setUsername('');
            setUsernamePending(false);
        }
        function error() {
            props.openMessage('error-server');
            setUsernamePending(false);
        }

        setUsernamePending(true);
        backend.updateAccount(
            props.account,
            props.accessToken,
            {username},
            success,
            error,
        );
    }

    return (
        <VisualAccountPage
            account={props.account}
            {...{
                validatePassword,
                submitPassword,
                passwordPending,
                password,
                passwordConfirmation,
                setPassword,
                setPasswordConfirmation,
            }}
            {...{
                validateUsername,
                submitUsername,
                usernamePending,
                username,
                setUsername,
            }}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
