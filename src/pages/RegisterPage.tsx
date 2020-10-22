import React, {useState} from 'react';
import InputComponent from '../components/input';
import ButtonComponent from '../components/button';
import ButtonRowComponent from '../components/buttonRow';
import LoginImage from '../assets/images/secure.svg';
import {Link} from 'react-router-dom';

interface RegisterPageComponentProps {}

function RegisterPageComponent(props: RegisterPageComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    return (
        <main
            className={
                'flex flex-row items-center justify-center w-100vw h-100vh'
            }
        >
            <div
                className={
                    'flex flex-col items-center justify-center w-35vw h-100vh'
                }
            >
                <div className={'w-25vw'}>
                    <img src={LoginImage} alt='Fast Surveys' />
                </div>
            </div>
            <div
                className={
                    'flex flex-col items-center justify-center w-35vw h-100vh'
                }
            >
                <div className={'w-20vw'}>
                    <h2 className='mb-4 text-center'>Register</h2>
                    <InputComponent
                        required
                        placeholder='email'
                        value={email}
                        onChange={setEmail}
                        className={'mb-2'}
                    />
                    <InputComponent
                        required
                        placeholder='password'
                        value={password}
                        onChange={setPassword}
                        type='password'
                        className={'mb-2'}
                    />
                    <InputComponent
                        required
                        placeholder='confirm password'
                        value={passwordConfirmation}
                        onChange={setPasswordConfirmation}
                        type='password'
                        className={'mb-2'}
                    />
                    <ButtonRowComponent center className={'pt-2'}>
                        <ButtonComponent text='Register' disabled />
                    </ButtonRowComponent>
                    <div
                        className={
                            'w-full text-center pt-4 text-gray-500 font-weight-500'
                        }
                    >
                        <Link to='/login'>Already have an account?</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RegisterPageComponent;
