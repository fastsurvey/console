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
    const [password, setPassword] = useState<string>('');
    const [submissionState, setSubmissionState] = useState<
        | 'no-token'
        | 'pending'
        | 'submitting'
        | 'success'
        | 'invalid-token'
        | 'server-error'
    >('pending');

    const submitIsPossible = formUtils.validators.password(password).valid;

    // TODO: Get token from URL & set initial submissionState
    // TODO: Add visible validation bar
    // TODO: Add set-password logic

    return (
        <VisualSetPassword
            password={password}
            setPassword={setPassword}
            submissionState={submissionState}
            submitIsPossible={submitIsPossible}
            handleRequest={() => {}}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logIn(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordForm);
