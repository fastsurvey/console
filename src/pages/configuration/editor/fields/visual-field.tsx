import React, {useEffect, useState} from 'react';
import {icons} from '/src/assets';
import {EditorFormCard, Label, TextInput, TextArea} from '/src/components';
import {types} from '/src/types';
import {styleUtils} from '/src/utilities';

interface Props {
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    disabled: boolean;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    validation: types.ValidationResult;
    removeField(): void;
    copyField(): void;
    children: React.ReactNode;
}
function VisualField(props: Props) {
    const [collapse, setCollapse] = useState(true);
    useEffect(() => {
        setCollapse(true);
    }, [props.fieldConfig.local_id]);

    const [actionLabel, setActionLabel] = useState('');

    const buttonCSS =
        'w-7 h-7 p-0.5 m-1.5 opacity-70 hover:opacity-100 rounded ringable-dark ';
    const disabledButtonCSS =
        'w-7 h-7 p-0.5 m-1.5 opacity-70 rounded cursor-not-allowed ';
    const buttons = (
        <>
            <button
                className={buttonCSS}
                onClick={() => {
                    props.copyField();
                    setActionLabel('copied!');
                }}
                onMouseEnter={() => setActionLabel('copy')}
                onFocus={() => setActionLabel('copy')}
            >
                {icons.duplicate}
            </button>
            <button
                className={props.disabled ? disabledButtonCSS : buttonCSS}
                onClick={props.removeField}
                onMouseEnter={() => setActionLabel('remove')}
                onFocus={() => setActionLabel('remove')}
                disabled={props.disabled}
            >
                {icons.trash}
            </button>
        </>
    );

    return (
        <EditorFormCard
            label={`field ${props.fieldIndex + 1} (${props.fieldConfig.type})`}
            icon={styleUtils.icons.fieldTypeToIcon(props.fieldConfig.type)}
            fieldType={props.fieldConfig.type}
            collapse={collapse}
            setCollapse={setCollapse}
            longLabel={props.fieldConfig.title}
            buttons={buttons}
            actionLabel={actionLabel}
            setActionLabel={setActionLabel}
            validation={props.validation}
        >
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Title' />
                <TextInput
                    value={props.fieldConfig.title}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({
                            title: newValue,
                        });
                    }}
                    disabled={props.disabled || collapse}
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Description' />
                <TextArea
                    value={props.fieldConfig.description}
                    setValue={(newValue: string) => {
                        props.setLocalFieldConfig({description: newValue});
                    }}
                    disabled={props.disabled || collapse}
                />
            </div>

            <div
                className={'h-0.5 bg-gray-300'}
                style={{width: 'calc(100% + 1.5rem)'}}
            />

            {props.children}
        </EditorFormCard>
    );
}

export default VisualField;
