import React, {useState, useEffect} from 'react';
import {formUtils, constants} from '@utilities';
import {
    EditorFormCard,
    Label,
    TextArea,
    DropDown,
    DatePicker,
    TextInput,
} from '@components';
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
        <div className='pb-2 bg-white rounded shadow flex-col-center'>
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
        </div>
    );
};

export default VisualSettings;
