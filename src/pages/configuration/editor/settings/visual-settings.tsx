import React, {useState} from 'react';
import {Label, TextArea, DatePicker, TextInput, Button} from '@components';
import {icons} from '@assets';
import {types} from '@types';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

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
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = [
        {name: 'About', href: '#', icon: icons.textCursor},
        {name: 'Time', href: '#', icon: icons.time},
        {name: 'Actions', href: '#', icon: icons.gear},
    ];

    return (
        <div className='mt-4 bg-white rounded shadow-md flex-col-center'>
            <div className='sm:hidden'>
                <label htmlFor='tabs' className='sr-only'>
                    Select a tab
                </label>
                <select
                    id='tabs'
                    name='tabs'
                    className='block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                    defaultValue={tabs[tabIndex].name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className='hidden w-full sm:block'>
                <div className='w-full border-b-2 border-gray-200'>
                    <nav className='px-4 mb-[-2px] space-x-4 flex-row-left pt-0.5'>
                        <div className='text-gray-900 font-weight-600'>
                            General Survey Settings:{' '}
                        </div>
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.name}
                                onClick={() => setTabIndex(index)}
                                className={classNames(
                                    index == tabIndex
                                        ? 'border-blue-500 text-blue-800'
                                        : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-500',
                                    'group inline-flex items-center py-2 px-3 border-b-2 font-weight-600 text-base',
                                )}
                            >
                                <div
                                    className={classNames(
                                        index == tabIndex
                                            ? 'text-blue-700 icon-blue '
                                            : 'text-gray-400 group-hover:text-gray-600 icon-gray ',
                                        '-ml-0.5 mr-2 h-5 w-5',
                                    )}
                                >
                                    {tab.icon}
                                </div>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            <div className='w-full px-4 py-4 space-y-6 flex-col-left'>
                {tabIndex === 0 && (
                    <>
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
                                disabled={!props.config.draft}
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
                                disabled={!props.config.draft}
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
                                disabled={!props.config.draft}
                            />
                        </div>
                    </>
                )}
                {tabIndex === 1 && (
                    <>
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
                                disabled={!props.config.draft}
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
                                disabled={!props.config.draft}
                            />
                        </div>
                    </>
                )}
                {tabIndex === 2 && (
                    <div className='w-full gap-x-2 flex-row-left'>
                        <Button
                            text='duplicate'
                            variant='flat-light-blue'
                            icon={icons.duplicate}
                            onClick={props.openDuplicateModal}
                        />
                        <Button
                            text='delete'
                            variant='flat-light-red'
                            icon={icons.trash}
                            onClick={props.openRemoveModal}
                        />
                    </div>
                )}
            </div>
            {props.validation && (
                <div
                    className={
                        'w-full px-3 flex-row-left space-x-2 ' +
                        'rounded-b text-justify ' +
                        (props.validation.valid
                            ? 'h-0 overflow-hidden '
                            : 'mt-2 border-t-2 text-red-400 bg-red-50 border-red-100 h-10 ')
                    }
                >
                    <div
                        className={
                            'flex-shrink-0 w-5 h-5 ' +
                            (props.validation.valid
                                ? 'icon-green '
                                : 'icon-red ')
                        }
                    >
                        {props.validation.valid
                            ? icons.checkCircle
                            : icons.closeCirlce}
                    </div>
                    <div className='text-sm text-left font-weight-600'>
                        {props.validation.valid
                            ? 'Valid'
                            : props.validation.message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisualSettings;
