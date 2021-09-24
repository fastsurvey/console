import React from 'react';
import {Link} from 'react-router-dom';

export default function ForgotPassword() {
    return (
        <div className='w-full max-w-md p-4 bg-white rounded shadow centering-col gap-y-4'>
            <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
                Forgot your password?
            </h1>
            <p className='text-left text-gray-800 font-weight-500'>
                Please send an email to{' '}
                <a
                    href='mailto:support@fastsurvey.de'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline font-weight-600'
                >
                    support@fastsurvey.de
                </a>{' '}
                and we will get you a new password quickly.
            </p>

            <Link
                to='/login'
                className='px-1.5 py-0.5 -mx-1.5 text-sm text-gray-400 rounded font-weight-600 ringable'
            >
                Go back to login
            </Link>
        </div>
    );
}
