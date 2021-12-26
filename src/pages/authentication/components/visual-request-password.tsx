import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Label, TextInput} from '/src/components';

const VisualRequestPassword = (props: {
    identifier: string;
    setIdentifier(i: string): void;
    isSubmitting: boolean;
    submitIsPossible: boolean;
    handleRequest(): void;
}) => (
    <div className='w-full max-w-md p-4 bg-white rounded shadow centering-col gap-y-4'>
        <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
            Forgot your password?
        </h1>
        <div className='w-full centering-col gap-y-0.5'>
            <Label text='Email or Username' />
            <TextInput
                type='text'
                value={props.identifier}
                setValue={(newValue) => {
                    props.setIdentifier(newValue);
                }}
                autoComplete='current-password'
                data-cy='input-password'
            />
        </div>

        <div className='w-full gap-y-0.5 flex flex-row-reverse items-start justify-center'>
            <Button
                text='Request New Password'
                variant='flat-light-blue'
                onClick={props.handleRequest}
                disabled={!props.submitIsPossible}
                loading={props.isSubmitting}
                data-cy='button-submit'
            />
            <div className='flex-max' />
            <div className='flex-col-left'>
                <Link
                    to='/register'
                    className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                    data-cy='link-to-register'
                >
                    Don't have an account yet?
                </Link>
                <Link
                    to='/forgot-password'
                    className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                    data-cy='link-to-forgot'
                >
                    Forgot your password?
                </Link>
            </div>
        </div>
    </div>
);

export default VisualRequestPassword;
