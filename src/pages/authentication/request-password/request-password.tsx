import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {stateTypes, dispatchers, authPostRequest} from 'utilities';
import VisualRequestPassword from './visual-request-password';

interface Props {
    openMessage(message: stateTypes.Message): void;
    closeAllMessages(): void;
}
function RequestPasswordForm(props: Props) {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function disabled() {
        return email.length < 5;
    }

    const input1Ref = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        input1Ref.current?.blur();
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

    return (
        <VisualRequestPassword
            // @ts-ignore
            ref={{input1Ref}}
            success={success}
            setSuccess={setSuccess}
            email={email}
            setEmail={setEmail}
            disabled={disabled()}
            submitting={submitting}
            handleSubmit={handleSubmit}
            closeAllMessages={props.closeAllMessages}
        />
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: dispatchers.openMessage(dispatch),
    closeAllMessages: dispatchers.closeAllMessages(dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestPasswordForm);
