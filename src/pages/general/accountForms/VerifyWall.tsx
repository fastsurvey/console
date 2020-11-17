import React, {useState} from 'react';
import {connect} from 'react-redux';
import assert from 'assert';

import stateTypes from 'utilities/types/stateTypes';
import dispatcher from 'utilities/dispatcher';
import {authPostRequest} from 'utilities/axiosClients';

import TextLink from 'components/links/TextLink';
import ButtonLink from 'components/links/ButtonLink';

interface VerifyWallProps {
    account: undefined | stateTypes.Account;
    logOut(): void;
    openMessage(message: stateTypes.Message): void;
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
                        props.openMessage({
                            text: 'Invalid email address',
                            type: 'error',
                        });
                    } else {
                        // Invalid password formats will be catched by frontend
                        props.openMessage({
                            text: 'Server error. Please try again later',
                            type: 'error',
                        });
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

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: dispatcher.logOut(dispatch),
    openMessage: dispatcher.openMessage(dispatch),
    closeAllMessages: dispatcher.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyWall);
