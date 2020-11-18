import React from 'react';
import {TextInput, ButtonLink} from 'components';

interface Props {
    password: string;
    setPassword(password: string): void;

    success: boolean;
    tokenExists: boolean;
    disabled: boolean;
    submitting: boolean;

    closeAllMessages(): void;
    handleVerify(): void;
}
const VisualVerifyForm = React.forwardRef((props: Props, refs: any) => {
    const {input1Ref} = refs;

    return (
        <div className='w-full'>
            {!props.success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>
                        Verify your email
                    </h2>
                    {props.tokenExists && (
                        <form>
                            <TextInput
                                placeholder='password'
                                value={props.password}
                                onChange={(newValue) => {
                                    props.closeAllMessages();
                                    props.setPassword(newValue);
                                }}
                                className='mb-2'
                                type='password'
                                autoComplete='current-password'
                                ref={input1Ref}
                                onEnter={props.handleVerify}
                            />
                            <ButtonLink
                                className='pt-2'
                                onClick={props.handleVerify}
                                disabled={props.disabled}
                                spinning={props.submitting}
                            >
                                Verify
                            </ButtonLink>
                        </form>
                    )}
                    {!props.tokenExists && (
                        <p className='text-center'>
                            Sorry, we couldn't find any email token in the url.
                            Please use exactly the link we've sent to you.
                        </p>
                    )}
                </React.Fragment>
            )}
            {props.success && (
                <React.Fragment>
                    <h2 className='mb-4 text-center no-selection'>Success!</h2>
                    <ButtonLink to='configurations'>
                        Continue to Admin Panel
                    </ButtonLink>
                </React.Fragment>
            )}
        </div>
    );
});

export default VisualVerifyForm;
