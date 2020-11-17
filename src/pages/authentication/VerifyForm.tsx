import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';

import {stateTypes, dispatchers, authPostRequest} from 'utilities';

import {TextInput, ButtonLink} from 'components';

interface VerifyFormProps {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}

function VerifyForm(props: VerifyFormProps) {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    let email_token = queryParams.get('token');

    const input1 = useRef(null);

    function handleVerify() {
        // @ts-ignore
        input1.current?.blur();
        if (!disabled() && email_token !== null) {
            setSubmitting(true);
            authPostRequest('/verify', {password, email_token})
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

    function disabled() {
        return password.length < 8;
    }

    return (
        <div className='w-full'>
            {!success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>
                        Verify your email
                    </h2>
                    {email_token !== null && (
                        <form>
                            <TextInput
                                placeholder='password'
                                value={password}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    setPassword(newValue);
                                }}
                                className='mb-2'
                                type='password'
                                autoComplete='current-password'
                                ref={input1}
                                onEnter={handleVerify}
                            />
                            <ButtonLink
                                className='pt-2'
                                onClick={handleVerify}
                                disabled={disabled()}
                                spinning={submitting}
                            >
                                Verify
                            </ButtonLink>
                        </form>
                    )}
                    {email_token === null && (
                        <p className='text-center'>
                            Sorry, we couldn't find any email token in the url.
                            Please use exactly the link we've sent to you.
                        </p>
                    )}
                </React.Fragment>
            )}
            {success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>Success!</h2>
                    <ButtonLink to='configurations'>
                        Continue to Admin Panel
                    </ButtonLink>
                </React.Fragment>
            )}
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatchers.logIn(dispatch),
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyForm);
