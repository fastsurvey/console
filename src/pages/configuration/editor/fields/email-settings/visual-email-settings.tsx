import React from 'react';
import {constants, formUtils} from 'utilities';
import {
    TextInput,
    EditorFormRow,
    LabelSimple,
    DropDownSimple,
    TextInputSimple,
} from 'components';
import {types} from 'types';

interface Props {
    setupValue: number;
    customSetup: types.EmailRegexSetup;
    fieldConfig: types.EmailField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function VisualEmailSettings(props: Props) {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Allowed Email Formats' />
                <DropDownSimple
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
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Regex' />
                <TextInputSimple
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
                <LabelSimple text='Hint' />
                <TextInputSimple
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
