import React from 'react';
import {Link} from 'react-router-dom';

export default function VisualVerifyForm(props: {
    verificationSuccessful: boolean;
    tokenExists: boolean;
    submitting: boolean;
}) {
    const {verificationSuccessful, submitting, tokenExists} = props;
    return (
        <div
            className={
                'w-full max-w-sm p-4 bg-white rounded shadow ' +
                'gap-y-4 centering-col'
            }
        >
            {!verificationSuccessful && (
                <>
                    <h1
                        className={
                            'w-full text-2xl text-center no-selection ' +
                            'text-gray-800 font-weight-600'
                        }
                    >
                        Verify your Email
                    </h1>
                    {tokenExists && submitting && (
                        <p className='text-gray-700 font-weight-500'>
                            processing ...
                        </p>
                    )}
                    {tokenExists && !submitting && (
                        <p className='text-gray-700 font-weight-500'>
                            verification failed
                        </p>
                    )}
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
            {verificationSuccessful && (
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
