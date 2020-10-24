import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AUTH_BACKEND_URL} from '../constants';
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
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const queryParams = new URLSearchParams(window.location.search);
    let email_token = queryParams.get('email_token');

    function handleVerify() {
        if (!disabled() && email_token !== null) {
            authPostRequest('/verify', {password, email_token})
                .then((response) => {
                    props.closeAllMessages();
                    // new jwt and account since the accout payload has been updated
                    props.logIn(response.data.jwt, response.data.account);
                    setSuccess(true);
                })
                .catch((error) => {
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
        <div className='w-20vw'>
            {!success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>
                        Verify your email
                    </h3>
                    {email_token !== null && (
                        <React.Fragment>
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
                                    onClick={handleVerify}
                                    text='Verify'
                                    disabled={disabled()}
                                />
                            </ButtonRowComponent>
                        </React.Fragment>
                    )}
                    {email_token === null && (
                        <p>
                            Sorry, we couldn't find any email token in the url.
                            Please use exactly the link we've sent to you.
                        </p>
                    )}
                </React.Fragment>
            )}
            {success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>Success!</h3>
                    <ButtonRowComponent center className={'pt-2'}>
                        <Link to='/configurations'>
                            <ButtonComponent
                                onClick={handleVerify}
                                text='Continue to Admin Panel'
                                disabled={disabled()}
                            />
                        </Link>
                    </ButtonRowComponent>
                </React.Fragment>
            )}
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
