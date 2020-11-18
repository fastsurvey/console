import React from 'react';
import {configTypes} from 'utilities';
import {Checkbox} from 'components';

interface Props {
    fieldConfig: configTypes.OptionField;
    updateFieldConfig(fieldConfig: configTypes.OptionField): void;
    disabled: boolean;
}
const VisualOptionSettings = (props: Props) => (
    <div className='flex flex-row'>
        <div className='flex flex-row items-start'>
            <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                Required:
            </div>
            <Checkbox
                disabled={props.disabled}
                checked={props.fieldConfig.mandatory}
                onChange={(newValue: boolean) =>
                    props.updateFieldConfig({
                        ...props.fieldConfig,
                        mandatory: newValue,
                    })
                }
            />
        </div>
    </div>
);

export default VisualOptionSettings;
