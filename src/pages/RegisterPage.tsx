import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';
import {Link} from 'react-router-dom';

interface RegisterPageComponentProps {}

function RegisterPageComponent(props: RegisterPageComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    function disabled() {
        return password.length < 8 || password !== passwordConfirmation;
    }

    return (
        <React.Fragment>
            <h2 className='mb-4 text-center no-selection'>Register</h2>
            <InputComponent
                required
                placeholder='email'
                value={email}
                onChange={setEmail}
            />
            <InputComponent
                required
                placeholder='password'
                value={password}
                onChange={setPassword}
                type='password'
                hint={{
                    text: '> 7 characters',
                    fulfilled: password.length >= 8,
                }}
            />
            <InputComponent
                required
                placeholder='confirm password'
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
                type='password'
                hint={{
                    text: 'passwords have to match',
                    fulfilled: password === passwordConfirmation,
                }}
            />
            <ButtonRowComponent center className={'pt-2'}>
                <ButtonComponent text='Register' disabled={disabled()} />
            </ButtonRowComponent>
            <div
                className={
                    'w-full text-center pt-4 text-gray-500 font-weight-500 no-selection'
                }
            >
                <Link to='/login'>Already have an account?</Link>
            </div>
        </React.Fragment>
    );
}

export default RegisterPageComponent;
