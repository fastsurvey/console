import React from 'react';
import {Label, TextInput, Button, ValidationBar} from '@components';
import {Link} from 'react-router-dom';
import {icons} from '@assets';
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
    return (
        <div className='w-full max-w-sm bg-white rounded shadow centering-col'>
            <div className='w-full p-4 centering-col gap-y-4'>
                <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
                    Register
                </h1>
                <div className='w-full centering-col gap-y-0.5'>
                    <Label text='Email' />
                    <TextInput
                        autoFocus
                        value={props.email}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setEmail(newValue);
                        }}
                    />
                </div>
                <div className='w-full centering-col gap-y-0.5'>
                    <Label text='Username' />
                    <TextInput
                        value={props.username}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setUsername(newValue);
                        }}
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
                    />
                </div>

                <div className='w-full gap-y-0.5 flex flex-row-reverse items-center justify-center'>
                    <Button
                        text='Register'
                        variant='flat-light-blue'
                        onClick={props.handleRegistration}
                        disabled={props.disabled}
                        loading={props.submitting}
                    />
                    <div className='flex-max' />
                    <Link
                        to='/login'
                        className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                    >
                        Already have an account?
                    </Link>
                </div>
            </div>
            <ValidationBar validation={props.validation} />
        </div>
    );
}
