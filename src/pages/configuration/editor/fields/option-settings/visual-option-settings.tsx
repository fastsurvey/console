import React from 'react';
import {configTypes} from 'utilities';
import {Checkbox, EditorFormRow} from 'components';

interface Props {
    fieldConfig: configTypes.OptionField;
    updateFieldConfig(fieldConfig: configTypes.OptionField): void;
    disabled: boolean;
}
const VisualOptionSettings = (props: Props) => (
    <EditorFormRow label='Required' className='mb-1'>
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
    </EditorFormRow>
);

export default VisualOptionSettings;
