import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {JWT, Account, ReduxState} from '../utilities/types';
import {authPostRequest} from '../utilities/axiosClients';
import {
    logInAction,
    openMessageAction,
    closeAllMessagesAction,
} from '../utilities/reduxActions';

interface LoginPageComponentProps {
    loggingIn: boolean;
    logIn(jwt: JWT, account: Account): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function LoginPageComponent(props: LoginPageComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (!disabled()) {
            authPostRequest('/login/form', {email, password})
                .then((response) => {
                    props.closeAllMessages();
                    props.logIn(response.data.jwt, response.data.account);
                })
                .catch((error) => {
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
            <InputComponent
                placeholder='email'
                value={email}
                onChange={(newValue) => {
                    props.closeAllMessages();
                    setEmail(newValue);
                }}
            />
            <InputComponent
                placeholder='password'
                value={password}
                onChange={(newValue) => {
                    props.closeAllMessages();
                    setPassword(newValue);
                }}
                type='password'
            />
            <ButtonRowComponent center className={'pt-2'}>
                <ButtonComponent
                    onClick={handleLogin}
                    text='Login'
                    disabled={disabled()}
                />
            </ButtonRowComponent>
            <div
                className={
                    'w-full text-center pt-4 text-gray-500 font-weight-500 no-selection'
                }
            >
                <Link to='/register'>Don't have an account yet?</Link>
            </div>
            <div
                className={
                    'w-full text-center pt-2 text-gray-500 font-weight-500 no-selection'
                }
            >
                <Link to='/request-password'>Forgot your password?</Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    loggingIn: state.loggingIn,
});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: (jwt: JWT, account: Account) => dispatch(logInAction(jwt, account)),
    openMessage: (content: string) => dispatch(openMessageAction(content)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
