import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Account, ReduxState} from '../../../utilities/types';
import {
    logOutAction,
    openMessageAction,
    closeAllMessagesAction,
} from '../../../utilities/reduxActions';
import assert from 'assert';
import {authPostRequest} from '../../../utilities/axiosClients';
import TextLink from '../../../components/links/TextLink';
import ButtonLink from '../../../components/links/ButtonLink';

interface VerifyWallProps {
    account: undefined | Account;
    logOut(): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function VerifyWall(props: VerifyWallProps) {
    const email = props.account?.email;
    assert(email !== undefined);

    const [resendPossible, setResendPossible] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    function handleResend() {
        if (resendPossible) {
            setSubmitting(true);
            authPostRequest('/resend-verification', {email})
                .then(() => {
                    setSubmitting(false);
                    setResendPossible(false);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 400) {
                        props.openMessage('Invalid email address');
                    } else {
                        // Invalid password formats will be catched by frontend
                        props.openMessage(
                            'Server error. Please try again later',
                        );
                    }
                });
        }
    }

    return (
        <div className='w-full'>
            <h2 className='mb-4 text-center no-selection'>
                Verify your email first!
            </h2>
            <p className='mb-4 text-center'>
                Please verify your email address by clicking the link in the
                email we've just sent to:
            </p>
            <p className='text-center font-weight-600'>{email}</p>
            <ButtonLink
                className='pt-4'
                onClick={handleResend}
                disabled={!resendPossible}
                spinning={submitting}
            >
                Resend verification email
            </ButtonLink>
            <TextLink to='/register' onClick={props.logOut} className='pt-4'>
                Wrong email address? Just register again.
            </TextLink>
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyWall);
