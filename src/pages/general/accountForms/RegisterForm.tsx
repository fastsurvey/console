import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';

import stateTypes from 'utilities/types/stateTypes';
import dispatcher from 'utilities/dispatcher';
import {authPostRequest} from 'utilities/axiosClients';

import {TextInput, TextLink, ButtonLink} from 'components';

interface RegisterFormProps {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}

function RegisterForm(props: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [submitting, setSubmitting] = useState(false);

    const input2 = useRef(null);
    const input3 = useRef(null);
    function focusInput2() {
        // @ts-ignore
        input2.current?.focus();
    }
    function focusInput3() {
        // @ts-ignore
        input3.current?.focus();
    }

    function handleRegistration() {
        // @ts-ignore
        input3.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/register', {email, password})
                .then((response) => {
                    setSubmitting(false);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                    );
                })
                .catch((error) => {
                    setSubmitting(false);
                    const detail = error?.response?.data?.detail;
                    let messageText: string;
                    if (detail === 'email already taken') {
                        messageText = 'Email ' + email + ' is already taken';
                    } else if (
                        detail === 'verification email could not be sent'
                    ) {
                        messageText = 'Email address invalid';
                    } else {
                        // Invalid password formats will be catched by frontend
                        messageText = 'Server error. Please try again later';
                    }
                    props.openMessage({
                        text: messageText,
                        type: 'error',
                    });
                });
        }
    }

    function disabled() {
        return password.length < 8 || password !== passwordConfirmation;
    }

    return (
        <div className='w-full'>
            <h2 className='mb-4 text-center no-selection'>Register</h2>
            <form>
                <TextInput
                    required
                    placeholder='email'
                    value={email}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        setEmail(newValue);
                    }}
                    className='mb-2'
                    autoComplete='username'
                    onEnter={focusInput2}
                />
                <TextInput
                    required
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
                    className='mb-2'
                    autoComplete='new-password'
                    ref={input2}
                    onEnter={focusInput3}
                />
                <TextInput
                    required
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
                    className='mb-2'
                    autoComplete='new-password'
                    ref={input3}
                    onEnter={handleRegistration}
                />
                <ButtonLink
                    className='pt-2'
                    onClick={handleRegistration}
                    disabled={disabled()}
                    spinning={submitting}
                >
                    Register
                </ButtonLink>
            </form>
            <TextLink to='/login' className='pt-4'>
                Already have an account?
            </TextLink>
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatcher.logOut(dispatch),
    openMessage: dispatcher.openMessage(dispatch),
    closeAllMessages: dispatcher.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
