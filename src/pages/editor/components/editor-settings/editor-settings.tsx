import React, {useState, useEffect} from 'react';
import {Label, DatePicker, TextInput, Toggle, ValidationBar} from '/src/components';
import {icons} from '/src/assets';
import {types} from '/src/types';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import {reduxUtils, templateUtils} from '/src/utilities';
import {connect} from 'react-redux';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const EditorSettings = (props: {
    configs: types.SurveyConfig[];
    localConfig: types.SurveyConfig;
    setLocalSettingsConfig(configChanges: types.SurveyConfigChange): void;
    disabled: boolean;
    settingsValidation: types.ValidationResult;
}) => {
    const [tabIndex, setTabIndex] = useState(0);
    useEffect(() => setTabIndex(0), [props.localConfig.local_id]);
    const tabs = ['About', 'Visibility'];

    return (
        <div
            className='mt-4 bg-white rounded shadow-sm flex-col-center'
            data-cy='editor-settings'
        >
            <div className='z-10 w-full px-4 py-1.5 border-b border-gray-300 md:hidden flex flex-row items-center justify-center'>
                <div className='mr-2 text-base text-gray-900 font-weight-700'>
                    {tabs[tabIndex]}
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
                                                onClick={() => setTabIndex(index)}
                                                className={classNames(
                                                    active
                                                        ? 'bg-gray-100 text-gray-900 '
                                                        : 'text-gray-700 ',
                                                    'block px-4 py-2 text-sm font-weight-600',
                                                )}
                                            >
                                                {tab}
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className='hidden w-full md:block'>
                <div className='w-full border-b border-gray-300'>
                    <nav className='px-4 py-2 space-x-2 flex-row-left'>
                        <div className='pr-2 text-gray-900 font-weight-600'>
                            General Survey Settings:{' '}
                        </div>
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
                                onClick={() => setTabIndex(index)}
                                className={classNames(
                                    index == tabIndex
                                        ? 'bg-blue-50 text-blue-800'
                                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
                                    'py-1 px-3 font-weight-600 text-base rounded',
                                )}
                                data-cy={`tab-${tab.toLowerCase()}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            <div className='w-full px-4 py-4 space-y-6 flex-col-left'>
                {tabIndex === 0 && (
                    <>
                        <div className='w-full flex-col-left gap-y-0.5'>
                            <Label text='Title' />
                            <TextInput
                                value={props.localConfig.title}
                                setValue={(newValue: string) => {
                                    props.setLocalSettingsConfig({
                                        title: newValue,
                                    });
                                }}
                                disabled={props.disabled}
                                data-cy='input-title'
                            />
                        </div>
                        <div className='w-full flex-col-left gap-y-0.5'>
                            <Label
                                text='Identifier'
                                detail={
                                    <>
                                        This identifier is used in the URL that you can
                                        share with your survey. The survey can be filled
                                        out at{' '}
                                        <span className='text-blue-100 underline break-all'>
                                            https://fastsurvey.de/{'<'}your-username
                                            {'>'}/{'<'}survey-identifier{'>'}
                                        </span>
                                        .
                                    </>
                                }
                            />
                            <div className='w-full flex-row-center gap-x-1'>
                                <TextInput
                                    value={props.localConfig.survey_name}
                                    setValue={(newValue: string) => {
                                        props.setLocalSettingsConfig({
                                            survey_name: newValue,
                                        });
                                    }}
                                    disabled={props.disabled}
                                    data-cy='input-identifier'
                                />
                                <button
                                    className={
                                        'w-8 h-8 p-1 mx-0.5 rounded ringable svg-settings-generate-id ' +
                                        (!props.disabled ? '' : 'cursor-not-allowed ')
                                    }
                                    onClick={() => {
                                        if (!props.disabled) {
                                            props.setLocalSettingsConfig({
                                                survey_name: templateUtils.surveyName(
                                                    props.configs,
                                                ),
                                            });
                                        }
                                    }}
                                    disabled={props.disabled}
                                    data-cy='refresh-identifier'
                                >
                                    {icons.refresh}
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {tabIndex === 1 && (
                    <>
                        <div className='w-full flex-col-left gap-y-0.5'>
                            <Label text='Open for new submissions' />
                            <Toggle
                                value={props.localConfig.start !== null}
                                setValue={(v: boolean) => {
                                    props.setLocalSettingsConfig({
                                        start: v ? 0 : null,
                                        end: v ? props.localConfig.end : null,
                                    });
                                }}
                                disabled={props.disabled}
                                data-cy='toggle-open-for-submissions'
                            />
                        </div>

                        {props.localConfig.start !== null && (
                            <>
                                <div className='w-full flex-col-left gap-y-0.5'>
                                    <Label text='Start time' />

                                    <DatePicker
                                        timestamp={props.localConfig.start}
                                        setTimestamp={(timestamp: number | null) => {
                                            props.setLocalSettingsConfig({
                                                start: timestamp,
                                            });
                                        }}
                                        disabled={props.disabled}
                                        data-cy='datepicker-start'
                                        type='start'
                                    />
                                </div>

                                <div className='w-full flex-col-left gap-y-0.5'>
                                    <Label text='End time' />
                                    <DatePicker
                                        timestamp={props.localConfig.end}
                                        setTimestamp={(timestamp: number | null) => {
                                            props.setLocalSettingsConfig({
                                                end: timestamp,
                                            });
                                        }}
                                        disabled={props.disabled}
                                        data-cy='datepicker-end'
                                        type='end'
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            <ValidationBar
                validation={props.settingsValidation}
                showValidState={false}
            />
        </div>
    );
};

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
    configs: state.configs,
    configIsDiffering: state.configIsDiffering,
});
const mapDispatchToProps = (dispatch: any) => ({
    openMessage: reduxUtils.dispatchers.openMessage(dispatch),
    openModal: reduxUtils.dispatchers.openModal(dispatch),
    closeModal: reduxUtils.dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditorSettings);
