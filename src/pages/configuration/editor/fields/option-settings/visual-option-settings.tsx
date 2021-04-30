import React from 'react';
import {Checkbox, EditorFormRow} from 'components';
import {types} from 'types';

interface Props {
    fieldConfig: types.OptionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
const VisualOptionSettings = (props: Props) => (
    <EditorFormRow label='Required' className='mb-1'>
        <Checkbox
            disabled={props.disabled}
            checked={props.fieldConfig.required}
            onChange={(newValue: boolean) =>
                props.setLocalFieldConfig({
                    required: newValue,
                })
            }
        />
    </EditorFormRow>
);

export default VisualOptionSettings;
