import React from 'react';
import {TextLink, ButtonLink} from 'components';

interface Props {
    email: string;
    handleResend(): void;
    resendPossible: boolean;
    submitting: boolean;
    logOut(): void;
}
const VisualVerifyWall = (props: Props) => (
    <div className='w-full'>
        <h2 className='mb-4 text-center no-selection'>
            Verify your email first!
        </h2>
        <p className='mb-4 text-center'>
            Please verify your email address by clicking the link in the email
            we've just sent to:
        </p>
        <p className='text-center font-weight-600'>{props.email}</p>
        <ButtonLink
            className='pt-4'
            onClick={props.handleResend}
            disabled={!props.resendPossible}
            spinning={props.submitting}
        >
            Resend verification email
        </ButtonLink>
        <TextLink to='/register' onClick={props.logOut} className='pt-4'>
            Wrong email address? Just register again.
        </TextLink>
    </div>
);

export default VisualVerifyWall;
