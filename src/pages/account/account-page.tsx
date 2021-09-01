import React, {useState} from 'react';
import {connect} from 'react-redux';
import {types} from '@types';
import {icons} from '@assets';
import {Label, TextInput} from '@components';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function AccountPage(props: {
    account: types.Account;
    accessToken: types.AccessToken;
}) {
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = [
        {name: 'Identification', href: '#', icon: icons.textCursor},
        {name: 'Security', href: '#', icon: icons.time},
    ];

    return (
        <div
            className={
                'py-32 min-h-screen w-full z-0 flex-col-top ' +
                'overflow-y-scroll overflow-x-hidden bg-gray-100'
            }
        >
            <div className='w-full max-w-xl centering-col'>
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
                                    <Label text='Email' />
                                    <TextInput
                                        value={props.account.email}
                                        setValue={() => {}}
                                        disabled={true}
                                    />
                                </div>

                                <div className='w-full centering-col gap-y-0.5'>
                                    <Label text='Username' />
                                    <TextInput
                                        value={props.account.username}
                                        setValue={() => {}}
                                        disabled={true}
                                    />
                                </div>
                            </>
                        )}
                        {tabIndex === 1 && <>passwords</>}
                    </div>
                    {true && (
                        <div
                            className={
                                'w-full px-3 flex-row-left space-x-2 ' +
                                'rounded-b text-justify ' +
                                (true
                                    ? 'h-0 overflow-hidden '
                                    : 'mt-2 border-t-2 text-red-400 bg-red-50 border-red-100 h-10 ')
                            }
                        >
                            <div
                                className={
                                    'flex-shrink-0 w-5 h-5 ' +
                                    (true ? 'icon-green ' : 'icon-red ')
                                }
                            >
                                {true ? icons.checkCircle : icons.closeCirlce}
                            </div>
                            <div className='text-sm text-left font-weight-600'>
                                {true ? 'Valid' : 'Passwords do not match'}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    account: state.account,
    accessToken: state.accessToken,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
