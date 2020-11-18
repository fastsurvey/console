import React from 'react';
import {configTypes, formOptions, hints} from 'utilities';
import {DropDown, TextInput} from 'components';

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
        <div className='flex flex-row'>
            <div className='flex flex-col justify-center mr-4 w-72 h-26'>
                <DropDown
                    {...commonProps}
                    value={props.setupValue}
                    className={'w-128'}
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
            </div>
            <div className='flex flex-col flex-max'>
                <div className='flex flex-row items-start mb-2'>
                    <div className='h-12 mx-3 text-xl text-right w-18 font-weight-600 leading-12'>
                        Regex:
                    </div>
                    <TextInput
                        {...commonProps}
                        wrapperClassName={'w-full flex-max'}
                        className={'w-full flex-max'}
                        value={props.fieldConfig.regex}
                        onChange={(newValue: string) =>
                            props.updateFieldConfig({
                                ...props.fieldConfig,
                                regex: newValue,
                            })
                        }
                        hint={hints.regex(props.fieldConfig)}
                    />
                </div>
                <div className='flex flex-row items-start'>
                    <div className='h-12 mx-3 text-xl text-right w-18 font-weight-600 leading-12'>
                        Hint:
                    </div>
                    <TextInput
                        {...commonProps}
                        wrapperClassName={'w-full flex-max'}
                        value={props.fieldConfig.hint}
                        onChange={(newValue: string) =>
                            props.updateFieldConfig({
                                ...props.fieldConfig,
                                hint: newValue,
                            })
                        }
                        hint={hints.hint(props.fieldConfig)}
                    />
                </div>
            </div>
        </div>
    );
}

export default VisualEmailSettings;
