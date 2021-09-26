import React, {useState} from 'react';
import {connect} from 'react-redux';
import {types} from '@types';
import {backend, reduxUtils} from '@utilities';
import VisualAccountPage from './visual-account-page';

function AccountPage(props: {
    account: types.Account;
    accessToken: types.AccessToken;
    openMessage: (messageId: types.MessageId) => void;
}) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordPending, setPasswordPending] = useState(false);

    function validatePassword() {
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
                message: 'New password valid',
            };
        }
    }

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
            password,
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
