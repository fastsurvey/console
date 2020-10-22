import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';

interface LoginPageComponentProps {}

function LoginPageComponent(props: LoginPageComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <main
            className={
                'flex flex-row items-center justify-center w-100vw h-100vh'
            }
        >
            <div className={'w-20vw'}>
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
                <ButtonRowComponent center>
                    <ButtonComponent text='Login' />
                </ButtonRowComponent>
            </div>
        </main>
    );
}

export default LoginPageComponent;
