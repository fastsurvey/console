import React, {useRef, useState} from 'react';
import InputComponent from '../../../components/formFields/TextInput';
import {connect} from 'react-redux';
import stateTypes from '../../../utilities/types/stateTypes';
import {authPostRequest} from '../../../utilities/axiosClients';
import TextLink from '../../../components/links/TextLink';
import ButtonLink from '../../../components/links/ButtonLink';
import dispatcher from '../../../utilities/dispatcher';

interface RequestPasswordFormProps {
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}

function RequestPasswordForm(props: RequestPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const input1 = useRef(null);

    function handleSubmit() {
        // @ts-ignore
        input1.current?.blur();
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/request-new-password', {email})
                .then(() => {
                    setSubmitting(false);
                    setSuccess(true);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 400) {
                        props.openMessage({
                            text: 'Invalid email address',
                            type: 'error',
                        });
                    } else {
                        // Invalid password formats will be catched by frontend
                        props.openMessage({
                            text: 'Server error. Please try again later',
                            type: 'error',
                        });
                    }
                });
        }
    }

    function disabled() {
        return email.length < 5;
    }

    return (
        <div className='w-full'>
            {!success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>
                        Forgot your password?
                    </h2>

                    <form>
                        <InputComponent
                            placeholder='email'
                            value={email}
                            onChange={(newValue) => {
                                props.closeAllMessages();
                                setEmail(newValue);
                            }}
                            className='mb-2'
                            autoComplete='username'
                            ref={input1}
                            onEnter={handleSubmit}
                        />
                        <ButtonLink
                            className='pt-2'
                            onClick={handleSubmit}
                            disabled={disabled()}
                            spinning={submitting}
                        >
                            Request new password
                        </ButtonLink>
                    </form>
                    <TextLink to='/login' className='pt-4'>
                        Log in instead?
                    </TextLink>
                </React.Fragment>
            )}
            {success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>Success!</h2>
                    <p className='mb-4 text-center'>
                        Please set your new password by clicking the link in the
                        email we've just sent to:
                    </p>
                    <p className='text-center font-weight-600'>{email}</p>
                    <TextLink
                        onClick={() => {
                            setEmail('');
                            setSuccess(false);
                        }}
                        className='pt-4'
                    >
                        Wrong email address?
                    </TextLink>
                </React.Fragment>
            )}
        </div>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatcher.openMessage(dispatch),
    closeAllMessages: dispatcher.closeAllMessages(dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestPasswordForm);
