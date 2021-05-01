import React from 'react';
import {formUtils} from 'utilities';
import {TextInput, EditorFormRow} from 'components';
import FieldOptionsList from '../field-options-list/field-options-list';
import {types} from 'types';

interface Props {
    fieldConfig: types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
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
                        props.setLocalFieldConfig({
                            min_select: formUtils.formatters.atoi(newValue),
                        })
                    }
                    hint={{
                        ...formUtils.hints.minSelect(props.fieldConfig),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
            <EditorFormRow label='Max. Selection' className='mb-8'>
                <TextInput
                    {...commonProps}
                    value={props.fieldConfig.max_select.toString()}
                    onChange={(newValue: string) =>
                        props.setLocalFieldConfig({
                            max_select: formUtils.formatters.atoi(newValue),
                        })
                    }
                    hint={{
                        ...formUtils.hints.maxSelect(props.fieldConfig),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
            <FieldOptionsList
                fieldConfig={props.fieldConfig}
                disabled={props.disabled}
                setLocalFieldConfig={props.setLocalFieldConfig}
            />
        </div>
    );
}

export default VisualSelectionSettings;
