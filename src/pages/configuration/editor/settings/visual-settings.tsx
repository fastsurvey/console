import React, {useState, useEffect} from 'react';
import {Label, TextArea, DatePicker, TextInput, Button} from '@components';
import {icons} from '@assets';
import {types} from '@types';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {templateUtils} from '@utilities';
import Toggle from '../../../../components/form/toggle';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface Props {
    configs: types.SurveyConfig[];
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
    useEffect(() => setTabIndex(0), [props.config.local_id]);

    const tabs = [
        {name: 'About', href: '#', icon: icons.textCursor},
        {name: 'Visibility', href: '#', icon: icons.time},
        {name: 'Actions', href: '#', icon: icons.gear},
    ];

    return (
        <div className='mt-4 bg-white rounded shadow-md flex-col-center'>
            <div className='z-10 w-full px-4 py-1.5 border-b border-gray-200 md:hidden flex-row-left'>
                <div className='mr-2 text-base text-gray-900 font-weight-700'>
                    {tabs[tabIndex].name}
                </div>
                <div className='flex-grow' />
                <Menu as='div' className='relative inline-block text-left'>
                    <div>
                        <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-50 ringable'>
                            More Settings
                            <ChevronDownIcon
                                className='w-5 h-5 ml-2 -mr-1'
                                aria-hidden='true'
                            />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={React.Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='py-1'>
                                {tabs.map((tab, index) => (
                                    <Menu.Item key={index}>
                                        {({active}) => (
                                            <div
                                                onClick={() =>
                                                    setTabIndex(index)
                                                }
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 text-gray-900 '
                                                        : 'text-gray-700 ',
                                                    'block px-4 py-2 text-sm font-weight-600',
                                                )}
                                            >
                                                {tab.name}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className='hidden w-full sm:block'>
                <div className='w-full border-b border-gray-200'>
                    <nav className='px-4 py-2 space-x-2 flex-row-left'>
                        <div className='pr-2 text-gray-900 font-weight-600'>
                            General Survey Settings:{' '}
                        </div>
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.name}
                                onClick={() => setTabIndex(index)}
                                className={classNames(
                                    index == tabIndex
                                        ? 'bg-blue-50 text-blue-800'
                                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
                                    'py-1 px-3 font-weight-600 text-base rounded',
                                )}
                            >
                                {tab.name}
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
                            />
                        </div>
                        <div className='w-full centering-col gap-y-0.5'>
                            <Label text='URL conform identifier' />
                            <div className='w-full flex-row-center gap-x-1'>
                                <TextInput
                                    value={props.config.survey_name}
                                    setValue={(newValue: string) => {
                                        props.updateConfig({
                                            ...props.config,
                                            survey_name: newValue,
                                        });
                                    }}
                                />
                                <button
                                    className={
                                        'w-8 h-8 p-1 mx-0.5 rounded ringable ' +
                                        (props.config.draft
                                            ? 'icon-blue '
                                            : 'icon-gray cursor-not-allowed ')
                                    }
                                    onClick={() => {
                                        if (props.config.draft) {
                                            props.updateConfig({
                                                ...props.config,
                                                survey_name:
                                                    templateUtils.surveyName(
                                                        props.configs,
                                                    ),
                                            });
                                        }
                                    }}
                                >
                                    {icons.refresh}
                                </button>
                            </div>
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
                            />
                        </div>
                    </>
                )}
                {tabIndex === 1 && (
                    <>
                        <div className='w-full flex-col-left gap-y-0.5'>
                            <Label text='Publicly visible (survey link works)' />
                            <Toggle
                                value={!props.config.draft}
                                setValue={(newValue: boolean) => {
                                    props.updateConfig({
                                        ...props.config,
                                        draft: !newValue,
                                    });
                                }}
                            />
                        </div>
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
                        'w-full px-3 text-justify flex-row-left space-x-3 ' +
                        'rounded-b bg-gray-50 border-gray-200 ' +
                        (props.validation.valid
                            ? 'text-green-900 h-0 overflow-hidden border-0 '
                            : 'text-red-900 min-h-12 md:min-h-[2.5rem] border-t-2 py-2 ')
                    }
                >
                    <div
                        className={
                            'flex-shrink-0 w-5 h-5 ' +
                            (props.validation.valid
                                ? 'icon-dark-green '
                                : 'icon-dark-red ')
                        }
                    >
                        {props.validation.valid
                            ? icons.checkCircle
                            : icons.closeCircle}
                    </div>
                    <div className='text-base text-left md:text-sm font-weight-600'>
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
