import React, {useState} from 'react';
import TextInput from '../../../components/formFields/TextInput';
import {ReduxState, JWT, Account} from '../../../utilities/types';
import {
    closeAllMessagesAction,
    logInAction,
    openMessageAction,
} from '../../../utilities/reduxActions';
import {connect} from 'react-redux';
import {authPostRequest} from '../../../utilities/axiosClients';
import TextLink from '../../../components/links/TextLink';
import ButtonLink from '../../../components/links/ButtonLink';

interface RegisterFormProps {
    logIn(jwt: JWT, account: Account): void;
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function RegisterForm(props: RegisterFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [submitting, setSubmitting] = useState(false);

    function handleRegistration() {
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/register', {email, password})
                .then((response) => {
                    setSubmitting(false);
                    props.closeAllMessages();
                    props.logIn(response.data.jwt, response.data.account);
                })
                .catch((error) => {
                    setSubmitting(false);
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
        <div className='w-full'>
            <h2 className='mb-4 text-center no-selection'>Register</h2>
            <TextInput
                required
                placeholder='email'
                value={email}
                onChange={(newValue) => {
                    props.closeAllMessages();
                    setEmail(newValue);
                }}
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
            />
            <ButtonLink
                className='pt-2'
                onClick={handleRegistration}
                disabled={disabled()}
                spinning={submitting}
            >
                Register
            </ButtonLink>
            <TextLink to='/login' className='pt-4'>
                Already have an account?
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
