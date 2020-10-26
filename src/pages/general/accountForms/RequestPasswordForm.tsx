import React, {useState} from 'react';
import InputComponent from '../../../components/formFields/TextInput';
import {connect} from 'react-redux';
import {ReduxState} from '../../../utilities/types';
import {authPostRequest} from '../../../utilities/axiosClients';
import TextLink from '../../../components/links/TextLink';
import ButtonLink from '../../../components/links/ButtonLink';
import {
    openMessageAction,
    closeAllMessagesAction,
} from '../../../utilities/reduxActions';

interface RequestPasswordFormProps {
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function RequestPasswordForm(props: RequestPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    function handleSubmit() {
        if (!disabled()) {
            setSubmitting(true);
            authPostRequest('/request-new-password', {email})
                .then(() => {
                    setSubmitting(false);
                    props.closeAllMessages();
                    setSuccess(true);
                })
                .catch((error) => {
                    setSubmitting(false);
                    if (error?.response?.status === 400) {
                        props.openMessage('Invalid email address');
                    } else {
                        // Invalid password formats will be catched by frontend
                        props.openMessage(
                            'Server error. Please try again later',
                        );
                    }
                });
        }
    }

    function disabled() {
        return email.length < 5;
    }

    return (
        <div className='w-20vw'>
            {!success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>
                        Forgot your password?
                    </h3>

                    <InputComponent
                        placeholder='email'
                        value={email}
                        onChange={(newValue) => {
                            props.closeAllMessages();
                            setEmail(newValue);
                        }}
                    />
                    <ButtonLink
                        className='pt-2'
                        onClick={handleSubmit}
                        disabled={disabled()}
                        spinning={submitting}
                    >
                        Request new password
                    </ButtonLink>
                    <TextLink to='/login' className='pt-4'>
                        Log in instead?
                    </TextLink>
                </React.Fragment>
            )}
            {success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>Success!</h3>
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

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: (content: string) => dispatch(openMessageAction(content)),
    closeAllMessages: () => dispatch(closeAllMessagesAction()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestPasswordForm);
