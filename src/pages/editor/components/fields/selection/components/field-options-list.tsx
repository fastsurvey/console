import React, {useEffect, useRef, useState} from 'react';
import {icons} from '/src/assets';
import {animateScroll} from 'react-scroll';
import {templateUtils} from '/src/utilities';
import {Label, TextInput} from '/src/components';
import {types} from '/src/types';

function FieldOptionsList(props: {
    fieldConfig: types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    disabled: boolean;
}) {
    const [optionsVisible, setOptionsVisible] = useState(
        props.fieldConfig.options.map(() => true),
    );
    useEffect(
        () => setOptionsVisible(props.fieldConfig.options.map(() => true)),
        [props.fieldConfig.options],
    );

    const nextRowRef: any = useRef(null);
    const [newOption, setNewOption] = useState('');

    function addFieldOption() {
        nextRowRef.current?.blur();
        optionsVisible.push(true);

        props.setLocalFieldConfig(templateUtils.option(newOption, props.fieldConfig));

        // Suitable for 1rem = 16px
        animateScroll.scrollMore(56, {duration: 150});

        setNewOption('');
    }

    return (
        <div className='w-full flex-col-right gap-y-1' data-cy='options-list'>
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
                        data-cy={`input-option-${optionIndex}`}
                    />
                    <button
                        className={
                            'w-8 h-8 p-1.5 rounded icon-blue ringable ' +
                            (props.disabled ? 'opacity-60 cursor-not-allowed ' : ' ')
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
                        data-cy={`button-remove-${optionIndex}`}
                    >
                        {icons.trash}
                    </button>
                </div>
            ))}
            <div className={'w-full pr-[2.375rem] h-9 mb-1'}>
                <button
                    onClick={addFieldOption}
                    className={
                        'w-full h-full rounded flex-row-left px-3 ringable ' +
                        'text-sm font-weight-500 text-gray-700 cursor-pointer ' +
                        'border border-dashed border-gray-300 bg-gray-50 text-gray-300 ' +
                        'hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500 ' +
                        'focus:border-transparent focus:bg-gray-100 focus:text-gray-500 '
                    }
                    data-cy='button-add'
                >
                    add option
                </button>
            </div>
        </div>
    );
}

export default FieldOptionsList;
