import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Label, TextInput} from '/src/components';

const VisualSetPassword = (props: {
    password: string;
    setPassword(i: string): void;
    submissionState:
        | 'no-token'
        | 'pending'
        | 'submitting'
        | 'success'
        | 'invalid-token'
        | 'server-error';
    submitIsPossible: boolean;
    handleRequest(): void;
}) => (
    <section
        className='w-full max-w-md p-4 bg-white rounded shadow centering-col gap-y-4'
        data-cy={`set-password-panel state-${props.submissionState}`}
    >
        <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
            {props.submissionState === 'no-token' && 'Invalid Link'}
            {props.submissionState === 'pending' && 'Set a new password'}
            {props.submissionState === 'submitting' && 'Set a new password'}
            {props.submissionState === 'success' && 'Success! 🎉'}
            {props.submissionState === 'server-error' && 'Server Error'}
            {props.submissionState === 'invalid-token' && 'Invalid Token'}
        </h1>

        {(props.submissionState === 'pending' ||
            props.submissionState === 'submitting') && (
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='New Password' />
                <TextInput
                    type='password'
                    value={props.password}
                    setValue={(newValue) => {
                        props.setPassword(newValue);
                    }}
                    disabled={props.submissionState === 'submitting'}
                    autoComplete='new-password'
                    data-cy='input-password'
                />
            </div>
        )}
        {['no-token', 'server-error', 'invalid-token', 'success'].includes(
            props.submissionState,
        ) && (
            <p className='text-center text-gray-500 font-weight-500'>
                {props.submissionState === 'no-token' &&
                    "Your link you used is incomplete (token is missing). Please use the full link from the email we've sent you."}
                {props.submissionState === 'server-error' &&
                    'We are very sorry! Please try again later.'}
                {props.submissionState === 'invalid-token' &&
                    "The link you used is incomplete or expired. Please use the full link from the email we've sent you or re-request a new password."}
                {props.submissionState === 'success' && 'You have a new password now!'}
            </p>
        )}

        <div className='w-full gap-y-0.5 flex flex-row-reverse items-start justify-center mt-2'>
            {(props.submissionState === 'pending' ||
                props.submissionState === 'submitting') && (
                <>
                    <Button
                        text='Set New Password'
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
                    <Link to='/surveys' data-cy='link-to-surveys'>
                        <Button
                            text='Use FastSurvey now'
                            variant='flat-light-blue'
                            onClick={props.handleRequest}
                        />
                    </Link>
                    <div className='flex-max' />
                </>
            )}
            {props.submissionState === 'invalid-token' && (
                <>
                    <Link to='/request-password' data-cy='link-to-request-password'>
                        <Button
                            text='Request password again'
                            variant='flat-light-blue'
                            onClick={props.handleRequest}
                        />
                    </Link>
                    <div className='flex-max' />
                </>
            )}
            {props.submissionState !== 'success' && (
                <Link
                    to='/login'
                    className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
                    data-cy='link-to-login'
                >
                    Go to login
                </Link>
            )}
        </div>
    </section>
);

export default VisualSetPassword;
