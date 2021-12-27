import React from 'react';
import {helperUtils} from '/src/utilities';
import {Label, TextInput} from '/src/components';
import FieldOptionsList from '../field-options-list/field-options-list';
import {types} from '/src/types';

interface Props {
    fieldConfig: types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}
function VisualSelectionSettings(props: Props) {
    return (
        <>
            <FieldOptionsList
                fieldConfig={props.fieldConfig}
                disabled={props.disabled}
                setLocalFieldConfig={props.setLocalFieldConfig}
            />
            <div
                className={'h-px bg-gray-300'}
                style={{width: 'calc(100% + 1.5rem)'}}
            />
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Minimum options selected' />
                <TextInput
                    value={props.fieldConfig.min_select.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            min_select: helperUtils.formatAtoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    data-cy='input-min-select'
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Maximum options selected' />
                <TextInput
                    value={props.fieldConfig.max_select.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            max_select: helperUtils.formatAtoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    data-cy='input-max-select'
                />
            </div>
        </>
    );
}

export default VisualSelectionSettings;
