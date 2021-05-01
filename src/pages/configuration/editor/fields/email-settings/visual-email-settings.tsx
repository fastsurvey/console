import React from 'react';
import {constants, formUtils} from 'utilities';
import {DropDown, TextInput, EditorFormRow} from 'components';
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
            <EditorFormRow label='Email Preset' className='mb-1'>
                <DropDown
                    {...commonProps}
                    value={props.setupValue}
                    onChange={(newValue: number) => {
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
            </EditorFormRow>

            <EditorFormRow label='Regex' className='mb-1'>
                <TextInput
                    {...commonProps}
                    placeholder='URL conform identifier'
                    value={props.fieldConfig.regex}
                    onChange={(newValue: string) =>
                        props.setLocalFieldConfig({
                            regex: newValue,
                        })
                    }
                    hint={{
                        ...formUtils.hints.regex(props.fieldConfig),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>

            <EditorFormRow label='Hint' className='mb-1'>
                <TextInput
                    {...commonProps}
                    placeholder='URL conform identifier'
                    value={props.fieldConfig.hint}
                    onChange={(newValue: string) =>
                        props.setLocalFieldConfig({
                            hint: newValue,
                        })
                    }
                    hint={{
                        ...formUtils.hints.hint(props.fieldConfig),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
        </>
    );
}

export default VisualEmailSettings;
