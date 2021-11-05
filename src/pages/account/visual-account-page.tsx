import React, {useState} from 'react';
import {types} from '/src/types';
import {icons} from '/src/assets';
import {Button, Label, TextInput, ValidationBar} from '/src/components';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function VisualAccountPage(props: {
    account: types.Account;

    validatePassword(): types.ValidationResult;
    password: string;
    setPassword(p: string): void;
    passwordPending: boolean;
    submitPassword(): void;

    validateUsername(): types.ValidationResult;
    username: string;
    setUsername(p: string): void;
    usernamePending: boolean;
    openUsernameModal(): void;

    openDeleteUserModal(): void;
    removeUserPending: boolean;
}) {
    const {
        validatePassword,
        password,
        setPassword,
        passwordPending,
        submitPassword,

        validateUsername,
        username,
        setUsername,
        usernamePending,
        openUsernameModal,
    } = props;

    const [tabIndex, setTabIndex] = useState(0);
    const tabs = [
        {name: 'Identification', href: '#', icon: icons.userCircle},
        {name: 'Password', href: '#', icon: icons.key},
    ];

    const usernameValidation = validateUsername();
    const passwordValidation = validatePassword();

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
                    <div className='z-10 w-full px-4 py-1.5 border-b border-gray-200 md:hidden flex flex-row items-center justify-center'>
                        <div className='mr-2 text-base text-gray-900 font-weight-700'>
                            {tabs[tabIndex].name}
                        </div>
                        <div className='flex-grow' />
                        <Menu
                            as='div'
                            className='relative inline-block text-left'
                        >
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
                    <div className='hidden w-full md:z-10 md:block'>
                        <div className='w-full border-b border-gray-200'>
                            <nav className='px-4 py-2 space-x-2 flex-row-left'>
                                <div className='pr-2 text-gray-900 font-weight-600'>
                                    Account Settings:{' '}
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
                    <div className='z-0 w-full px-4 py-4 space-y-6 flex-col-left'>
                        {tabIndex === 0 && (
                            <>
                                <div className='w-full space-y-3 flex-col-left'>
                                    <div className='w-full centering-col gap-y-0.5'>
                                        <Label text='Email (cannot be modified yet)' />
                                        <TextInput
                                            value={props.account.email}
                                            setValue={() => {}}
                                            disabled={true}
                                            autoComplete='email'
                                        />
                                    </div>

                                    <div className='w-full centering-col gap-y-0.5'>
                                        <Label text='Username' />
                                        <TextInput
                                            value={username}
                                            setValue={setUsername}
                                            disabled={usernamePending}
                                            autoComplete='username'
                                        />
                                    </div>
                                </div>

                                <div className='w-full gap-x-2 flex-row-right'>
                                    <Button
                                        text='cancel'
                                        variant='flat-light-red'
                                        onClick={() => {
                                            setUsername(props.account.username);
                                        }}
                                        disabled={
                                            username ===
                                                props.account.username ||
                                            usernamePending
                                        }
                                    />
                                    <Button
                                        text='change username'
                                        variant='flat-light-blue'
                                        onClick={openUsernameModal}
                                        disabled={
                                            username ===
                                                props.account.username ||
                                            usernamePending ||
                                            !usernameValidation.valid
                                        }
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
                                            disabled={passwordPending}
                                            type='password'
                                            autoComplete='new-password'
                                        />
                                    </div>
                                </div>
                                <div className='w-full gap-x-2 flex-row-right'>
                                    <Button
                                        text='cancel'
                                        variant='flat-light-red'
                                        onClick={() => {
                                            setPassword('');
                                        }}
                                        disabled={
                                            password.length === 0 ||
                                            passwordPending
                                        }
                                    />
                                    <Button
                                        text='change password'
                                        variant='flat-light-blue'
                                        onClick={submitPassword}
                                        disabled={
                                            password.length === 0 ||
                                            passwordPending ||
                                            !passwordValidation.valid
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {username !== props.account.username && tabIndex === 0 && (
                        <ValidationBar validation={usernameValidation} />
                    )}
                    {password.length > 0 && tabIndex === 1 && (
                        <ValidationBar validation={passwordValidation} />
                    )}
                </div>
                <div className='w-full bg-white rounded shadow flex-col-left'>
                    <div className='w-full border-b border-gray-200'>
                        <nav className='px-4 py-2 space-x-2 flex-row-left'>
                            <div className='pr-2 text-gray-500 font-weight-600'>
                                Delete your account forever{' '}
                            </div>
                        </nav>
                    </div>
                    <div className='w-full p-3 flex-row-left'>
                        <Button
                            text='delete'
                            variant='flat-light-red'
                            icon={icons.trash}
                            onClick={props.openDeleteUserModal}
                        />
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
