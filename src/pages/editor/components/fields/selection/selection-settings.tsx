import React from 'react';
import {helperUtils} from '/src/utilities';
import {Label, TextInput} from '/src/components';
import FieldOptionsList from './components/field-options-list';
import {types} from '/src/types';

function SelectionSettings(props: {
    localFieldConfig: types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}) {
    return (
        <>
            <FieldOptionsList
                disabled={props.disabled}
                localFieldConfig={props.localFieldConfig}
                setLocalFieldConfig={props.setLocalFieldConfig}
            />
            <div
                className={'h-px bg-gray-300'}
                style={{width: 'calc(100% + 1.5rem)'}}
            />
            <div className='w-full flex-col-center gap-y-0.5'>
                <Label text='Minimum options selected' />
                <TextInput
                    value={props.localFieldConfig.min_select.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            min_select: helperUtils.formatAtoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                    data-cy='input-min-select'
                />
            </div>
            <div className='w-full flex-col-center gap-y-0.5'>
                <Label text='Maximum options selected' />
                <TextInput
                    value={props.localFieldConfig.max_select.toString()}
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

export default SelectionSettings;
