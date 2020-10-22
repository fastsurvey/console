import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';
import {Link} from 'react-router-dom';

interface LoginPageComponentProps {}

function LoginPageComponent(props: LoginPageComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <React.Fragment>
            <h2 className='mb-4 text-center'>Login</h2>
            <InputComponent
                placeholder='email'
                value={email}
                onChange={setEmail}
                className={'mb-2'}
            />
            <InputComponent
                placeholder='password'
                value={password}
                onChange={setPassword}
                type='password'
                className={'mb-2'}
            />
            <ButtonRowComponent center className={'pt-2'}>
                <ButtonComponent text='Login' disabled />
            </ButtonRowComponent>
            <div
                className={
                    'w-full text-center pt-4 text-gray-500 font-weight-500'
                }
            >
                <Link to='/register'>Don't have an account yet?</Link>
            </div>
        </React.Fragment>
    );
}

export default LoginPageComponent;
