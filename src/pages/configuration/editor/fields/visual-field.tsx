import React, {useEffect, useState} from 'react';
import {hints, colors} from 'utilities';
import {icons} from 'assets';
import {TextArea, TextInput, EditorFormCard, EditorFormRow} from 'components';
import {types} from 'types';

interface Props {
    fieldConfig: types.SurveyField;
    disabled: boolean;
    setLocalFieldConfig(fieldConfigChanges: object): void;
    removeField(): void;
    copyField(): void;
    children: React.ReactNode;
}
function VisualField(props: Props) {
    const commonInputProps = {
        disabled: props.disabled,
        flat: true,
    };

    const [collapse, setCollapse] = useState(true);
    useEffect(() => {
        setCollapse(true);
    }, [props.fieldConfig.local_id]);

    const [actionLabel, setActionLabel] = useState('');

    const buttons = (
        <>
            <div
                className='w-10 h-10 px-2 py-2 cursor-pointer opacity-70 hover:opacity-100'
                onClick={() => {
                    props.copyField();
                    setActionLabel('copied!');
                }}
                onMouseEnter={() => setActionLabel('copy')}
            >
                {icons.contentCopy}
            </div>
            <div
                className='w-10 h-10 px-2 py-2 cursor-pointer opacity-70 hover:opacity-100'
                onClick={props.removeField}
                onMouseEnter={() => setActionLabel('remove')}
            >
                {icons.delete}
            </div>
        </>
    );
    return (
        <EditorFormCard
            label={props.fieldConfig.type}
            icon={icons.widgets}
            color={colors.fieldTypeToColor(props.fieldConfig.type)}
            collapse={collapse}
            setCollapse={setCollapse}
            longLabel={props.fieldConfig.title}
            buttons={buttons}
            actionLabel={actionLabel}
            setActionLabel={setActionLabel}
        >
            <EditorFormRow label='Title' className='mb-1'>
                <TextInput
                    {...commonInputProps}
                    placeholder='The title of this field'
                    value={props.fieldConfig.title}
                    onChange={(newValue: string) => {
                        props.setLocalFieldConfig({
                            title: newValue,
                        });
                    }}
                    hint={{
                        ...hints.title(props.fieldConfig.title),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>

            <EditorFormRow label='Description' className='mb-8'>
                <TextArea
                    {...commonInputProps}
                    value={props.fieldConfig.description}
                    onChange={(newValue: string) => {
                        props.setLocalFieldConfig({description: newValue});
                    }}
                    charLimits={{min: 0, max: 2000}}
                />
            </EditorFormRow>

            {props.children}
        </EditorFormCard>
    );
}

export default VisualField;
