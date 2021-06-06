import React from 'react';
import {TextInput, TextLink, ButtonLink} from 'components';

interface Props {
    identifier: string;
    setIdentifier(newIdentifier: string): void;
    password: string;
    setPassword(newPassword: string): void;

    disabled: boolean;
    submitting: boolean;

    closeAllMessages(): void;
    handleLogin(): void;
}
const VisualLogin = React.forwardRef((props: Props, refs: any) => {
    const {input2Ref} = refs;

    return (
        <div className='w-full'>
            <h1 className='mb-4 text-3xl text-center text-gray-800 font-weight-600 no-selection'>
                Login
            </h1>
            <form>
                <TextInput
                    placeholder='email'
                    value={props.identifier}
                    onChange={(newValue) => {
                        props.closeAllMessages();
                        props.setIdentifier(newValue);
                    }}
                    className='mb-3'
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
                    className='mb-5'
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
