import React from 'react';
import {TextInput, TextLink, ButtonLink} from 'components';
import {hints} from 'utilities';

interface Props {
    email: string;
    setEmail(newEmail: string): void;
    password: string;
    setPassword(newPassword: string): void;
    passwordConfirmation: string;
    setPasswordConfirmation(newPasswordConfirmation: string): void;

    disabled: boolean;
    submitting: boolean;

    closeAllMessages(): void;
    handleRegistration(): void;
}
const VisualRegister = React.forwardRef((props: Props, refs: any) => {
    const {input2Ref, input3Ref} = refs;

    return (
        <div className='w-full'>
            <h2 className='mb-4 text-center no-selection'>Register</h2>
            <form>
                <TextInput
                    required
                    placeholder='email'
                    value={props.email}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        props.setEmail(newValue);
                    }}
                    className='mb-2'
                    autoComplete='username'
                    onEnter={() => input2Ref.current?.focus()}
                />
                <TextInput
                    value={props.password}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        props.setPassword(newValue);
                    }}
                    ref={input2Ref}
                    onEnter={() => input3Ref.current?.focus()}
                    required
                    placeholder='password'
                    type='password'
                    className='mb-2'
                    autoComplete='new-password'
                    hint={hints.password(props.password)}
                />
                <TextInput
                    value={props.passwordConfirmation}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        props.setPasswordConfirmation(newValue);
                    }}
                    ref={input3Ref}
                    onEnter={props.handleRegistration}
                    required
                    placeholder='confirm password'
                    type='password'
                    className='mb-2'
                    autoComplete='new-password'
                    hint={hints.passwordConfirmation(
                        props.password,
                        props.passwordConfirmation,
                    )}
                />
                <ButtonLink
                    className='pt-2'
                    onClick={props.handleRegistration}
                    disabled={props.disabled}
                    spinning={props.submitting}
                >
                    Register
                </ButtonLink>
            </form>
            <TextLink to='/login' className='pt-4'>
                Already have an account?
            </TextLink>
        </div>
    );
});

export default VisualRegister;
