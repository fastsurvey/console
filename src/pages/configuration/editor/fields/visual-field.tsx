import React, {useEffect, useState} from 'react';
import {formUtils} from 'utilities';
import {icons} from 'assets';
import {TextArea, TextInput, EditorFormCard, EditorFormRow} from 'components';
import {types} from 'types';
import styleUtils from '../../../../utilities/style-utils/index';

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

    const buttonCSS =
        'w-7 h-7 p-0.5 m-1.5 opacity-70 hover:opacity-100 rounded ringable-dark';
    const buttons = (
        <>
            <button
                className={buttonCSS}
                onClick={() => {
                    props.copyField();
                    setActionLabel('copied!');
                }}
                onMouseEnter={() => setActionLabel('copy')}
            >
                {icons.duplicate}
            </button>
            <button
                className={buttonCSS}
                onClick={props.removeField}
                onMouseEnter={() => setActionLabel('remove')}
            >
                {icons.trash}
            </button>
        </>
    );

    return (
        <EditorFormCard
            label={props.fieldConfig.type}
            icon={styleUtils.icons.fieldTypeToIcon(props.fieldConfig.type)}
            fieldType={props.fieldConfig.type}
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
                        ...formUtils.hints.title(props.fieldConfig.title),
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
