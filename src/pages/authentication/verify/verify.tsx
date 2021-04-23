import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils} from 'utilities';
import VisualVerifyForm from './visual-verify';
import {types} from 'types';

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

    function disabled() {
        return password.length < 8;
    }

    const token = new URLSearchParams(window.location.search).get('token');
    const input1Ref = useRef<HTMLInputElement>(null);

    /*
    function handleVerify() {
        input1Ref.current?.blur();
        if (!disabled() && token !== null) {
            setSubmitting(true);
            authPostRequest('/verification', {password, token})
                .then((response) => {
                    setTimeout(() => {
                        setSuccess(true);
                        setSubmitting(false);
                    }, 50);
                    props.logIn(
                        {
                            access_token: response.data.access_token,
                            refresh_token: response.data.access_token,
                            bearer: response.data.token_type,
                        },
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
    }*/

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
            handleVerify={() => {}}
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
