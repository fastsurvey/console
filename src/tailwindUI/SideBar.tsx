import React from 'react';

const Sidebar = () => (
    <React.Fragment>
        {/*
            Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
            Read the documentation to get started: https://tailwindui.com/documentation
        */}
        <div className='flex h-screen overflow-hidden bg-gray-100'>
            {/* 
                Off-canvas menu for mobile, show/hide based on off-canvas menu state. 
            */}
            <div className='md:hidden'>
                <div className='fixed inset-0 z-40 flex'>
                    {/*
                        Off-canvas menu overlay, show/hide based on off-canvas menu state.

                        Entering: "transition-opacity ease-linear duration-300"
                        From: "opacity-0"
                        To: "opacity-100"
                        Leaving: "transition-opacity ease-linear duration-300"
                        From: "opacity-100"
                        To: "opacity-0"
                    */}
                    <div className='fixed inset-0'>
                        <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
                    </div>
                    {/*
                        Off-canvas menu, show/hide based on off-canvas menu state.

                        Entering: "transition ease-in-out duration-300 transform"
                        From: "-translate-x-full"
                        To: "translate-x-0"
                        Leaving: "transition ease-in-out duration-300 transform"
                        From: "translate-x-0"
                        To: "-translate-x-full"
                    */}
                    <div className='relative flex flex-col flex-1 w-full max-w-xs bg-gray-800'>
                        <div className='absolute top-0 right-0 p-1 -mr-14'>
                            <button
                                className='flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600'
                                aria-label='Close sidebar'
                            >
                                <svg
                                    className='w-6 h-6 text-white'
                                    stroke='currentColor'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                            <div className='flex items-center flex-shrink-0 px-4'>
                                <img
                                    className='w-auto h-8'
                                    src='https://tailwindui.com/img/logos/workflow-logo-on-dark.svg'
                                    alt='Workflow'
                                />
                            </div>
                            <nav className='px-2 mt-5 space-y-1'>
                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 rounded-md group focus:outline-none focus:bg-gray-700'
                                >
                                    {/* Heroicon name: home */}
                                    <svg
                                        className='w-6 h-6 mr-4 text-gray-300 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                        />
                                    </svg>
                                    Dashboard
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: users */}
                                    <svg
                                        className='w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                                        />
                                    </svg>
                                    Team
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: folder */}
                                    <svg
                                        className='w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                                        />
                                    </svg>
                                    Projects
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: calendar */}
                                    <svg
                                        className='w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                        />
                                    </svg>
                                    Calendar
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: inbox */}
                                    <svg
                                        className='w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                                        />
                                    </svg>
                                    Documents
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-base font-medium leading-6 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: chart-bar */}
                                    <svg
                                        className='w-6 h-6 mr-4 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                                        />
                                    </svg>
                                    Reports
                                </a>
                            </nav>
                        </div>
                        <div className='flex flex-shrink-0 p-4 bg-gray-700'>
                            <a href='#' className='flex-shrink-0 block group'>
                                <div className='flex items-center'>
                                    <div>
                                        <img
                                            className='inline-block w-10 h-10 rounded-full'
                                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                            alt=''
                                        />
                                    </div>
                                    <div className='ml-3'>
                                        <p className='text-base font-medium leading-6 text-white'>
                                            Tom Cook
                                        </p>
                                        <p className='text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300'>
                                            View profile
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='flex-shrink-0 w-14'>
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className='hidden md:flex md:flex-shrink-0'>
                <div className='flex flex-col w-64'>
                    {/* 
                        Sidebar component, swap this element with another sidebar if you like
                    */}
                    <div className='flex flex-col flex-1 h-0 bg-gray-800'>
                        <div className='flex flex-col flex-1 pt-5 pb-4 overflow-y-auto'>
                            <div className='flex items-center flex-shrink-0 px-4'>
                                <img
                                    className='w-auto h-8'
                                    src='https://tailwindui.com/img/logos/workflow-logo-on-dark.svg'
                                    alt='Workflow'
                                />
                            </div>
                            <nav className='flex-1 px-2 mt-5 space-y-1 bg-gray-800'>
                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-gray-900 rounded-md group focus:outline-none focus:bg-gray-700'
                                >
                                    {/* Heroicon name: home */}
                                    <svg
                                        className='w-6 h-6 mr-3 text-gray-300 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                        />
                                    </svg>
                                    Dashboard
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: users */}
                                    <svg
                                        className='w-6 h-6 mr-3 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                                        />
                                    </svg>
                                    Team
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: folder */}
                                    <svg
                                        className='w-6 h-6 mr-3 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                                        />
                                    </svg>
                                    Projects
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: calendar */}
                                    <svg
                                        className='w-6 h-6 mr-3 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                                        />
                                    </svg>
                                    Calendar
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: inbox */}
                                    <svg
                                        className='w-6 h-6 mr-3 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                                        />
                                    </svg>
                                    Documents
                                </a>

                                <a
                                    href='#'
                                    className='flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                                >
                                    {/* Heroicon name: chart-bar */}
                                    <svg
                                        className='w-6 h-6 mr-3 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300 group-focus:text-gray-300'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            stroke-width='2'
                                            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                                        />
                                    </svg>
                                    Reports
                                </a>
                            </nav>
                        </div>
                        <div className='flex flex-shrink-0 p-4 bg-gray-700'>
                            <a
                                href='#'
                                className='flex-shrink-0 block w-full group'
                            >
                                <div className='flex items-center'>
                                    <div>
                                        <img
                                            className='inline-block rounded-full h-9 w-9'
                                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                            alt=''
                                        />
                                    </div>
                                    <div className='ml-3'>
                                        <p className='text-sm font-medium leading-5 text-white'>
                                            Tom Cook
                                        </p>
                                        <p className='text-xs font-medium leading-4 text-gray-300 transition duration-150 ease-in-out group-hover:text-gray-200'>
                                            View profile
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 w-0 overflow-hidden'>
                <div className='pt-1 pl-1 md:hidden sm:pl-3 sm:pt-3'>
                    <button
                        className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150'
                        aria-label='Open sidebar'
                    >
                        {/* Heroicon name: menu */}
                        <svg
                            className='w-6 h-6'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
                <main className='relative z-0 flex-1 overflow-y-auto focus:outline-none'>
                    <div className='pt-2 pb-6 md:py-6'>
                        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                            <h1 className='text-2xl font-semibold text-gray-900'>
                                Dashboard
                            </h1>
                        </div>
                        <div className='px-4 mx-auto max-w-7xl sm:px-6 md:px-8'>
                            {/* Replace with your content */}
                            <div className='py-4'>
                                <div className='border-4 border-gray-200 border-dashed rounded-lg h-96'></div>
                            </div>
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </React.Fragment>
);

export default Sidebar;
