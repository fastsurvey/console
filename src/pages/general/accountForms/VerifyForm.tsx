import React, {useRef, useState} from 'react';
import TextInput from '../../../components/formFields/TextInput';
import {connect} from 'react-redux';
import {
    OAuth2Token,
    Account,
    ReduxState,
    Message,
} from '../../../utilities/types';
import {authPostRequest} from '../../../utilities/axiosClients';
import {
    logInAction,
    openMessageAction,
    closeAllMessagesAction,
} from '../../../utilities/reduxActions';
import ButtonLink from '../../../components/links/ButtonLink';

interface VerifyFormProps {
    logIn(oauth2_token: OAuth2Token, account: Account): void;
    openMessage(message: Message): void;
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

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: (oauth2_token: OAuth2Token, account: Account) =>
        dispatch(logInAction(oauth2_token, account)),
    openMessage: (message: Message) => dispatch(openMessageAction(message)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyForm);
