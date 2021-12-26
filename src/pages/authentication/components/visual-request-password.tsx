import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Label, TextInput} from '/src/components';

const VisualRequestPassword = (props: {
    identifier: string;
    setIdentifier(i: string): void;
    submissionState: 'pending' | 'submitting' | 'success' | 'failed';
    setSubmissionState(s: 'pending' | 'submitting' | 'success' | 'failed'): void;
    submitIsPossible: boolean;
    handleRequest(): void;
}) => (
    <section
        className='w-full max-w-md p-4 bg-white rounded shadow centering-col gap-y-4'
        data-cy={`request-password-panel state-${props.submissionState}`}
    >
        <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
            {props.submissionState === 'pending' && 'Forgot your password?'}
            {props.submissionState === 'submitting' && 'Forgot your password?'}
            {props.submissionState === 'success' && 'Success!'}
            {props.submissionState === 'failed' && 'Server Error'}
        </h1>

        {(props.submissionState === 'pending' ||
            props.submissionState === 'submitting') && (
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Email or Username' />
                <TextInput
                    type='text'
                    value={props.identifier}
                    setValue={(newValue) => {
                        props.setIdentifier(newValue);
                    }}
                    disabled={props.submissionState === 'submitting'}
                    autoComplete='username'
                    data-cy='input-identifier'
                />
            </div>
        )}
        {props.submissionState === 'success' && (
            <p className='leading-snug text-center text-gray-700 font-weight-500'>
                We've sent an email with instructions to the account associated with{' '}
                <strong className='text-gray-900 break-all font-weight-700'>
                    {props.identifier}
                </strong>
            </p>
        )}
        {props.submissionState === 'failed' && (
            <p className='leading-snug text-center text-gray-700 font-weight-500'>
                We are very sorry! Please try again later.
            </p>
        )}

        <div className='w-full gap-y-0.5 flex flex-row-reverse items-start justify-center mt-2'>
            {(props.submissionState === 'pending' ||
                props.submissionState === 'submitting') && (
                <>
                    <Button
                        text='Request New Password'
                        variant='flat-light-blue'
                        onClick={props.handleRequest}
                        disabled={
                            !props.submitIsPossible ||
                            props.submissionState === 'submitting'
                        }
                        loading={props.submissionState === 'submitting'}
                        data-cy='button-submit'
                    />{' '}
                    <div className='flex-max' />
                </>
            )}
            {props.submissionState === 'success' && (
                <>
                    <Button
                        text='Wrong email?'
                        variant='flat-light-blue'
                        onClick={() => props.setSubmissionState('pending')}
                        data-cy='button-typo'
                    />{' '}
                    <div className='flex-max' />
                </>
            )}
            <Link
                to='/login'
                className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                data-cy='link-to-login'
            >
                Go to login
            </Link>
        </div>
    </section>
);

export default VisualRequestPassword;
