import React from 'react';
import {TextInput, ButtonLink} from 'components';
import {hints} from 'utilities';

interface Props {
    password: string;
    setPassword(newPassword: string): void;
    passwordConfirmation: string;
    setPasswordConfirmation(newPasswordConfirmation: string): void;

    success: boolean;
    tokenExists: boolean;
    disabled: boolean;
    submitting: boolean;

    handleSubmit(): void;
    closeAllMessages(): void;
}
const VisualSetPassword = React.forwardRef((props: Props, refs: any) => {
    const {input2Ref} = refs;

    return (
        <div className='w-full'>
            {!props.success && (
                <React.Fragment>
                    <h3 className='mb-4 text-center no-selection'>
                        Set Password
                    </h3>
                    {props.tokenExists && (
                        <form>
                            <TextInput
                                placeholder='password'
                                value={props.password}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    props.setPassword(newValue);
                                }}
                                type='password'
                                hint={{
                                    ...hints.password(props.password),
                                    inlineHint: true,
                                }}
                                wrapperClassName='mb-1'
                                autoComplete='new-password'
                                onEnter={() => input2Ref.current?.focus()}
                            />
                            <TextInput
                                placeholder='confirm password'
                                value={props.passwordConfirmation}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    props.setPasswordConfirmation(newValue);
                                }}
                                type='password'
                                hint={{
                                    ...hints.passwordConfirmation(
                                        props.password,
                                        props.passwordConfirmation,
                                    ),
                                    inlineHint: true,
                                }}
                                wrapperClassName='mb-5'
                                autoComplete='new-password'
                                ref={input2Ref}
                                onEnter={props.handleSubmit}
                            />
                            <ButtonLink
                                onClick={props.handleSubmit}
                                disabled={props.disabled}
                                spinning={props.submitting}
                            >
                                Set Password
                            </ButtonLink>
                        </form>
                    )}
                    {!props.tokenExists && (
                        <p className='text-center'>
                            Sorry, we couldn't find any password token in the
                            url. Please use exactly the link we've sent to you.
                        </p>
                    )}
                </React.Fragment>
            )}
            {props.success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>Success!</h2>
                    <ButtonLink to='/configurations'>
                        Continue to Admin Panel
                    </ButtonLink>
                </React.Fragment>
            )}
        </div>
    );
});

export default VisualSetPassword;
