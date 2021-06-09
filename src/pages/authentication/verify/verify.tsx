import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from 'utilities';
import VisualVerifyForm from './visual-verify';
import {types} from 'types';
import {useHistory} from 'react-router-dom';

interface Props {
    logIn(
        authToken: types.AuthToken,
        account: types.Account,
        configs: types.SurveyConfig[],
    ): void;
    openMessage(messageId: types.MessageId): void;
    closeAllMessages(): void;
}
function VerifyForm(props: Props) {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    let history = useHistory();

    function disabled() {
        return password.length < 8;
    }

    const token = new URLSearchParams(window.location.search).get('token');
    const input1Ref = useRef<HTMLInputElement>(null);

    function handleVerify() {
        input1Ref.current?.blur();

        function success() {
            setSuccess(true);
            setSubmitting(false);

            props.openMessage('success-redirect-to-login');
            setTimeout(() => {
                history.push('/login');
                props.closeAllMessages();
            }, 4000);
        }

        function error(code: 400 | 401 | 500) {
            setSubmitting(false);
            if (code === 401) {
                props.openMessage('error-link-invalid');
            } else if (code === 400) {
                // email has already been verified but
                // token and password are correct
                success();
            } else {
                props.openMessage('error-server');
            }
        }

        if (!disabled() && token !== null) {
            setSubmitting(true);
            backend.verifyAccount(
                {
                    verification_token: token,
                    password,
                },
                success,
                error,
            );
        }
    }

    return (
        <VisualVerifyForm
            // @ts-ignore
            ref={{input1Ref}}
            password={password}
            setPassword={setPassword}
            success={success}
            tokenExists={token !== null}
            disabled={disabled()}
            submitting={submitting}
            handleVerify={handleVerify}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: reduxUtils.dispatchers.logIn(dispatch),
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyForm);
