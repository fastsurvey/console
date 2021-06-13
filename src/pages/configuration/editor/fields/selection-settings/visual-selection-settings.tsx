import React from 'react';
import {formUtils} from 'utilities';
import {
    TextInput,
    EditorFormRow,
    LabelSimple,
    TextInputSimple,
} from 'components';
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
        <>
            <FieldOptionsList
                fieldConfig={props.fieldConfig}
                disabled={props.disabled}
                setLocalFieldConfig={props.setLocalFieldConfig}
            />
            <div
                className={'h-0.5 bg-gray-300'}
                style={{width: 'calc(100% + 1.5rem)'}}
            />
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Minimum options selected' />
                <TextInputSimple
                    value={props.fieldConfig.min_select.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            min_select: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <LabelSimple text='Maximum options selected' />
                <TextInputSimple
                    value={props.fieldConfig.max_select.toString()}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            max_select: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    disabled={props.disabled}
                />
            </div>
        </>
    );
}

export default VisualSelectionSettings;
