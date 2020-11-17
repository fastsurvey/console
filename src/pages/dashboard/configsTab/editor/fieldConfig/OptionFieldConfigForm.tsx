import React from 'react';
import Checkbox from '../../../../../components/formFields/Checkbox';
import configTypes from '../../../../../utilities/types/configTypes';

interface OptionFieldConfigFormProps {
    fieldConfig: configTypes.OptionField;
    setFieldConfig(
        fieldConfig: configTypes.OptionField,
        subValidation: (fieldConfig: configTypes.OptionField) => boolean,
    ): void;
    disabled: boolean;
}

function OptionFieldConfigForm(props: OptionFieldConfigFormProps) {
    function updateFieldConfig(newFieldConfig: configTypes.OptionField) {
        props.setFieldConfig(newFieldConfig, () => true);
    }

    const commonProps = {
        disabled: props.disabled,
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row items-start'>
                <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                    Required:
                </div>
                <Checkbox
                    {...commonProps}
                    checked={props.fieldConfig.mandatory}
                    onChange={(newValue: boolean) =>
                        updateFieldConfig({
                            ...props.fieldConfig,
                            mandatory: newValue,
                        })
                    }
                />
            </div>
        </div>
    );
}

export default OptionFieldConfigForm;
