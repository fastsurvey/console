import React, {useState} from 'react';
import {connect} from 'react-redux';
import assert from 'assert';
import {stateTypes, reduxUtils, authPostRequest} from 'utilities';
import VisualVerifyWall from './visual-verify-wall';

interface VerifyWallProps {
    account: undefined | stateTypes.Account;
    logOut(): void;
    openMessage(message: stateTypes.Message): void;
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
        <VisualVerifyWall
            email={email}
            handleResend={handleResend}
            resendPossible={resendPossible}
            submitting={submitting}
            logOut={props.logOut}
        />
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: reduxUtils.dispatchers.logOut(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyWall);
