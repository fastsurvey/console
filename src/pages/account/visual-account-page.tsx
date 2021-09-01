import React, {useState} from 'react';
import {types} from '@types';
import {icons} from '@assets';
import {Button, Label, TextInput} from '@components';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function VisualAccountPage(props: {
    account: types.Account;
    validation: {valid: boolean; message: string};
    showValidation: boolean;
    password: string;
    passwordConfirmation: string;
    setPassword(p: string): void;
    setPasswordConfirmation(p: string): void;
    pending: boolean;
    submitNewPassword(): void;
}) {
    const {
        validation,
        showValidation,
        password,
        passwordConfirmation,
        setPassword,
        setPasswordConfirmation,
        pending,
        submitNewPassword,
    } = props;

    const [tabIndex, setTabIndex] = useState(0);
    const tabs = [
        {name: 'Identification', href: '#', icon: icons.userCircle},
        {name: 'Password', href: '#', icon: icons.key},
    ];

    return (
        <div
            className={
                'py-32 min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-2xl centering-col'>
                <div className='w-full mt-4 bg-white rounded shadow-md flex-col-center'>
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
                                    Account Settings:{' '}
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
                                    <Label text='Email (cannot be modified yet)' />
                                    <TextInput
                                        value={props.account.email}
                                        setValue={() => {}}
                                        disabled={true}
                                    />
                                </div>

                                <div className='w-full centering-col gap-y-0.5'>
                                    <Label text='Username (cannot be modified yet)' />
                                    <TextInput
                                        value={props.account.username}
                                        setValue={() => {}}
                                        disabled={true}
                                    />
                                </div>
                            </>
                        )}
                        {tabIndex === 1 && (
                            <>
                                <div className='w-full space-y-3 flex-col-left'>
                                    <div className='w-full centering-col gap-y-0.5'>
                                        <Label text='New Password' />
                                        <TextInput
                                            value={password}
                                            setValue={setPassword}
                                            disabled={pending}
                                            type='password'
                                        />
                                    </div>

                                    <div className='w-full centering-col gap-y-0.5'>
                                        <Label text='Confirm New Password' />
                                        <TextInput
                                            value={passwordConfirmation}
                                            setValue={setPasswordConfirmation}
                                            disabled={pending}
                                            type='password'
                                        />
                                    </div>
                                </div>
                                <div className='w-full gap-x-2 flex-row-right'>
                                    <Button
                                        text='cancel'
                                        variant='flat-light-red'
                                        onClick={() => {
                                            setPassword('');
                                            setPasswordConfirmation('');
                                        }}
                                        disabled={!showValidation || pending}
                                    />
                                    <Button
                                        text='change password'
                                        variant='flat-light-blue'
                                        onClick={submitNewPassword}
                                        disabled={!showValidation || pending}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div
                        className={
                            'w-full px-3 flex-row-left space-x-2 ' +
                            'rounded-b text-justify ' +
                            (!showValidation
                                ? 'h-0 overflow-hidden '
                                : validation.valid
                                ? 'mt-2 border-t-2 text-green-400 bg-green-50 border-green-100 h-10 '
                                : 'mt-2 border-t-2 text-red-400 bg-red-50 border-red-100 h-10 ')
                        }
                    >
                        <div
                            className={
                                'flex-shrink-0 w-5 h-5 ' +
                                (validation.valid ? 'icon-green ' : 'icon-red ')
                            }
                        >
                            {validation.valid
                                ? icons.checkCircle
                                : icons.closeCirlce}
                        </div>
                        <div className='text-sm text-left font-weight-600'>
                            {validation.message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualAccountPage;
