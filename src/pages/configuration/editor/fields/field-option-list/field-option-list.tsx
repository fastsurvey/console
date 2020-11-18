import React, {useEffect, useRef, useState} from 'react';
import {animateScroll} from 'react-scroll';
import {configTypes, hints, templates, validators} from 'utilities';
import {icons} from 'assets';
import {TextInput, TriggerIcon} from 'components';

interface FieldOptionsListProps {
    fieldConfig: configTypes.RadioField | configTypes.SelectionField;
    updateFieldConfig(
        fieldConfig: configTypes.RadioField | configTypes.SelectionField,
    ): void;
    disabled: boolean;
}

function FieldOptionsList(props: FieldOptionsListProps) {
    const [optionsVisible, setOptionsVisible] = useState(
        props.fieldConfig.fields.map(() => true),
    );
    useEffect(
        () => setOptionsVisible(props.fieldConfig.fields.map(() => true)),
        [props.fieldConfig.fields],
    );

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
        props.updateFieldConfig({
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

    const commonProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'flex-max',
    };

    return (
        <div className='flex flex-row w-full'>
            <div className='h-12 ml-2 mr-3 text-xl font-weight-600 leading-12'>
                Options:
            </div>
            <div className='flex flex-col w-full'>
                {props.fieldConfig.fields.map((optionField, optionIndex) => (
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
                            {...commonProps}
                            value={optionField.title}
                            onChange={(newValue: string) =>
                                props.updateFieldConfig({
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
                            hint={hints.title(optionField.title)}
                        />
                        <TriggerIcon
                            disabled={props.disabled}
                            icon={icons.delete}
                            onClick={() => {
                                setOptionsVisible(
                                    optionsVisible.map((optionVisible, index) =>
                                        index === optionIndex
                                            ? false
                                            : optionVisible,
                                    ),
                                );
                                setTimeout(() => {
                                    props.updateFieldConfig({
                                        ...props.fieldConfig,
                                        fields: props.fieldConfig.fields.filter(
                                            (oldOptionField, oldIndex) =>
                                                optionIndex !== oldIndex,
                                        ),
                                    });
                                }, 300);
                            }}
                        />
                    </div>
                ))}
                <div className='w-full pr-12'>
                    <TextInput
                        flat
                        ref={nextRowRef}
                        wrapperClassName={'flex-max opacity-60 '}
                        value={newOption}
                        onChange={setNewOption}
                        placeholder='New option'
                        hint={hints.newOption(newOption)}
                        onEnter={newOption !== '' ? addFieldOption : () => {}}
                    />
                </div>
            </div>
        </div>
    );
}

export default FieldOptionsList;
