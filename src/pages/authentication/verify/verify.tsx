import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, backend} from '@utilities';
import {types} from '@types';
import {useHistory} from 'react-router-dom';
import VisualVerifyForm from './visual-verify';

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
    const [verificationSuccessful, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [tried, setTried] = useState(false);
    let history = useHistory();

    const token = new URLSearchParams(window.location.search).get('token');

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
            // email has already been verified
            success();
        } else {
            props.openMessage('error-server');
        }
    }

    useEffect(() => {
        if (token !== null && tried === false) {
            setSubmitting(true);
            setTried(true);
            backend.verifyAccount(
                {
                    verification_token: token,
                },
                success,
                error,
            );
        }
    }, [token, submitting]);

    return (
        <VisualVerifyForm
            {...{
                verificationSuccessful,
                submitting,
            }}
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
