import React from 'react';
import {configTypes} from 'utilities';
import {Checkbox} from 'components';
import EditorFormRow from 'components/layout/editor-form-row';

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
