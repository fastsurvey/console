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
    const tabs = ['Identification', 'Password'];

    const usernameValidation = validateUsername();
    const passwordValidation = validatePassword();

    return (
        <div
            className={
                'px-4 lg:px-0 py-20 md:py-32 ' +
                'min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-150'
            }
        >
            <div className='w-full max-w-4xl space-y-4 flex-col-center'>
                <h1 className='w-full text-2xl text-blue-900 font-weight-700'>
                    Modify your Account
                </h1>
                <section
                    className='w-full bg-white rounded shadow-sm flex-col-left'
                    data-cy='account-section-settings'
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
                    <div className='hidden w-full md:z-10 md:block'>
                        <div className='w-full border-b border-gray-300'>
                            <nav className='px-4 py-2 space-x-2 flex-row-left'>
                                <h2 className='pr-2 text-gray-900 font-weight-600'>
                                    Account Settings:{' '}
                                </h2>
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
                                        data-cy={`tab-${tab.toLowerCase()}-${
                                            index == tabIndex ? 'active' : 'passive'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className='z-0 w-full px-4 py-4 space-y-6 flex-col-left'>
                        {tabIndex === 0 && (
                            <>
                                <div className='w-full space-y-3 flex-col-left'>
                                    <div className='w-full flex-col-center gap-y-0.5'>
                                        <Label text='Email (cannot be modified yet)' />
                                        <TextInput
                                            value={props.account.email}
                                            setValue={() => {}}
                                            disabled={true}
                                            autoComplete='email'
                                            data-cy='input-email'
                                        />
                                    </div>

                                    <div className='w-full flex-col-center gap-y-0.5'>
                                        <Label text='Username' />
                                        <TextInput
                                            value={username}
                                            setValue={setUsername}
                                            disabled={usernamePending}
                                            autoComplete='username'
                                            data-cy='input-username'
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
                                            username === props.account.username ||
                                            usernamePending
                                        }
                                        data-cy='button-cancel-username'
                                    />
                                    <Button
                                        text='change username'
                                        variant='flat-light-blue'
                                        onClick={openUsernameModal}
                                        disabled={
                                            username === props.account.username ||
                                            usernamePending ||
                                            !usernameValidation.valid
                                        }
                                        data-cy='button-submit-username'
                                    />
                                </div>
                            </>
                        )}
                        {tabIndex === 1 && (
                            <>
                                <div className='w-full space-y-3 flex-col-left'>
                                    <div className='w-full flex-col-center gap-y-0.5'>
                                        <Label text='New Password' />
                                        <TextInput
                                            value={password}
                                            setValue={setPassword}
                                            disabled={passwordPending}
                                            type='password'
                                            autoComplete='new-password'
                                            data-cy='input-password'
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
                                            password.length === 0 || passwordPending
                                        }
                                        data-cy='button-cancel-password'
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
                                        data-cy='button-submit-password'
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
                </section>
                <section
                    className='w-full bg-white rounded shadow-sm flex-col-left'
                    data-cy='account-section-delete'
                >
                    <div className='w-full border-b border-gray-300'>
                        <nav className='px-4 py-2 space-x-2 flex-row-left'>
                            <h2 className='pr-2 text-gray-500 font-weight-600'>
                                Delete your account forever{' '}
                            </h2>
                        </nav>
                    </div>
                    <div className='w-full p-3 flex-row-left'>
                        <Button
                            text='delete'
                            variant='flat-light-red'
                            icon={icons.trash}
                            onClick={props.openDeleteUserModal}
                            data-cy={'account-delete-button-submit'}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default VisualAccountPage;
