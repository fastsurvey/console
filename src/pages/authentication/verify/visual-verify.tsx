import {Button} from '@components';
import React from 'react';
import {Link} from 'react-router-dom';

export default function VisualVerifyForm(props: {
    verificationState: 'not-started' | 'submitting' | 'successful' | 'failed';
    tokenExists: boolean;
    triggerVerification(): void;
}) {
    const {verificationState, tokenExists} = props;
    return (
        <div
            className={
                'w-full max-w-sm p-4 bg-white rounded shadow ' +
                'gap-y-4 centering-col'
            }
        >
            {verificationState !== 'successful' && (
                <>
                    <h1
                        className={
                            'w-full text-2xl text-center no-selection ' +
                            'text-gray-800 font-weight-600'
                        }
                    >
                        Verify your Email
                    </h1>
                    <Button
                        text='Verify Email'
                        disabled={verificationState === 'submitting'}
                        variant='flat-light-blue'
                        onClick={props.triggerVerification}
                    />
                    {!tokenExists && (
                        <>
                            <p className='text-left text-gray-800 font-weight-500'>
                                Sorry, we couldn't find any email token in the
                                url. Please use exactly the link we've sent to
                                you.
                            </p>
                            <Link
                                to='/login'
                                className={
                                    'px-1.5 py-0.5 -mx-1.5 text-sm ' +
                                    'rounded ringable text-gray-500 ' +
                                    'font-weight-600'
                                }
                            >
                                Return to Login
                            </Link>
                        </>
                    )}
                </>
            )}
            {verificationState === 'successful' && (
                <h1
                    className={
                        'w-full text-2xl text-center no-selection ' +
                        'text-gray-800 font-weight-600'
                    }
                >
                    Success!
                </h1>
            )}
        </div>
    );
}
