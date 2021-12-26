import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Label, TextInput} from '/src/components';
import {validators} from '../../utilities/form-utils/validators';
import {backend, reduxUtils} from '/src/utilities';
import {types} from '/src/types';
import {connect} from 'react-redux';

function RequestPassword(props: {openMessage(messageId: types.MessageId): void}) {
    const [identifier, setIdentifier] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const submitPossible =
        validators.email(identifier).valid || validators.username(identifier).valid;

    function handleRequest() {
        function handleError(code: 400 | 500): void {
            setSubmitting(false);
            switch (code) {
                case 400:
                    props.openMessage('error-credentials');
                    break;
                default:
                    props.openMessage('error-server');
                    break;
            }
        }

        function handleSuccess(): void {
            setSubmitting(false);
            console.log('SUCCESS');
        }

        if (submitPossible) {
            setSubmitting(true);
            backend.requestNewPassword({identifier}, handleSuccess, handleError);
        }
    }

    return (
        <div className='w-full max-w-md p-4 bg-white rounded shadow centering-col gap-y-4'>
            <h1 className='text-2xl text-center text-gray-800 font-weight-600 no-selection'>
                Forgot your password?
            </h1>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Email or Username' />
                <TextInput
                    type='text'
                    value={identifier}
                    setValue={(newValue) => {
                        setIdentifier(newValue);
                    }}
                    autoComplete='current-password'
                    data-cy='input-password'
                />
            </div>

            <div className='w-full gap-y-0.5 flex flex-row-reverse items-start justify-center'>
                <Button
                    text='Request New Password'
                    variant='flat-light-blue'
                    onClick={handleRequest}
                    disabled={!submitPossible}
                    loading={submitting}
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
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RequestPassword);
