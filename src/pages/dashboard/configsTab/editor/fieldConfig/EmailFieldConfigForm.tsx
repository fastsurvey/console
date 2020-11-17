import React, {useEffect, useState} from 'react';
import DropDown from '../../../../../components/formFields/DropDown';
import TextInput from '../../../../../components/formFields/TextInput';
import configTypes from '../../../../../utilities/types/configTypes';
import formOptions from '../../../../../utilities/constants/formOptions';

interface EmailFieldConfigFormProps {
    fieldConfig: configTypes.EmailField;
    setFieldConfig(
        fieldConfig: configTypes.EmailField,
        subValidation: (fieldConfig: configTypes.EmailField) => boolean,
    ): void;
    disabled: boolean;
}

function EmailFieldConfigForm(props: EmailFieldConfigFormProps) {
    const regexIsValid = (regex: string) => regex.length <= 250;
    const hintIsValid = (hint: string) => hint.length <= 120;
    const [setupValue, setSetupValue] = useState(
        formOptions.EMAIL_REGEX.length,
    );
    const [customSetup, setCustomSetup] = useState({
        label: 'Custom Rule',
        value: formOptions.EMAIL_REGEX.length,
        regex: props.fieldConfig.regex,
        hint: props.fieldConfig.hint,
    });

    useEffect(() => {
        const newSetup: configTypes.EmailRegexSetup[] = formOptions.EMAIL_REGEX.filter(
            (setup) =>
                setup.regex === props.fieldConfig.regex &&
                setup.hint === props.fieldConfig.hint,
        );

        if (newSetup.length === 0) {
            setSetupValue(formOptions.EMAIL_REGEX.length);
            setCustomSetup({
                label: 'Custom Rule',
                value: formOptions.EMAIL_REGEX.length,
                regex: props.fieldConfig.regex,
                hint: props.fieldConfig.hint,
            });
        } else {
            setSetupValue(newSetup[0].value);
        }
    }, [props.fieldConfig.regex, props.fieldConfig.hint]);

    function updateFieldConfig(newFieldConfig: configTypes.EmailField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.EmailField) =>
                hintIsValid(newFieldConfig.hint) &&
                regexIsValid(newFieldConfig.regex),
        );
    }

    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col justify-center mr-4 w-72 h-26'>
                <DropDown
                    {...commonProps}
                    value={setupValue}
                    className={'w-128'}
                    onChange={(newValue: number) => {
                        const setup = [
                            ...formOptions.EMAIL_REGEX,
                            customSetup,
                        ].filter((setup) => setup.value === newValue)[0];
                        updateFieldConfig({
                            ...props.fieldConfig,
                            regex: setup.regex,
                            hint: setup.hint,
                        });
                    }}
                    options={[...formOptions.EMAIL_REGEX, customSetup]}
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
                            updateFieldConfig({
                                ...props.fieldConfig,
                                regex: newValue,
                            })
                        }
                        hint={{
                            text: `<= 250 Characters (${
                                250 - props.fieldConfig.hint.length
                            } left)`,
                            fulfilled: regexIsValid(props.fieldConfig.regex),
                        }}
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
                            updateFieldConfig({
                                ...props.fieldConfig,
                                hint: newValue,
                            })
                        }
                        hint={{
                            text: `<= 120 Characters (${
                                120 - props.fieldConfig.hint.length
                            } left)`,
                            fulfilled: hintIsValid(props.fieldConfig.hint),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmailFieldConfigForm;
