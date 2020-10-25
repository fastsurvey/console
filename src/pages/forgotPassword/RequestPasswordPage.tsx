import React, {useState} from 'react';
import InputComponent from '../../components/input';
import ButtonComponent from '../../components/button';
import ButtonRowComponent from '../../components/buttonRow';
import {connect} from 'react-redux';
import {ReduxState, JWT, Account} from '../../utilities/types';
import {authPostRequest} from '../../utilities/axiosClients';
import {
    openMessageAction,
    closeAllMessagesAction,
} from '../../utilities/reduxActions';

interface RequestPasswordPageProps {
    openMessage(content: string): void;
    closeAllMessages(): void;
}

function RequestPasswordPage(props: RequestPasswordPageProps) {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSubmit() {
        if (!disabled()) {
            authPostRequest('/request-new-password', {email})
                .then(() => {
                    props.closeAllMessages();
                    setSuccess(true);
                })
                .catch((error) => {
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
                    <ButtonRowComponent center className={'pt-2'}>
                        <ButtonComponent
                            onClick={handleSubmit}
                            text='Request new password'
                            disabled={disabled()}
                        />
                    </ButtonRowComponent>
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
                    <div
                        onClick={() => {
                            setEmail('');
                            setSuccess(false);
                        }}
                        className={
                            'w-full text-center pt-4 text-gray-500 font-weight-500 ' +
                            'no-selection cursor-pointer'
                        }
                    >
                        Wrong email address?
                    </div>
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
)(RequestPasswordPage);
