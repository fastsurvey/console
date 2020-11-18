import React from 'react';
import {configTypes, hints} from 'utilities';
import {TextInput} from 'components';
import FieldOptionsList from '../field-options-list/field-options-list';

interface VisualSelectionSettingsProps {
    fieldConfig: configTypes.SelectionField;
    updateFieldConfig(fieldConfig: configTypes.SelectionField): void;
    disabled: boolean;
}
function VisualSelectionSettings(props: VisualSelectionSettingsProps) {
    const commonSelectionProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'w-28',
    };
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row mb-2'>
                <div className='flex flex-row items-start mr-8'>
                    <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                        Min. Selection:
                    </div>
                    <TextInput
                        {...commonSelectionProps}
                        value={props.fieldConfig.min_select.toString()}
                        onChange={(newValue: string) =>
                            props.updateFieldConfig({
                                ...props.fieldConfig,
                                min_select:
                                    newValue.length > 0
                                        ? parseInt(newValue)
                                        : 0,
                            })
                        }
                        hint={hints.minSelect(props.fieldConfig)}
                    />
                </div>
                <div className='flex flex-row items-start mr-8'>
                    <div className='h-12 mr-3 text-xl font-weight-600 leading-12'>
                        Max. Selection:
                    </div>
                    <TextInput
                        {...commonSelectionProps}
                        value={props.fieldConfig.max_select.toString()}
                        onChange={(newValue: string) =>
                            props.updateFieldConfig({
                                ...props.fieldConfig,
                                max_select:
                                    newValue.length > 0
                                        ? parseInt(newValue)
                                        : 0,
                            })
                        }
                        hint={hints.maxSelect(props.fieldConfig)}
                    />
                </div>
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
