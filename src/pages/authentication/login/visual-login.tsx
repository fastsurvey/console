import React from 'react';
import {TextInput, Label, Button} from '@components';
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
                <Label text='Email or Username' />
                <TextInput
                    autoFocus
                    value={props.identifier}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setIdentifier(newValue);
                    }}
                    autoComplete='email'
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Password' />
                <TextInput
                    type='password'
                    value={props.password}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setPassword(newValue);
                    }}
                    autoComplete='current-password'
                />
            </div>

            <div className='w-full gap-y-0.5 flex flex-row-reverse items-start justify-center'>
                <Button
                    text='Login'
                    variant='flat-light-blue'
                    onClick={props.handleLogin}
                    disabled={props.disabled}
                    loading={props.submitting}
                />
                <div className='flex-max' />
                <div className='flex-col-left'>
                    <Link
                        to='/register'
                        className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                    >
                        Don't have an account yet?
                    </Link>
                    <Link
                        to='/forgot-password'
                        className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    );
}
