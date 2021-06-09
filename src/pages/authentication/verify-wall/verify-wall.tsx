import React, {useState} from 'react';
import {connect} from 'react-redux';
import assert from 'assert';
import {reduxUtils, authPostRequest} from 'utilities';
import VisualVerifyWall from './visual-verify-wall';
import {types} from 'types';

interface VerifyWallProps {
    account: undefined | types.Account;
    logOut(): void;
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}

function VerifyWall(props: VerifyWallProps) {
    const email = props.account?.email_address;
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
                    props.openMessage(
                        error?.response?.status === 400
                            ? 'error-email-invalid'
                            : 'error-server',
                    );
                });
        }
    }

    return (
        <VisualVerifyWall
            email={email}
            handleResend={handleResend}
            resendPossible={resendPossible}
            submitting={submitting}
            logOut={props.logOut}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: reduxUtils.dispatchers.logOut(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyWall);
