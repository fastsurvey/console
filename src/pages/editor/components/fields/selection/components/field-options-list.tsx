import React, {useEffect, useRef, useState, createRef} from 'react';
import {icons} from '/src/assets';
import {animateScroll} from 'react-scroll';
import {templateUtils} from '/src/utilities';
import {Label} from '/src/components';
import {types} from '/src/types';

function FieldOptionsList(props: {
    localFieldConfig: types.SelectionField;
    setLocalFieldConfig(fieldConfigChanges: types.SurveyFieldChange): void;
    disabled: boolean;
}) {
    const optionRefs: any = useRef([]);
    optionRefs.current = props.localFieldConfig.options.map(
        (_, i) => optionRefs.current[i] ?? createRef(),
    );

    const [fieldToFocus, setFieldToFocus] = useState(-1);

    function addFieldOption(newIndex: number) {
        props.setLocalFieldConfig(
            templateUtils.option(newIndex, props.localFieldConfig),
        );
        // Suitable for 1rem = 16px
        animateScroll.scrollMore(56, {duration: 150});

        setFieldToFocus(newIndex);
    }

    useEffect(() => {
        if (fieldToFocus !== -1) {
            optionRefs.current[fieldToFocus].current.focus();
            setFieldToFocus(-1);
        }
    }, [fieldToFocus]);

    return (
        <div className='w-full flex-col-right gap-y-1' data-cy='options-list'>
            <Label text='Options to select' />
            {props.localFieldConfig.options.map((optionConfig, optionIndex) => (
                <div
                    className='w-full text-sm flex-row-left gap-x-2'
                    key={optionConfig.local_id}
                >
                    <input
                        ref={optionRefs.current[optionIndex]}
                        value={optionConfig.title}
                        onChange={(e) =>
                            props.setLocalFieldConfig({
                                options: props.localFieldConfig.options.map(
                                    (oldOptionField, oldIndex) =>
                                        optionIndex === oldIndex
                                            ? {
                                                  ...oldOptionField,
                                                  title: e.target.value,
                                              }
                                            : oldOptionField,
                                ),
                            })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                // @ts-ignore
                                e.target.blur();
                            }
                            if (e.key === 'Enter') {
                                addFieldOption(optionIndex + 1);
                            }
                        }}
                        className={
                            'w-full px-3 rounded h-9 ringable font-weight-500 ' +
                            (props.disabled
                                ? 'bg-gray-200 text-gray-600 cursor-not-allowed '
                                : 'bg-gray-100 text-gray-800 ')
                        }
                        disabled={props.disabled}
                        data-cy={`input-option-${optionIndex}`}
                    />
                    <button
                        className={
                            'w-8 h-8 p-1.5 rounded svg-selection-option-remove ringable ' +
                            (props.disabled ? 'opacity-60 cursor-not-allowed ' : ' ')
                        }
                        onClick={(e) => {
                            // @ts-ignore
                            e.target.blur();
                            props.setLocalFieldConfig({
                                options: props.localFieldConfig.options.filter(
                                    (oldOptionField, oldIndex) =>
                                        optionIndex !== oldIndex,
                                ),
                            });
                        }}
                        disabled={props.disabled}
                        data-cy={`button-remove-${optionIndex}`}
                    >
                        {icons.trash}
                    </button>
                </div>
            ))}
            <div className={'w-full pr-[2.375rem] h-9 mb-1'}>
                <button
                    onClick={() =>
                        addFieldOption(props.localFieldConfig.options.length)
                    }
                    className={
                        'w-full h-full rounded flex-row-left px-3 ringable ' +
                        'text-sm font-weight-500 text-gray-700 cursor-pointer ' +
                        'border border-dashed border-gray-300 bg-gray-50 text-gray-300 ' +
                        'hover:border-gray-500 hover:bg-gray-100 hover:text-gray-500 ' +
                        'focus:border-transparent focus:bg-gray-100 focus:text-gray-500 '
                    }
                    data-cy='button-add'
                    disabled={props.disabled}
                >
                    add option
                </button>
            </div>
        </div>
    );
}

export default FieldOptionsList;
