import React, {useState} from 'react';
import {connect} from 'react-redux';
import {types} from '/src/types';
import {backend, reduxUtils, formUtils} from '/src/utilities';
import VisualAccountPage from './visual-account-page';
import ChangeUsernamePopup from './components/change-username-popup';
import DeleteUserPopup from './components/delete-user-popup';

function AccountPage(props: {
    account: types.Account;
    accessToken: types.AccessToken;

    openModal(title: string, children: React.ReactNode): void;
    closeModal(): void;
    logOut(): void;
    openMessage(messageId: types.MessageId): void;
    updateUsername(username: string): void;
}) {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(props.account.username);

    const [passwordPending, setPasswordPending] = useState(false);
    const [usernamePending, setUsernamePending] = useState(false);
    const [removeUserPending, setRemoveUserPending] = useState(false);

    const validatePassword = () => formUtils.validators.password(password);
    const validateUsername = () => formUtils.validators.username(username);

    function submitPassword() {
        function success() {
            props.openMessage('success-password-changed');
            setPassword('');
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
            props.updateUsername(username);
            props.closeModal();
            setUsernamePending(false);
        }
        function error(code: number) {
            if (code === 400) {
                props.openMessage('error-username-taken');
            } else {
                props.openMessage('error-server');
            }
            props.closeModal();
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

    function submitRemoveUser() {
        props.closeModal();

        function success() {
            props.logOut();
        }
        function error() {
            props.openMessage('error-server');
        }

        setRemoveUserPending(true);
        backend.removeAccount(props.account, props.accessToken, success, error);
    }

    function openUsernameModal() {
        props.openModal(
            'Change username?',
            <ChangeUsernamePopup
                oldUsername={props.account.username}
                newUsername={username}
                cancel={() => {
                    setUsername(props.account.username);
                    props.closeModal();
                }}
                submit={submitUsername}
            />,
        );
    }

    function openDeleteUserModal() {
        props.openModal(
            'Delete your account forever?',
            <DeleteUserPopup cancel={props.closeModal} submit={submitRemoveUser} />,
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
                setPassword,
            }}
            {...{
                validateUsername,
                openUsernameModal,
                usernamePending,
                username,
                setUsername,
            }}
            {...{openDeleteUserModal, removeUserPending}}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
});
const mapDispatchToProps = (dispatch: any) => ({
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
    logOut: reduxUtils.dispatchers.logOut(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    updateUsername: reduxUtils.dispatchers.updateUsername(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
