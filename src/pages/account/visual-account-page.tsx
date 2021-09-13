import React, {useState} from 'react';
import {types} from '@types';
import {icons} from '@assets';
import {Button, Label, TextInput} from '@components';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';

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
                'px-4 lg:px-0 py-20 md:py-32 ' +
                'min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-4xl space-y-4 flex-col-center'>
                <h1 className='w-full text-2xl text-blue-900 font-weight-700'>
                    Modify your Account
                </h1>
                <div className='w-full bg-white rounded shadow flex-col-left'>
                    <div className='z-10 w-full px-4 py-1.5 border-b border-gray-200 md:hidden flex-row-left'>
                        <div className='mr-2 text-base text-gray-900 font-weight-700'>
                            {tabs[tabIndex].name}{' '}
                            <span className='font-weight-500'>Settings</span>
                        </div>
                        <div className='flex-grow' />
                        <Menu
                            as='div'
                            className='relative inline-block text-left'
                        >
                            <div>
                                <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-50 ringable'>
                                    Categories
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
                                            <Menu.Item>
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
                    <div className='hidden w-full md:z-10 md:block'>
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
                    <div className='z-0 w-full px-4 py-4 space-y-6 flex-col-left'>
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
                            'rounded-b text-justify bg-gray-50 border-gray-200 ' +
                            (!showValidation || tabIndex !== 1
                                ? 'h-0 overflow-hidden '
                                : validation.valid
                                ? 'mt-2 border-t-2 text-green-900 h-10 '
                                : 'mt-2 border-t-2 text-red-900 h-10 ')
                        }
                    >
                        <div
                            className={
                                'flex-shrink-0 w-5 h-5 ' +
                                (validation.valid
                                    ? 'icon-dark-green '
                                    : 'icon-dark-red ')
                            }
                        >
                            {validation.valid
                                ? icons.checkCircle
                                : icons.closeCircle}
                        </div>
                        <div className='text-base text-left md:text-sm font-weight-600'>
                            {validation.message}
                        </div>
                    </div>
                </div>
                <div className='p-4 border-[2px] border-dashed border-gray-300 rounded w-full'>
                    <h3 className='text-base leading-6 text-blue-900 opacity-80 font-weight-600'>
                        Payment Information
                    </h3>
                    <div className='mt-2 text-sm text-gray-900 opacity-60 font-weight-400'>
                        Right now, our tool is still completely free to use. We
                        want to see how people use it and implement important
                        features before spending time on implementing payment
                        logic.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualAccountPage;
