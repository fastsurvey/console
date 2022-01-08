import React, {useEffect, useState, useRef} from 'react';
import {icons} from '/src/assets';
import {EditorFormCard, PageBreakCard, Label, TextArea} from '/src/components';
import {types} from '/src/types';
import {styleUtils} from '/src/utilities';
import MarkdownFieldEditor from './markdown/markdown-field-editor';

function VisualField(props: {
    identifierToOrder: {[key: string]: number};
    fieldIndex: number;
    fieldConfig: types.SurveyField;
    disabled: boolean;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    validation: types.ValidationResult;
    removeField(): void;
    copyField(): void;
    children: React.ReactNode;
    configIsDiffering: boolean;
    collapse: boolean;
    setCollapse(c: boolean): void;
}) {
    const {collapse, setCollapse} = props;
    const panelRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (props.configIsDiffering) {
            setTimeout(() => {
                panelRef.current?.scrollIntoView({behavior: 'smooth'});
            }, 50);
            setTimeout(() => {
                descriptionRef.current?.focus();
            }, 450);
        }
    }, [props.fieldConfig.local_id]);

    const [actionLabel, setActionLabel] = useState('');
    const buttonCSS =
        'w-7 h-7 p-1 my-1.5 mx-0.5 opacity-60 hover:opacity-100 rounded ringable-dark ';
    const disabledButtonCSS =
        'w-7 h-7 p-1 my-1.5 mx-0.5 opacity-60 rounded cursor-not-allowed ';
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
                data-cy='button-copy'
            >
                {icons.duplicate}
            </button>
            <button
                className={props.disabled ? disabledButtonCSS : buttonCSS}
                onClick={props.removeField}
                onMouseEnter={() => setActionLabel('remove')}
                onFocus={() => setActionLabel('remove')}
                disabled={props.disabled}
                data-cy='button-remove'
            >
                {icons.trash}
            </button>
        </>
    );

    let fieldLabel: string = `Field ${
        props.identifierToOrder[props.fieldConfig.identifier]
    } (${props.fieldConfig.type})`;
    let mobileFieldLabel: string = `${
        props.identifierToOrder[props.fieldConfig.identifier]
    } (${props.fieldConfig.type})`;
    if (props.fieldConfig.type === 'markdown') {
        fieldLabel = 'Markdown Content';
        mobileFieldLabel = 'Markdown';
    }

    if (props.fieldConfig.type !== 'break') {
        return (
            <EditorFormCard
                ref={panelRef}
                label={fieldLabel}
                mobileLabel={mobileFieldLabel}
                icon={styleUtils.icons.fieldTypeToIcon(props.fieldConfig.type)}
                fieldType={props.fieldConfig.type}
                collapse={collapse}
                setCollapse={setCollapse}
                longLabel={
                    props.fieldConfig.type !== 'markdown'
                        ? props.fieldConfig.description
                        : undefined
                }
                buttons={buttons}
                actionLabel={actionLabel}
                setActionLabel={setActionLabel}
                validation={props.validation}
                data-cy={`editor-field-panel-${props.fieldIndex}`}
            >
                {['email', 'selection', 'text'].includes(props.fieldConfig.type) && (
                    <div className='w-full flex-col-center gap-y-0.5'>
                        <Label text='Description' />
                        <TextArea
                            ref={descriptionRef}
                            value={props.fieldConfig.description}
                            setValue={(newValue: string) => {
                                props.setLocalFieldConfig({description: newValue});
                            }}
                            disabled={props.disabled || collapse}
                            data-cy='input-description'
                        />
                    </div>
                )}
                {props.fieldConfig.type === 'markdown' && (
                    <MarkdownFieldEditor
                        ref={descriptionRef}
                        value={props.fieldConfig.description}
                        setValue={(newValue: string) => {
                            props.setLocalFieldConfig({description: newValue});
                        }}
                        disabled={props.disabled || collapse}
                    />
                )}
                {props.children !== undefined && (
                    <>
                        <div
                            className={'h-px bg-gray-300 '}
                            style={{width: 'calc(100% + 1.5rem)'}}
                        />
                        {props.children}
                    </>
                )}
            </EditorFormCard>
        );
    } else {
        return (
            <PageBreakCard
                removeField={props.removeField}
                actionLabel={actionLabel}
                setActionLabel={setActionLabel}
                data-cy={`editor-field-panel-${props.fieldIndex}`}
            />
        );
    }
}

export default VisualField;
