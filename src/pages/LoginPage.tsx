import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AUTH_BACKEND_URL} from '../constants';
import {connect} from 'react-redux';
import {JWT, Account, ReduxState} from '../utilities/types';
import {logIn} from '../utilities/reduxActions';

interface LoginPageComponentProps {
    loggingIn: boolean;
    logIn(jwt: JWT, account: Account): void;
}

function LoginPageComponent(props: LoginPageComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (!disabled()) {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            axios
                .post(AUTH_BACKEND_URL + '/login', formData)
                .then((response) => {
                    props.logIn(response.data.jwt, response.data.account);
                })
                .catch((error) => {
                    let errorMessage: string;
                    if (error?.response?.status === 401) {
                        errorMessage = 'Invalid credentials';
                    } else {
                        // Invalid password formats will be catched by frontend
                        errorMessage = 'Server error. Please try again later';
                    }
                    console.log(errorMessage);
                });
        }
    }

    function disabled() {
        return email.length < 5 || password.length < 8;
    }

    return (
        <React.Fragment>
            <h2 className='mb-4 text-center no-selection'>Login</h2>
            <InputComponent
                placeholder='email'
                value={email}
                onChange={setEmail}
            />
            <InputComponent
                placeholder='password'
                value={password}
                onChange={setPassword}
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
        </React.Fragment>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    loggingIn: state.loggingIn,
});
const mapDispatchToProps = (dispatch: any) => ({
    logIn: (jwt: JWT, account: Account) => dispatch(logIn(jwt, account)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
