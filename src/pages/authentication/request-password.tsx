import React, {useState} from 'react';
import {backend, reduxUtils, formUtils} from '/src/utilities';
import {types} from '/src/types';
import {connect} from 'react-redux';
import VisualRequestPassword from '/src/pages/authentication/components/visual-request-password';

function RequestPasswordForm(props: {openMessage(messageId: types.MessageId): void}) {
    const [identifier, setIdentifier] = useState('');
    const [submissionState, setSubmissionState] = useState<
        'pending' | 'submitting' | 'success' | 'failed'
    >('pending');

    const submitIsPossible =
        formUtils.validators.email(identifier).valid ||
        formUtils.validators.username(identifier).valid;

    function handleRequest() {
        function error(reason: 'credentials' | 'not-verified' | 'server'): void {
            switch (reason) {
                case 'credentials':
                    setSubmissionState('pending');
                    props.openMessage('error-login-credentials');
                    break;
                case 'not-verified':
                    setSubmissionState('pending');
                    props.openMessage('warning-login-not-verified');
                    break;
                case 'server':
                    props.openMessage('error-server');
                    setSubmissionState('failed');
                    break;
            }
        }

        function success(): void {
            setSubmissionState('success');
            console.log('SUCCESS');
        }

        if (submitIsPossible && submissionState === 'pending') {
            setSubmissionState('submitting');
            backend.requestNewPassword({identifier}, success, error);
        }
    }

    return (
        <VisualRequestPassword
            identifier={identifier}
            setIdentifier={setIdentifier}
            submissionState={submissionState}
            setSubmissionState={setSubmissionState}
            submitIsPossible={submitIsPossible}
            handleRequest={handleRequest}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RequestPasswordForm);
