import React, {useState} from 'react';
import TextInput from '../../../components/formFields/TextInput';
import {connect} from 'react-redux';
import {ReduxState, JWT, Account} from '../../../utilities/types';
import {authPostRequest} from '../../../utilities/axiosClients';
import {logInAction} from '../../../utilities/reduxActions';
import ButtonLink from '../../../components/links/ButtonLink';
import {
    openMessageAction,
    closeAllMessagesAction,
} from '../../../utilities/reduxActions';

interface SetPasswordFormProps {
    logIn(jwt: JWT, account: Account): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function SetPasswordForm(props: SetPasswordFormProps) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    let password_token = queryParams.get('token');

    function handleSubmit() {
        if (!disabled() && password_token !== null) {
            setSubmitting(true);
            authPostRequest('/set-new-password', {password, password_token})
                .then((response) => {
                    setSubmitting(false);
                    props.closeAllMessages();
                    props.logIn(response.data.jwt, response.data.account);
                    setSuccess(true);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage('Invalid link');
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
        return password.length < 8 || password !== passwordConfirmation;
    }

    return (
        <div className='w-20vw'>
            {!success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>
                        Set Password
                    </h3>
                    {password_token !== null && (
                        <React.Fragment>
                            <TextInput
                                placeholder='password'
                                value={password}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    setPassword(newValue);
                                }}
                                type='password'
                                hint={{
                                    text: '> 7 characters',
                                    fulfilled: password.length > 7,
                                }}
                            />
                            <TextInput
                                placeholder='confirm password'
                                value={passwordConfirmation}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    setPasswordConfirmation(newValue);
                                }}
                                type='password'
                                hint={{
                                    text: 'passwords have to match',
                                    fulfilled:
                                        password.length > 7 &&
                                        password === passwordConfirmation,
                                }}
                            />
                            <ButtonLink
                                className='pt-2'
                                onClick={handleSubmit}
                                disabled={disabled()}
                                spinning={submitting}
                            >
                                Set Password
                            </ButtonLink>
                        </React.Fragment>
                    )}
                    {password_token === null && (
                        <p>
                            Sorry, we couldn't find any password token in the
                            url. Please use exactly the link we've sent to you.
                        </p>
                    )}
                </React.Fragment>
            )}
            {success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>Success!</h3>
                    <ButtonLink to='/configurations'>
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
export default connect(mapStateToProps, mapDispatchToProps)(SetPasswordForm);
