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
    openMessage(message: types.Message): void;
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

            props.openMessage({
                text: 'Success! Redirect to login in 5 seconds.',
                type: 'success',
            });

            setTimeout(() => {
                history.push('/login');
            }, 5000);
        }

        function error(code: 400 | 401 | 500) {
            setSubmitting(false);
            if (code === 401) {
                props.openMessage({
                    text: 'Wrong password or invalid link',
                    type: 'error',
                });
            } else if (code === 400) {
                props.openMessage({
                    text: 'Email has already been verified',
                    type: 'info',
                });
            } else {
                // Invalid password formats will be catched by frontend
                props.openMessage({
                    text: 'Server error. Please try again later',
                    type: 'error',
                });
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
            closeAllMessages={props.closeAllMessages}
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
