import React, {useState, useEffect} from 'react';
import {formUtils, constants} from 'utilities';
import {
    DropDown,
    TextArea,
    TextInput,
    DatePicker,
    EditorFormCard,
    EditorFormRow,
} from 'components';
import {icons} from 'assets';
import {types} from 'types';

interface Props {
    config: types.SurveyConfig;
    surveyNameIsValid(survey_name: string): boolean;
    updateConfig(config: types.SurveyConfig, skipValidation?: boolean): void;
    updateValidator(newState: boolean): void;
    commonProps: any;
    disabled: boolean;
    openRemoveModal(): void;
    openDuplicateModal(): void;
}
const VisualSettings = (props: Props) => {
    const commonProps = {
        disabled: props.disabled,
        flat: true,
    };

    const [collapse, setCollapse] = useState(false);
    useEffect(() => setCollapse(false), [props.config.local_id]);

    const [actionLabel, setActionLabel] = useState('');

    const buttonCSS =
        'w-7 h-7 p-0.5 m-1.5 opacity-70 hover:opacity-100 rounded ringable-dark';
    const buttons = (
        <>
            <button
                className={buttonCSS}
                onClick={() => {
                    props.openDuplicateModal();
                }}
                onMouseEnter={() => setActionLabel('duplicate survey')}
                onFocus={() => setActionLabel('duplicate survey')}
            >
                {icons.duplicate}
            </button>
            <button
                className={buttonCSS}
                onClick={props.openRemoveModal}
                onMouseEnter={() => setActionLabel('remove survey')}
                onFocus={() => setActionLabel('remove survey')}
            >
                {icons.trash}
            </button>
        </>
    );

    return (
        <EditorFormCard
            label='General Settings'
            icon={icons.tune}
            className='z-20 mt-8'
            collapse={collapse}
            setCollapse={setCollapse}
            buttons={buttons}
            actionLabel={actionLabel}
            setActionLabel={setActionLabel}
        >
            <EditorFormRow label='Title' className='mb-1'>
                <TextInput
                    {...commonProps}
                    placeholder='The title of your survey'
                    value={props.config.title}
                    onChange={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            title: newValue,
                        });
                    }}
                    hint={{
                        ...formUtils.hints.title(props.config.title),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>

            <EditorFormRow label='Identifier' className='mb-1'>
                <TextInput
                    {...commonProps}
                    placeholder='URL conform identifier'
                    value={props.config.survey_name}
                    onChange={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            survey_name: newValue,
                        });
                    }}
                    hint={{
                        ...formUtils.hints.surveyName(
                            props.config,
                            props.surveyNameIsValid,
                        ),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>

            <EditorFormRow label='Description' className='mb-8'>
                <TextArea
                    {...commonProps}
                    value={props.config.description}
                    onChange={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            ...{description: newValue},
                        });
                    }}
                    charLimits={{min: 0, max: 2000}}
                />
            </EditorFormRow>

            <EditorFormRow label='Start' className='mb-2'>
                <DatePicker
                    {...commonProps}
                    timestamp={props.config.start}
                    setNewTimestamp={(timestamp: number) => {
                        props.updateConfig(
                            {
                                ...props.config,
                                start: timestamp,
                            },
                            true,
                        );
                    }}
                />
            </EditorFormRow>
            <EditorFormRow label='End' className='mb-8'>
                <DatePicker
                    {...commonProps}
                    timestamp={props.config.end}
                    setNewTimestamp={(timestamp: number) => {
                        props.updateConfig(
                            {
                                ...props.config,
                                end: timestamp,
                            },
                            true,
                        );
                    }}
                />
            </EditorFormRow>

            <EditorFormRow label='Auth Mode' className='mb-1'>
                <DropDown
                    {...commonProps}
                    value={props.config.authentication === 'open' ? 0 : 1}
                    onChange={(newValue: 0 | 1) => {
                        props.updateConfig(
                            {
                                ...props.config,
                                authentication:
                                    newValue === 0 ? 'open' : 'email',
                            },
                            false,
                        );
                    }}
                    options={constants.formOptions.AUTH_MODE}
                />
            </EditorFormRow>

            <EditorFormRow label='Limit to' className='mb-2'>
                <TextInput
                    {...commonProps}
                    postfix=' submissions'
                    value={props.config.limit.toString()}
                    onChange={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            limit: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    hint={{
                        ...formUtils.hints.submissionLimit(props.config),
                        inlineHint: true,
                    }}
                />
            </EditorFormRow>
        </EditorFormCard>
    );
};

export default VisualSettings;
