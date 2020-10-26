import React, {useState} from 'react';
import TextInput from '../../../components/formFields/TextInput';
import {connect} from 'react-redux';
import {JWT, Account, ReduxState} from '../../../utilities/types';
import {authPostRequest} from '../../../utilities/axiosClients';
import TextLink from '../../../components/links/TextLink';
import ButtonLink from '../../../components/links/ButtonLink';
import {
    logInAction,
    openMessageAction,
    closeAllMessagesAction,
} from '../../../utilities/reduxActions';

interface LoginFormProps {
    logIn(jwt: JWT, account: Account): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function LoginForm(props: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function handleLogin() {
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/login/form', {email, password})
                .then((response) => {
                    props.closeAllMessages();
                    setSubmitting(false);
                    props.logIn(response.data.jwt, response.data.account);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 401) {
                        props.openMessage('Invalid credentials');
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
        return email.length < 5 || password.length < 8;
    }

    return (
        <div className='w-20vw'>
            <h3 className='mb-4 text-center no-selection'>Login</h3>
            <TextInput
                placeholder='email'
                value={email}
                onChange={(newValue) => {
                    props.closeAllMessages();
                    setEmail(newValue);
                }}
            />
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
                onClick={handleLogin}
                disabled={disabled()}
                spinning={submitting}
            >
                Login
            </ButtonLink>
            <TextLink to='/register' className='pt-4'>
                Don't have an account yet?
            </TextLink>
            <TextLink to='/request-password' className='pt-2'>
                Forgot your password?
            </TextLink>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: (jwt: JWT, account: Account) => dispatch(logInAction(jwt, account)),
    openMessage: (content: string) => dispatch(openMessageAction(content)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
