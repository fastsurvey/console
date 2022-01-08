import React from 'react';
import {Label, TextInput, Button, ValidationBar} from '/src/components';
import {Link} from 'react-router-dom';
import {types} from 'types';

export default function VisualRegister(props: {
    email: string;
    setEmail(newEmail: string): void;
    username: string;
    setUsername(newUsername: string): void;
    password: string;
    setPassword(newPassword: string): void;

    validation: types.ValidationResult;

    disabled: boolean;
    submitting: boolean;

    closeAllMessages(): void;
    handleRegistration(): void;
}) {
    const {email, username, password} = props;

    return (
        <section
            className='w-full max-w-md bg-white rounded shadow-sm centering-col'
            data-cy='register-panel'
        >
            <div className='w-full p-4 centering-col gap-y-4'>
                <h1
                    className='text-2xl text-center text-gray-800 font-weight-600 no-selection'
                    data-cy='title'
                >
                    Register
                </h1>
                <div className='w-full centering-col gap-y-0.5'>
                    <Label text='Email' />
                    <TextInput
                        autoFocus
                        value={email}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setEmail(newValue);
                        }}
                        autoComplete='email'
                        data-cy='input-email'
                    />
                </div>
                <div className='w-full centering-col gap-y-0.5'>
                    <Label text='Username' />
                    <TextInput
                        value={username}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setUsername(newValue);
                        }}
                        autoComplete='username'
                        data-cy='input-username'
                    />
                </div>
                <div className='w-full centering-col gap-y-0.5'>
                    <Label text='Password' />
                    <TextInput
                        type='password'
                        value={password}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setPassword(newValue);
                        }}
                        autoComplete='new-password'
                        data-cy='input-password'
                    />
                </div>

                <div className='w-full gap-y-0.5 flex flex-row-reverse items-center justify-center'>
                    <Button
                        text='Register'
                        variant='flat-light-blue'
                        onClick={props.handleRegistration}
                        disabled={props.disabled}
                        loading={props.submitting}
                        data-cy='button-submit'
                    />
                    <div className='flex-max' />
                    <Link
                        to='/login'
                        className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                        data-cy='link-to-login'
                    >
                        Already have an account?
                    </Link>
                </div>
            </div>
            <ValidationBar validation={props.validation} showValidState />
        </section>
    );
}
