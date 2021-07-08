import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {reduxUtils, authPostRequest} from '@utilities';
import VisualRequestPassword from './visual-request-password';
import {types} from '@types';

interface Props {
    openMessage(messageId: types.MessageId): void;
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
                    props.openMessage(
                        error?.response?.status === 400
                            ? 'error-email-invalid'
                            : 'error-server',
                    );
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

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    closeAllMessages: reduxUtils.dispatchers.closeAllMessages(dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestPasswordForm);
