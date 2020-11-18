import React from 'react';
import {configTypes, formatters, hints} from 'utilities';
import {VisualTextInputRow} from 'components';
import FieldOptionsList from '../field-options-list/field-options-list';

interface VisualSelectionSettingsProps {
    fieldConfig: configTypes.SelectionField;
    updateFieldConfig(fieldConfig: configTypes.SelectionField): void;
    disabled: boolean;
}
function VisualSelectionSettings(props: VisualSelectionSettingsProps) {
    const commonProps = {
        config: props.fieldConfig,
        disabled: props.disabled,
        updateConfig: props.updateFieldConfig,
        wrapperClassName: 'w-28',
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mb-2 ml-2 gap-x-8'>
                <VisualTextInputRow
                    {...commonProps}
                    label='Min. Selection'
                    value={props.fieldConfig.min_select.toString()}
                    onChange={(newValue: string) => ({
                        min_select: formatters.atoi(newValue),
                    })}
                    hint={hints.minSelect(props.fieldConfig)}
                />
                <VisualTextInputRow
                    {...commonProps}
                    label='Max. Selection'
                    value={props.fieldConfig.max_select.toString()}
                    onChange={(newValue: string) => ({
                        max_select: formatters.atoi(newValue),
                    })}
                    hint={hints.maxSelect(props.fieldConfig)}
                />
            </div>
            <FieldOptionsList
                fieldConfig={props.fieldConfig}
                disabled={props.disabled}
                updateFieldConfig={props.updateFieldConfig}
            />
        </div>
    );
}

export default VisualSelectionSettings;
