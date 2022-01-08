import React from 'react';
import {TextInput, Label, Button} from '/src/components';
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
        <section
            className='w-full max-w-md p-4 bg-white rounded shadow-sm flex-col-center gap-y-4'
            data-cy='login-panel'
        >
            <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
                Login
            </h1>
            <div className='w-full flex-col-center gap-y-0.5'>
                <Label text='Email or Username' />
                <TextInput
                    autoFocus
                    value={props.identifier}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setIdentifier(newValue);
                    }}
                    autoComplete='email'
                    data-cy='input-identifier'
                />
            </div>
            <div className='w-full flex-col-center gap-y-0.5'>
                <Label text='Password' />
                <TextInput
                    type='password'
                    value={props.password}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setPassword(newValue);
                    }}
                    autoComplete='current-password'
                    data-cy='input-password'
                />
            </div>

            <div className='w-full gap-y-0.5 flex flex-row-reverse items-start justify-center'>
                <Button
                    text='Login'
                    variant='flat-light-blue'
                    onClick={props.handleLogin}
                    disabled={props.disabled}
                    loading={props.submitting}
                    data-cy='button-submit'
                />
                <div className='flex-grow' />
                <div className='flex-col-left'>
                    <Link
                        to='/register'
                        className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                        data-cy='link-to-register'
                    >
                        Don't have an account yet?
                    </Link>
                    <Link
                        to='/request-password'
                        className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                        data-cy='link-to-forgot'
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </section>
    );
}
