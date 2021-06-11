import React from 'react';
import {LabelSimple, TextInputSimple} from 'components';
import {Link} from 'react-router-dom';
import {IconButton} from 'components';
import {icons} from 'assets';

export default function VisualRegister(props: {
    email: string;
    setEmail(newEmail: string): void;
    username: string;
    setUsername(newUsername: string): void;
    password: string;
    setPassword(newPassword: string): void;
    passwordConfirmation: string;
    setPasswordConfirmation(newPasswordConfirmation: string): void;

    entryIsValid: boolean;
    validationMessage: string;

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
                    <LabelSimple text='Email' />
                    <TextInputSimple
                        autoFocus
                        value={props.email}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setEmail(newValue);
                        }}
                    />
                </div>
                <div className='w-full centering-col gap-y-0.5'>
                    <LabelSimple text='Username' />
                    <TextInputSimple
                        value={props.username}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setUsername(newValue);
                        }}
                    />
                </div>
                <div className='w-full centering-col gap-y-0.5'>
                    <LabelSimple text='Password' />
                    <TextInputSimple
                        type='password'
                        value={props.password}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setPassword(newValue);
                        }}
                    />
                </div>
                <div className='w-full centering-col gap-y-0.5'>
                    <LabelSimple text='Repeat Password' />
                    <TextInputSimple
                        type='password'
                        value={props.passwordConfirmation}
                        setValue={(newValue) => {
                            props.closeAllMessages();
                            props.setPasswordConfirmation(newValue);
                        }}
                    />
                </div>

                <div className='w-full gap-y-0.5 flex flex-row-reverse items-center justify-center'>
                    <IconButton
                        text='Login'
                        variant='flat-light-blue'
                        onClick={props.handleRegistration}
                        disabled={props.disabled}
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
            <div
                className={
                    'w-full p-3 pr-6 text-justify flex-row-top space-x-2 ' +
                    'border-t-[3px] rounded-b ' +
                    (props.entryIsValid
                        ? 'text-green-500 bg-green-50 border-green-100 '
                        : 'text-red-400 bg-red-50 border-red-100 ')
                }
            >
                <div
                    className={
                        'flex-shrink-0 w-6 h-6 ' +
                        (props.entryIsValid ? 'icon-green ' : 'icon-red ')
                    }
                >
                    {props.entryIsValid ? icons.checkCircle : icons.closeCirlce}
                </div>
                <div className='text-left flex-max font-weight-600 text-md'>
                    {props.validationMessage}
                </div>
            </div>
        </div>
    );
}
