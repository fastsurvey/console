import React from 'react';
import {constants} from 'utilities';
import {Label, DropDown, TextInput} from 'components';
import {types} from 'types';

interface Props {
    setupValue: number;
    customSetup: types.EmailRegexSetup;
    fieldConfig: types.EmailField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function VisualEmailSettings(props: Props) {
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
                    options={[
                        ...constants.formOptions.EMAIL_REGEX,
                        props.customSetup,
                    ]}
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
                />
            </div>
        </>
    );
}

export default VisualEmailSettings;
