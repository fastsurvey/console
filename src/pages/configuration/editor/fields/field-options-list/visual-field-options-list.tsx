import React from 'react';
import {icons} from '@assets';
import {Label, TextInput, Button} from '@components';
import {types} from '@types';

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
            {props.fieldConfig.options.map((optionConfig, optionIndex) => (
                <div
                    className='w-full text-sm flex-row-left gap-x-2'
                    key={optionConfig.local_id}
                >
                    <TextInput
                        value={optionConfig.title}
                        setValue={(newValue: string) =>
                            props.setLocalFieldConfig({
                                options: props.fieldConfig.options.map(
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
                        className={
                            'w-8 h-8 p-1.5 rounded icon-blue ringable ' +
                            (props.disabled
                                ? 'opacity-60 cursor-not-allowed '
                                : ' ')
                        }
                        onClick={() =>
                            props.setLocalFieldConfig({
                                options: props.fieldConfig.options.filter(
                                    (oldOptionField, oldIndex) =>
                                        optionIndex !== oldIndex,
                                ),
                            })
                        }
                        disabled={props.disabled}
                    >
                        {icons.trash}
                    </button>
                </div>
            ))}
            <div className={'w-full pr-[2.375rem] h-9 mb-2'}>
                <button
                    onClick={props.addFieldOption}
                    className={
                        'w-full h-full rounded flex-row-left px-3 ringable ' +
                        'text-sm font-weight-500 text-gray-700 cursor-pointer ' +
                        'border border-dashed border-gray-300 bg-gray-50 text-gray-300 ' +
                        'hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500 ' +
                        'focus:border-transparent focus:bg-gray-100 focus:text-gray-500 '
                    }
                >
                    add option
                </button>

                {/*<Button
                    text='Add Option'
                    onClick={props.addFieldOption}
                    icon={icons.addSquare}
                    variant='flat-light-blue'
                    disabled={props.disabled}
                />*/}
            </div>
        </div>
    );
});

export default VisualFieldOptionsList;
