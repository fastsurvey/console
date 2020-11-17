import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';

import {stateTypes, dispatcher, authPostRequest} from 'utilities';

import {TextInput, TextLink, ButtonLink} from 'components';

interface LoginFormProps {
    logIn(
        oauth2_token: stateTypes.OAuth2Token,
        account: stateTypes.Account,
    ): void;
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}

function LoginForm(props: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const input2 = useRef(null);
    function focusInput2() {
        // @ts-ignore
        input2.current?.focus();
    }

    function handleLogin() {
        // @ts-ignore
        input2.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/login/form', {email, password})
                .then((response) => {
                    setSubmitting(false);
                    props.logIn(
                        response.data.oauth2_token,
                        response.data.account,
                    );
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage({
                            text: 'Invalid credentials',
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
        return email.length < 5 || password.length < 8;
    }

    return (
        <div className='w-full'>
            <h2 className='mb-4 text-center no-selection'>Login</h2>
            <form>
                <TextInput
                    placeholder='email'
                    value={email}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        setEmail(newValue);
                    }}
                    className='mb-2'
                    autoComplete='email username'
                    onEnter={focusInput2}
                />
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
                    ref={input2}
                    onEnter={handleLogin}
                />
                <ButtonLink
                    className='pt-2'
                    onClick={handleLogin}
                    disabled={disabled()}
                    spinning={submitting}
                >
                    Login
                </ButtonLink>
            </form>
            <TextLink to='/register' className='pt-4'>
                Don't have an account yet?
            </TextLink>
            <TextLink to='/request-password' className='pt-2'>
                Forgot your password?
            </TextLink>
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: dispatcher.logIn(dispatch),
    openMessage: dispatcher.openMessage(dispatch),
    closeAllMessages: dispatcher.closeAllMessages(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
