import React, {useState} from 'react';
import TextInput from '../../../components/formFields/TextInput';
import {connect} from 'react-redux';
import {JWT, Account, ReduxState} from '../../../utilities/types';
import {authPostRequest} from '../../../utilities/axiosClients';
import {
    logInAction,
    openMessageAction,
    closeAllMessagesAction,
} from '../../../utilities/reduxActions';
import ButtonLink from '../../../components/links/ButtonLink';

interface VerifyFormProps {
    logIn(jwt: JWT, account: Account): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function VerifyForm(props: VerifyFormProps) {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    let email_token = queryParams.get('token');

    function handleVerify() {
        if (!disabled() && email_token !== null) {
            setSubmitting(true);
            authPostRequest('/verify', {password, email_token})
                .then((response) => {
                    setTimeout(() => {
                        setSuccess(true);
                        setSubmitting(false);
                    }, 50);
                    props.logIn(response.data.jwt, response.data.account);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage('Invalid password or wrong link');
                    } else {
                        // Invalid password formats will be catched by frontend
                        props.openMessage(
                            'Server error. Please try again later',
                        );
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
                        <React.Fragment>
                            <TextInput
                                placeholder='password'
                                value={password}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    setPassword(newValue);
                                }}
                                type='password'
                            />
                            <ButtonLink
                                className='pt-2'
                                onClick={handleVerify}
                                disabled={disabled()}
                                spinning={submitting}
                            >
                                Verify
                            </ButtonLink>
                        </React.Fragment>
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
    logIn: (jwt: JWT, account: Account) => dispatch(logInAction(jwt, account)),
    openMessage: (content: string) => dispatch(openMessageAction(content)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyForm);
