import React, {useState} from 'react';
import InputComponent from '../../../components/input';
import Button from '../../../components/buttons/Button';
import ButtonRow from '../../../components/buttons/ButtonRow';
import {Link} from 'react-router-dom';
import {ReduxState, JWT, Account} from '../../../utilities/types';
import {
    closeAllMessagesAction,
    logInAction,
    openMessageAction,
} from '../../../utilities/reduxActions';
import {connect} from 'react-redux';
import {authPostRequest} from '../../../utilities/axiosClients';

interface RegisterFormProps {
    loggingIn: boolean;
    logIn(jwt: JWT, account: Account): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function RegisterForm(props: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    function handleRegistration() {
        if (!disabled()) {
            authPostRequest('/register', {email, password})
                .then((response) => {
                    props.closeAllMessages();
                    props.logIn(response.data.jwt, response.data.account);
                })
                .catch((error) => {
                    const detail = error?.response?.data?.detail;
                    if (detail === 'email already taken') {
                        props.openMessage(
                            'Email ' + email + ' is already taken',
                        );
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
            <h3 className='mb-4 text-center no-selection'>Register</h3>
            <InputComponent
                required
                placeholder='email'
                value={email}
                onChange={(newValue) => {
                    props.closeAllMessages();
                    setEmail(newValue);
                }}
            />
            <InputComponent
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
            />
            <InputComponent
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
            />
            <ButtonRow center className={'pt-2'}>
                <Button
                    onClick={handleRegistration}
                    text='Register'
                    disabled={disabled()}
                />
            </ButtonRow>
            <div
                className={
                    'w-full text-center pt-4 text-gray-500 font-weight-500 no-selection'
                }
            >
                <Link to='/login'>Already have an account?</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
