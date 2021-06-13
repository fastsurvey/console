import React from 'react';
import {TextInput, Button, Label} from 'components';
import {Link} from 'react-router-dom';

export default function VisualVerifyForm(props: {
    password: string;
    setPassword(password: string): void;

    verificationSuccessful: boolean;
    tokenExists: boolean;
    disabled: boolean;
    submitting: boolean;

    handleVerify(): void;
    history: any;
}) {
    return (
        <div
            className={
                'w-full max-w-sm p-4 bg-white rounded shadow ' +
                'gap-y-4 centering-col'
            }
        >
            {!props.verificationSuccessful && (
                <>
                    <h1
                        className={
                            'w-full text-2xl text-center no-selection ' +
                            'text-gray-800 font-weight-600'
                        }
                    >
                        Verify your Email
                    </h1>
                    {props.tokenExists && (
                        <>
                            <div className='w-full centering-col gap-y-0.5'>
                                <Label text='Password' />
                                <TextInput
                                    value={props.password}
                                    setValue={(newValue) => {
                                        props.setPassword(newValue);
                                    }}
                                    type='password'
                                />
                            </div>
                            <div
                                className={
                                    'w-full gap-y-0.5 flex flex-row-reverse ' +
                                    'items-center justify-center'
                                }
                            >
                                <Button
                                    text='verify'
                                    onClick={props.handleVerify}
                                    disabled={props.disabled}
                                    variant='flat-light-blue'
                                />
                                <div className='flex-max' />
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
                            </div>
                        </>
                    )}
                    {!props.tokenExists && (
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
            {props.verificationSuccessful && (
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
