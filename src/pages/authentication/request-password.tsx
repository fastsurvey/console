import React, {useState} from 'react';
import {validators} from '../../utilities/form-utils/validators';
import {backend, reduxUtils} from '/src/utilities';
import {types} from '/src/types';
import {connect} from 'react-redux';
import VisualRequestPassword from '/src/pages/authentication/components/visual-request-password';

function RequestPassword(props: {openMessage(messageId: types.MessageId): void}) {
    const [identifier, setIdentifier] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitIsPossible =
        validators.email(identifier).valid || validators.username(identifier).valid;

    function handleRequest() {
        function handleError(code: 400 | 500): void {
            setIsSubmitting(false);
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
            setIsSubmitting(false);
            console.log('SUCCESS');
        }

        if (submitIsPossible && !isSubmitting) {
            setIsSubmitting(true);
            backend.requestNewPassword({identifier}, handleSuccess, handleError);
        }
    }

    return (
        <VisualRequestPassword
            identifier={identifier}
            setIdentifier={setIdentifier}
            isSubmitting={isSubmitting}
            submitIsPossible={submitIsPossible}
            handleRequest={handleRequest}
        />
    );
}

const mapStateToProps = (state: types.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RequestPassword);
