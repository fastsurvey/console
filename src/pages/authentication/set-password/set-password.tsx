import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, authPostRequest} from 'utilities';
import VisualSetPassword from './visual-set-password';
import {types} from 'types';

interface Props {
    logIn(
        authToken: types.AuthToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ): void;
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}
function SetPassword(props: Props) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return password.length < 8 || password !== passwordConfirmation;
    }

    const token = new URLSearchParams(window.location.search).get('token');

    const input2Ref = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        input2Ref.current?.blur();
        if (!disabled() && token !== null) {
            setSubmitting(true);
            authPostRequest('/set-new-password', {
                password,
                password_token: token,
            })
                .then((response) => {
                    setSubmitting(false);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                        [],
                    );
                    setSuccess(true);
                })
                .catch((error) => {
                    setSubmitting(false);
                    props.openMessage(
                        error?.response?.status === 401
                            ? 'error-link-invalid'
                            : 'error-server',
                    );
                });
        }
    }

    return (
        <VisualSetPassword
            // @ts-ignore
            ref={{input2Ref}}
            password={password}
            setPassword={setPassword}
            passwordConfirmation={passwordConfirmation}
            setPasswordConfirmation={setPasswordConfirmation}
            success={success}
            tokenExists={token !== null}
            disabled={disabled()}
            submitting={submitting}
            handleSubmit={handleSubmit}
            closeAllMessages={props.closeAllMessages}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logIn(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
