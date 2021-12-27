import React from 'react';
import {constants} from '/src/utilities';
import {Label, DropDown, TextInput, Toggle} from '/src/components';
import {types} from '/src/types';

function VisualEmailSettings(props: {
    setupValue: number;
    customSetup: types.EmailRegexSetup;
    fieldConfig: types.EmailField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}) {
    return (
        <>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Allowed Email Formats' />
                <DropDown
                    value={props.setupValue}
                    setValue={(newValue: number) => {
                        const setup = [
                            ...constants.formOptions.EMAIL_REGEX,
                            props.customSetup,
                        ].filter((setup) => setup.value === newValue)[0];
                        props.setLocalFieldConfig({
                            regex: setup.regex,
                            hint: setup.hint,
                        });
                    }}
                    options={[...constants.formOptions.EMAIL_REGEX, props.customSetup]}
                    disabled={props.disabled}
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Regex' />
                <TextInput
                    value={props.fieldConfig.regex}
                    setValue={(newValue: string) =>
                        props.setLocalFieldConfig({
                            regex: newValue,
                        })
                    }
                    disabled={props.disabled}
                    data-cy='input-regex'
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Hint' />
                <TextInput
                    value={props.fieldConfig.hint}
                    setValue={(newValue: string) =>
                        props.setLocalFieldConfig({
                            hint: newValue,
                        })
                    }
                    disabled={props.disabled}
                    data-cy='input-hint'
                />
            </div>

            <div className='w-full flex-col-left gap-y-0.5 mt-2'>
                <Label text='Verify Email Address (email with confirmation link sent out)' />
                <Toggle
                    value={props.fieldConfig.verify}
                    setValue={(newValue: boolean) =>
                        props.setLocalFieldConfig({
                            verify: newValue,
                        })
                    }
                    disabled={props.disabled}
                    data-cy='toggle-verify'
                />
            </div>
        </>
    );
}

export default VisualEmailSettings;
