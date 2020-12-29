import React from 'react';
import {configTypes, hints} from 'utilities';
import {icons} from 'assets';
import {TextArea, TextInput, EditorFormCard, EditorFormRow} from 'components';

interface Props {
    fieldConfig: configTypes.SurveyField;
    disabled: boolean;
    setFieldConfig(fieldConfig: configTypes.SurveyField): void;
    updateFieldConfig(fieldConfig: configTypes.SurveyField): void;
    children: React.ReactNode;
}
function VisualField(props: Props) {
    const commonInputProps = {
        disabled: props.disabled,
        flat: true,
    };

    let cardColor: string;
    switch (props.fieldConfig.type) {
        case 'Email':
            cardColor = 'red';
            break;
        case 'Option':
            cardColor = 'orange';
            break;
        case 'Radio':
            cardColor = 'yellow';
            break;
        case 'Selection':
            cardColor = 'green';
            break;
        case 'Text':
            cardColor = 'teal';
            break;
    }

    return (
        <EditorFormCard
            label={props.fieldConfig.type}
            icon={icons.widgets}
            color={cardColor}
        >
            <EditorFormRow label='Title' className='mb-1'>
                <TextInput
                    {...commonInputProps}
                    placeholder='The title of this field'
                    value={props.fieldConfig.title}
                    onChange={(newValue: string) => {
                        props.updateFieldConfig({
                            ...props.fieldConfig,
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
                        props.updateFieldConfig({
                            ...props.fieldConfig,
                            ...{description: newValue},
                        });
                    }}
                    charLimits={{min: 0, max: 2000}}
                />
            </EditorFormRow>

            {props.children}
        </EditorFormCard>
    );
}

export default VisualField;
