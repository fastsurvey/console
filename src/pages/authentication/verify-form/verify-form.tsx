import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, authPostRequest} from 'utilities';
import VisualVerifyForm from './visual-verify-form';

interface Props {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function VerifyForm(props: Props) {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return password.length < 8;
    }

    const token = new URLSearchParams(window.location.search).get('token');
    const input1Ref = useRef<HTMLInputElement>(null);

    function handleVerify() {
        input1Ref.current?.blur();
        if (!disabled() && token !== null) {
            setSubmitting(true);
            authPostRequest('/verify', {password, email_token: token})
                .then((response) => {
                    setTimeout(() => {
                        setSuccess(true);
                        setSubmitting(false);
                    }, 50);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                    );
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage({
                            text: 'Invalid password or wrong link',
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

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatchers.logIn(dispatch),
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyForm);
