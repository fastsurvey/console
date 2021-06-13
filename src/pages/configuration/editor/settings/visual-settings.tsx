import React, {useState, useEffect} from 'react';
import {formUtils, constants} from 'utilities';
import {
    EditorFormCard,
    Label,
    TextArea,
    DropDown,
    DatePicker,
    TextInput,
} from 'components';
import {icons} from 'assets';
import {types} from 'types';

interface Props {
    config: types.SurveyConfig;
    updateConfig(config: types.SurveyConfig, skipValidation?: boolean): void;
    commonProps: any;
    disabled: boolean;
    openRemoveModal(): void;
    openDuplicateModal(): void;
    validation: types.ValidationResult;
}
const VisualSettings = (props: Props) => {
    const [collapse, setCollapse] = useState(true);
    useEffect(() => setCollapse(true), [props.config.local_id]);

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
            className='z-20 mt-6'
            collapse={collapse}
            setCollapse={setCollapse}
            buttons={buttons}
            actionLabel={actionLabel}
            setActionLabel={setActionLabel}
            validation={props.validation}
        >
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Title' />
                <TextInput
                    value={props.config.title}
                    setValue={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            title: newValue,
                        });
                    }}
                    disabled={!props.config.draft || collapse}
                />
            </div>
            <div className='w-full centering-col gap-y-0.5'>
                <Label text='URL conform identifier' />
                <TextInput
                    value={props.config.survey_name}
                    setValue={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            survey_name: newValue,
                        });
                    }}
                    disabled={!props.config.draft || collapse}
                />
            </div>

            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Description' />
                <TextArea
                    value={props.config.description}
                    setValue={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            description: newValue,
                        });
                    }}
                    disabled={!props.config.draft || collapse}
                />
            </div>

            <div
                className={'h-0.5 bg-gray-300'}
                style={{width: 'calc(100% + 1.5rem)'}}
            />

            <div className='w-full flex-col-left gap-y-0.5'>
                <Label text='Start survey at' />
                <DatePicker
                    timestamp={props.config.start}
                    setTimestamp={(timestamp: number) => {
                        props.updateConfig({
                            ...props.config,
                            start: timestamp,
                        });
                    }}
                    disabled={!props.config.draft || collapse}
                />
            </div>

            <div className='w-full flex-col-left gap-y-0.5'>
                <Label text='End survey by' />
                <DatePicker
                    timestamp={props.config.end}
                    setTimestamp={(timestamp: number) => {
                        props.updateConfig({
                            ...props.config,
                            end: timestamp,
                        });
                    }}
                    disabled={!props.config.draft || collapse}
                />
            </div>

            <div
                className={'h-0.5 bg-gray-300'}
                style={{width: 'calc(100% + 1.5rem)'}}
            />

            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Authentication Mode' />
                <DropDown
                    value={props.config.authentication === 'open' ? 0 : 1}
                    setValue={(newValue: 0 | 1) => {
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
                    disabled={!props.config.draft || collapse}
                />
            </div>

            <div className='w-full centering-col gap-y-0.5'>
                <Label text='Limit to' />
                <TextInput
                    value={props.config.limit.toString()}
                    setValue={(newValue: string) => {
                        props.updateConfig({
                            ...props.config,
                            limit: formUtils.formatters.atoi(newValue),
                        });
                    }}
                    disabled={!props.config.draft || collapse}
                    postfix=' submissions'
                />
            </div>
        </EditorFormCard>
    );
};

export default VisualSettings;
