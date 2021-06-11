import React from 'react';
import {TextInput, TextInputSimple, TextLink, ButtonLink} from 'components';

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
        <div className='w-full p-4 bg-white rounded shadow '>
            <h1 className='mb-4 text-3xl text-center text-gray-800 font-weight-600 no-selection'>
                Login
            </h1>
            <form className='centering-col gap-y-2'>
                <TextInputSimple
                    autoComplete='email username'
                    value={props.identifier}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setIdentifier(newValue);
                    }}
                />
                <TextInputSimple
                    type='password'
                    autoComplete='current-password'
                    value={props.identifier}
                    setValue={(newValue) => {
                        props.closeAllMessages();
                        props.setPassword(newValue);
                    }}
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
