import React from 'react';
import {Label, Toggle} from 'components';
import {types} from 'types';

interface Props {
    fieldConfig: types.OptionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
const VisualOptionSettings = (props: Props) => (
    <div className='w-full flex-col-left gap-y-0.5'>
        <Label text='Selecting this option is required' />
        <Toggle
            value={props.fieldConfig.required}
            setValue={(newValue: boolean) =>
                props.setLocalFieldConfig({
                    required: newValue,
                })
            }
            disabled={props.disabled}
        />
    </div>
);

export default VisualOptionSettings;
