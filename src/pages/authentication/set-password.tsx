import React, {useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend, formUtils} from '/src/utilities';
import {types} from '/src/types';
import VisualSetPassword from '/src/pages/authentication/components/visual-set-password';

function SetPasswordForm(props: {
    logIn(
        accessToken: types.AccessToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ): void;
    openMessage(messageId: types.MessageId): void;
}) {
    const token = new URLSearchParams(window.location.search).get('token');

    const [password, setPassword] = useState<string>('');
    const [submissionState, setSubmissionState] = useState<
        | 'no-token'
        | 'pending'
        | 'submitting'
        | 'success'
        | 'invalid-token'
        | 'server-error'
    >(token !== null ? 'pending' : 'no-token');

    const submitIsPossible = formUtils.validators.password(password).valid;

    // TODO: Add visible validation bar

    function handleRequest() {
        const success = (
            authToken: types.AccessToken,
            account: types.Account,
            configs: types.SurveyConfig[],
        ) => {
            props.logIn(authToken, account, configs);
            setSubmissionState('success');
        };

        if (token !== null && submissionState === 'pending') {
            setSubmissionState('submitting');
            backend.setNewPassword(
                {
                    verificationToken: token,
                    newPassword: password,
                },
                success,
                setSubmissionState,
            );
        }
    }

    return (
        <VisualSetPassword
            password={password}
            setPassword={setPassword}
            submissionState={submissionState}
            submitIsPossible={submitIsPossible}
            handleRequest={handleRequest}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logIn(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordForm);
