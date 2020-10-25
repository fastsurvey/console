import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Account, ReduxState} from '../utilities/types';
import {
    logOutAction,
    openMessageAction,
    closeAllMessagesAction,
} from '../utilities/reduxActions';
import assert from 'assert';
import ButtonRowComponent from '../components/buttonRow';
import ButtonComponent from '../components/button';
import {authPostRequest} from '../utilities/axiosClients';

interface VerifyWallComponentProps {
    account: undefined | Account;
    logOut(): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function VerifyWallComponent(props: VerifyWallComponentProps) {
    const email = props.account?.email;
    assert(email !== undefined);

    const [resendPossible, setResendPossible] = useState(true);

    function handleResend() {
        authPostRequest('/resend-verification', {email})
            .then(() => {
                props.closeAllMessages();
                setResendPossible(false);
            })
            .catch((error) => {
                if (error?.response?.status === 400) {
                    props.openMessage('Invalid email address');
                } else {
                    // Invalid password formats will be catched by frontend
                    props.openMessage('Server error. Please try again later');
                }
            });
    }

    return (
        <div className='w-25vw'>
            <h3 className='mb-4 text-center no-selection'>
                Verify your email first!
            </h3>
            <p className='mb-4 text-center'>
                Please verify your email address by clicking the link in the
                email we've just sent to:
            </p>
            <p className='text-center font-weight-600'>{email}</p>
            <ButtonRowComponent center className={'pt-4'}>
                <ButtonComponent
                    onClick={handleResend}
                    text='Resend verification email'
                    disabled={!resendPossible}
                />
            </ButtonRowComponent>
            <div
                className={
                    'w-full text-center pt-4 text-gray-500 font-weight-500 no-selection'
                }
            >
                <Link to='/register' onClick={props.logOut}>
                    Wrong email address? Just register again.
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: () => dispatch(logOutAction()),
    openMessage: (content: string) => dispatch(openMessageAction(content)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VerifyWallComponent);
