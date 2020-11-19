import React from 'react';
import {TextInput, TextLink, ButtonLink} from 'components';

interface Props {
    success: boolean;
    setSuccess(newSuccess: boolean): void;
    email: string;
    setEmail(newEmail: string): void;

    disabled: boolean;
    submitting: boolean;

    handleSubmit(): void;
    closeAllMessages(): void;
}
const VisualRequestPassword = React.forwardRef((props: Props, refs: any) => {
    const {input1Ref} = refs;

    return (
        <div className='w-full'>
            {!props.success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>
                        Forgot your password?
                    </h2>

                    <form>
                        <TextInput
                            placeholder='email'
                            value={props.email}
                            onChange={(newValue) => {
                                props.closeAllMessages();
                                props.setEmail(newValue);
                            }}
                            className='mb-2'
                            autoComplete='username'
                            ref={input1Ref}
                            onEnter={props.handleSubmit}
                        />
                        <ButtonLink
                            className='pt-2'
                            onClick={props.handleSubmit}
                            disabled={props.disabled}
                            spinning={props.submitting}
                        >
                            Request new password
                        </ButtonLink>
                    </form>
                    <TextLink to='/login' className='pt-4'>
                        Log in instead?
                    </TextLink>
                </React.Fragment>
            )}
            {props.success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>Success!</h2>
                    <p className='mb-4 text-center'>
                        Please set your new password by clicking the link in the
                        email we've just sent to:
                    </p>
                    <p className='text-center font-weight-600'>{props.email}</p>
                    <TextLink
                        onClick={() => {
                            props.setEmail('');
                            props.setSuccess(false);
                        }}
                        className='pt-4'
                    >
                        Wrong email address?
                    </TextLink>
                </React.Fragment>
            )}
        </div>
    );
});

export default VisualRequestPassword;
