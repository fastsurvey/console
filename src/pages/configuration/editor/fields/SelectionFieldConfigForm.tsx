import React, {useEffect, useRef, useState} from 'react';
import {animateScroll} from 'react-scroll';

import {configTypes, templates} from 'utilities';

import {TextInput, TriggerIcon} from 'components';

import icons from 'assets/icons/icons';

interface SelectionFieldConfigFormProps {
    fieldConfig: configTypes.SelectionField;
    setFieldConfig(
        fieldConfig: configTypes.SelectionField,
        subValidation: (fieldConfig: configTypes.SelectionField) => boolean,
    ): void;
    disabled: boolean;
}

function SelectionFieldConfigForm(props: SelectionFieldConfigFormProps) {
    const [optionsVisible, setOptionsVisible] = useState(
        props.fieldConfig.fields.map(() => true),
    );
    useEffect(
        () => setOptionsVisible(props.fieldConfig.fields.map(() => true)),
        [props.fieldConfig.fields],
    );
    const minSelectIsValid = (newFieldConfig: configTypes.SelectionField) =>
        0 <= newFieldConfig.min_select &&
        newFieldConfig.min_select <= newFieldConfig.max_select;
    const maxSelectIsValid = (newFieldConfig: configTypes.SelectionField) =>
        newFieldConfig.max_select <= newFieldConfig.fields.length;
    const titleIsValid = (title: string) =>
        1 <= title.length && title.length <= 120;

    function updateFieldConfig(newFieldConfig: configTypes.SelectionField) {
        props.setFieldConfig(
            newFieldConfig,
            (newFieldConfig: configTypes.SelectionField) =>
                newFieldConfig.fields.every((optionField) =>
                    titleIsValid(optionField.title),
                ) &&
                minSelectIsValid(newFieldConfig) &&
                maxSelectIsValid(newFieldConfig),
        );
    }

    const nextRowRef: any = useRef(null);
    const [newOption, setNewOption] = useState('');
    function addFieldOption() {
        nextRowRef.current?.blur();
        optionsVisible.push(true);
        const local_id: number =
            Math.max(
                ...props.fieldConfig.fields.map(
                    (fieldConfig) => fieldConfig.local_id,
                ),
            ) + 1;
        updateFieldConfig({
            ...props.fieldConfig,
            fields: [
                ...props.fieldConfig.fields,
                {...templates.NEW_FIELD_OPTION, title: newOption, local_id},
            ],
        });

        // Suitable for 1rem = 16px
        animateScroll.scrollMore(56, {duration: 150});

        setNewOption('');
    }

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
                            updateFieldConfig({
                                ...props.fieldConfig,
                                min_select:
                                    newValue.length > 0
                                        ? parseInt(newValue)
                                        : 0,
                            })
                        }
                        hint={{
                            text: '<= max select.',
                            fulfilled: minSelectIsValid(props.fieldConfig),
                        }}
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
                            updateFieldConfig({
                                ...props.fieldConfig,
                                max_select:
                                    newValue.length > 0
                                        ? parseInt(newValue)
                                        : 0,
                            })
                        }
                        hint={{
                            text: `<= ${props.fieldConfig.fields.length}`,
                            fulfilled: maxSelectIsValid(props.fieldConfig),
                        }}
                    />
                </div>
            </div>
            <div className='flex flex-row w-full'>
                <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                    Options:
                </div>
                <div className='flex flex-col w-full'>
                    {props.fieldConfig.fields.map(
                        (optionField, optionIndex) => (
                            <div
                                key={optionField.local_id}
                                className={
                                    'flex flex-row w-full mb-2 ' +
                                    'transition-transform duration-300 ' +
                                    'transform origin-top ' +
                                    (optionsVisible[optionIndex]
                                        ? 'scale-y-100 '
                                        : 'scale-y-0 ')
                                }
                            >
                                <TextInput
                                    disabled={props.disabled}
                                    flat
                                    wrapperClassName={'flex-max'}
                                    value={optionField.title}
                                    onChange={(newValue: string) =>
                                        updateFieldConfig({
                                            ...props.fieldConfig,
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
                                    hint={{
                                        text:
                                            'Not empty, max. 120 characters ' +
                                            `(${
                                                120 - optionField.title.length
                                            } left)`,
                                        fulfilled: titleIsValid(
                                            optionField.title,
                                        ),
                                    }}
                                />
                                <TriggerIcon
                                    disabled={props.disabled}
                                    icon={icons.delete}
                                    onClick={() => {
                                        setOptionsVisible(
                                            optionsVisible.map(
                                                (optionVisible, index) =>
                                                    index === optionIndex
                                                        ? false
                                                        : optionVisible,
                                            ),
                                        );
                                        setTimeout(() => {
                                            updateFieldConfig({
                                                ...props.fieldConfig,
                                                fields: props.fieldConfig.fields.filter(
                                                    (
                                                        oldOptionField,
                                                        oldIndex,
                                                    ) =>
                                                        optionIndex !==
                                                        oldIndex,
                                                ),
                                            });
                                        }, 300);
                                    }}
                                />
                            </div>
                        ),
                    )}
                    <div className='w-full pr-12'>
                        <TextInput
                            flat
                            ref={nextRowRef}
                            wrapperClassName={'flex-max opacity-60 '}
                            value={newOption}
                            onChange={setNewOption}
                            placeholder='New option'
                            hint={{
                                text: 'Press <Enter> to add',
                                fulfilled: newOption !== '',
                                hideDot: true,
                            }}
                            onEnter={
                                newOption !== '' ? addFieldOption : () => {}
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectionFieldConfigForm;
