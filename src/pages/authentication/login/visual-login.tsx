import React from 'react';
import {TextInputSimple, LabelSimple, IconButton} from 'components';
import {Link} from 'react-router-dom';

export default function VisualLogin(props: {
    identifier: string;
    setIdentifier(newIdentifier: string): void;
    password: string;
    setPassword(newPassword: string): void;

    disabled: boolean;
    submitting: boolean;

    closeAllMessages(): void;
    handleLogin(): void;
}) {
    return (
        <div className='w-full max-w-sm p-4 bg-white rounded shadow centering-col gap-y-4'>
            <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
                Login
            </h1>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Email or Username' />
                <TextInputSimple
                    autoComplete='email username'
                    value={props.identifier}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setIdentifier(newValue);
                    }}
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Password' />
                <TextInputSimple
                    type='password'
                    autoComplete='current-password'
                    value={props.password}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setPassword(newValue);
                    }}
                />
            </div>

            <div className='w-full gap-y-0.5 flex flex-row-reverse items-center justify-center'>
                <IconButton
                    text='Login'
                    variant='flat-light-blue'
                    onClick={props.handleLogin}
                    disabled={props.disabled}
                />
                <div className='flex-max' />
                <Link
                    to='/register'
                    className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                >
                    Don't have an account yet?
                </Link>
            </div>
        </div>
    );
}
