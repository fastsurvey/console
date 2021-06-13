import React from 'react';
import {icons} from 'assets';
import {Label, TextInput, Button} from 'components';
import {types} from 'types';

interface Props {
    fieldConfig: types.RadioField | types.SelectionField;
    disabled: boolean;
    setLocalFieldConfig(fieldConfigChanges: object): void;

    setOptionsVisible(optionsVisible: boolean[]): void;
    optionsVisible: boolean[];
    newOption: string;
    setNewOption(newOption: string): void;
    addFieldOption(): void;
}
const VisualFieldOptionsList = React.forwardRef((props: Props, ref: any) => {
    return (
        <div className='w-full flex-col-right gap-y-1'>
            <Label text='Options to select' />
            {props.fieldConfig.fields.map((optionConfig, optionIndex) => (
                <div
                    className='w-full flex-row-left gap-x-2'
                    key={optionConfig.local_id}
                >
                    <TextInput
                        value={optionConfig.title}
                        setValue={(newValue: string) =>
                            props.setLocalFieldConfig({
                                fields: props.fieldConfig.fields.map(
                                    (oldOptionField, oldIndex) =>
                                        optionIndex === oldIndex
                                            ? {
                                                  ...oldOptionField,
                                                  title: newValue,
                                              }
                                            : oldOptionField,
                                ),
                            })
                        }
                        disabled={props.disabled}
                    />
                    <button
                        className='w-8 h-8 p-1 rounded icon-blue ringable'
                        onClick={() =>
                            props.setLocalFieldConfig({
                                fields: props.fieldConfig.fields.filter(
                                    (oldOptionField, oldIndex) =>
                                        optionIndex !== oldIndex,
                                ),
                            })
                        }
                    >
                        {icons.trash}
                    </button>
                </div>
            ))}
            <div className='w-full pr-[2.375rem] flex-row-right'>
                <Button
                    text='Add Option'
                    onClick={props.addFieldOption}
                    icon={icons.addSquare}
                    variant='flat-light-blue'
                />
            </div>
        </div>
    );
});

export default VisualFieldOptionsList;
