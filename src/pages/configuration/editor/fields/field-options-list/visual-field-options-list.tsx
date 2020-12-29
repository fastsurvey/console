import React from 'react';
import {configTypes, hints} from 'utilities';
import {icons} from 'assets';
import {TextInput, TriggerIcon, EditorFormRow} from 'components';

interface Props {
    fieldConfig: configTypes.RadioField | configTypes.SelectionField;
    disabled: boolean;
    updateFieldConfig(
        fieldConfig: configTypes.RadioField | configTypes.SelectionField,
    ): void;

    setOptionsVisible(optionsVisible: boolean[]): void;
    optionsVisible: boolean[];
    newOption: string;
    setNewOption(newOption: string): void;
    addFieldOption(): void;
}
const VisualFieldOptionsList = React.forwardRef((props: Props, ref: any) => {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
        wrapperClassName: 'flex-max',
    };

    return (
        <EditorFormRow label='Options' className='mb-2'>
            <div className='flex flex-col w-full'>
                {props.fieldConfig.fields.map((optionField, optionIndex) => (
                    <div
                        key={optionField.local_id}
                        className={
                            'flex flex-row w-full mb-1 overflow-hidden ' +
                            'transition-height duration-300 ' +
                            (props.optionsVisible[optionIndex]
                                ? 'h-12 '
                                : 'h-0 ')
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
                            hint={{
                                ...hints.title(optionField.title),
                                inlineHint: true,
                            }}
                        />
                        <TriggerIcon
                            disabled={props.disabled}
                            icon={icons.delete}
                            onClick={() => {
                                props.setOptionsVisible(
                                    props.optionsVisible.map(
                                        (optionVisible, index) =>
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
                <div className='w-full pr-12 opacity-70'>
                    <TextInput
                        {...commonProps}
                        ref={ref}
                        value={props.newOption}
                        onChange={props.setNewOption}
                        placeholder='New option'
                        hint={hints.newOption(props.newOption)}
                        onEnter={
                            props.newOption !== ''
                                ? props.addFieldOption
                                : () => {}
                        }
                    />
                </div>
            </div>
        </EditorFormRow>
    );
});

export default VisualFieldOptionsList;
