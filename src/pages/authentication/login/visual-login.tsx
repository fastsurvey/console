import React from 'react';
import {TextInput, TextLink, ButtonLink} from 'components';

interface VisualLoginProps {
    email: string;
    setEmail(newEmail: string): void;
    password: string;
    setPassword(newPassword: string): void;

    disabled: boolean;
    submitting: boolean;

    closeAllMessages(): void;
    handleLogin(): void;
}

const VisualLogin = React.forwardRef((props: VisualLoginProps, refs: any) => {
    const {input2Ref} = refs;

    return (
        <div className='w-full'>
            <h2 className='mb-4 text-center no-selection'>Login</h2>
            <form>
                <TextInput
                    placeholder='email'
                    value={props.email}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        props.setEmail(newValue);
                    }}
                    className='mb-2'
                    autoComplete='email username'
                    onEnter={() => input2Ref.current.focus()}
                />
                <TextInput
                    placeholder='password'
                    value={props.password}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        props.setPassword(newValue);
                    }}
                    className='mb-4'
                    type='password'
                    autoComplete='current-password'
                    ref={input2Ref}
                    onEnter={props.handleLogin}
                />
                <ButtonLink
                    onClick={props.handleLogin}
                    disabled={props.disabled}
                    spinning={props.submitting}
                >
                    Login
                </ButtonLink>
            </form>
            <TextLink to='/register' className='pt-4'>
                Don't have an account yet?
            </TextLink>
            <TextLink to='/request-password' className='pt-2'>
                Forgot your password?
            </TextLink>
        </div>
    );
});

export default VisualLogin;
