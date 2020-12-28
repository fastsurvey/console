import React from 'react';
import {configTypes, formatters, hints} from 'utilities';
import {TextInput, EditorFormRow} from 'components';
import FieldOptionsList from '../field-options-list/field-options-list';

interface Props {
    fieldConfig: configTypes.SelectionField;
    updateFieldConfig(fieldConfig: configTypes.SelectionField): void;
    disabled: boolean;
}
function VisualSelectionSettings(props: Props) {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    return (
        <div className='flex flex-col'>
            <EditorFormRow label='Min. Selection' className='mb-1'>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.min_select.toString()}
                    onChange={(newValue: string) =>
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            min_select: formatters.atoi(newValue),
                        })
                    }
                    hint={hints.minSelect(props.fieldConfig)}
                />
            </EditorFormRow>
            <EditorFormRow label='Max. Selection' className='mb-8'>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.max_select.toString()}
                    onChange={(newValue: string) =>
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            max_select: formatters.atoi(newValue),
                        })
                    }
                    hint={hints.maxSelect(props.fieldConfig)}
                />
            </EditorFormRow>
            <FieldOptionsList
                fieldConfig={props.fieldConfig}
                disabled={props.disabled}
                updateFieldConfig={props.updateFieldConfig}
            />
        </div>
    );
}

export default VisualSelectionSettings;
