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
import {
    CreditCardIcon,
    OfficeBuildingIcon,
    UserIcon,
    UsersIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
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
    const tabs = [
        {name: 'My Account', href: '#', icon: UserIcon, current: false},
        {name: 'Company', href: '#', icon: OfficeBuildingIcon, current: false},
        {name: 'Team Members', href: '#', icon: UsersIcon, current: true},
        {name: 'Billing', href: '#', icon: CreditCardIcon, current: false},
    ];

    return (
        <div className='p-4 bg-white rounded shadow flex-col-center'>
            <div className='sm:hidden'>
                <label htmlFor='tabs' className='sr-only'>
                    Select a tab
                </label>
                <select
                    id='tabs'
                    name='tabs'
                    className='block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className='hidden w-full sm:block'>
                <div className='w-full border-b border-gray-200'>
                    <nav
                        className='-mb-px space-x-8 flex-row-left'
                        aria-label='Tabs'
                    >
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'group inline-flex items-center py-2 px-1 border-b-2 font-weight-600 text-sm',
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                <tab.icon
                                    className={classNames(
                                        tab.current
                                            ? 'text-blue-500'
                                            : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5',
                                    )}
                                    aria-hidden='true'
                                />
                                <span>{tab.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default VisualSettings;
