import React, {useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from '/src/utilities';
import {types} from '/src/types';
import VisualVerifyForm from './components/visual-verify';

interface Props {
    logIn(
        accessToken: types.AccessToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ): void;
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}
function VerifyForm(props: Props) {
    const [verificationState, setVerificationState] = useState<
        'not-started' | 'submitting' | 'successful' | 'failed'
    >('not-started');

    const token = new URLSearchParams(window.location.search).get('token');

    function success() {
        setVerificationState('successful');
        props.openMessage('success-email-verification');
    }

    function error(code: 400 | 401 | 500 | 422) {
        setVerificationState('failed');
        if (code === 401 || code === 422) {
            props.openMessage('error-link-invalid');
        } else if (code === 400) {
            // email has already been verified
            success();
        } else {
            props.openMessage('error-server');
        }
    }

    function triggerVerification() {
        if (token !== null && verificationState === 'not-started') {
            setVerificationState('submitting');
            backend.verifyAccount(
                {
                    verification_token: token,
                },
                success,
                error,
            );
        }
    }

    return (
        <VisualVerifyForm
            {...{verificationState, triggerVerification}}
            tokenExists={token !== null}
        />
    );
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logIn(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyForm);
