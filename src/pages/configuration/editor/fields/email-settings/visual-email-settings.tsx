import React from 'react';
import {configTypes, formOptions, hints} from 'utilities';
import {DropDown, TextInput, EditorFormRow} from 'components';

interface Props {
    setupValue: number;
    customSetup: configTypes.EmailRegexSetup;
    fieldConfig: configTypes.EmailField;
    updateFieldConfig(fieldConfig: configTypes.EmailField): void;
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
                            ...formOptions.EMAIL_REGEX,
                            props.customSetup,
                        ].filter((setup) => setup.value === newValue)[0];
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            regex: setup.regex,
                            hint: setup.hint,
                        });
                    }}
                    options={[...formOptions.EMAIL_REGEX, props.customSetup]}
                />
            </EditorFormRow>

            <EditorFormRow label='Regex' className='mb-1'>
                <TextInput
                    {...commonProps}
                    placeholder='URL conform identifier'
                    value={props.fieldConfig.regex}
                    onChange={(newValue: string) =>
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            regex: newValue,
                        })
                    }
                    hint={{...hints.regex(props.fieldConfig), inlineHint: true}}
                />
            </EditorFormRow>

            <EditorFormRow label='Hint' className='mb-1'>
                <TextInput
                    {...commonProps}
                    placeholder='URL conform identifier'
                    value={props.fieldConfig.hint}
                    onChange={(newValue: string) =>
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            hint: newValue,
                        })
                    }
                    hint={{...hints.hint(props.fieldConfig), inlineHint: true}}
                />
            </EditorFormRow>
        </>
    );
}

export default VisualEmailSettings;
