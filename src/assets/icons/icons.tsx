/* eslint-disable max-len */
import React from 'react';

/* Why not just using the .svg files? Using this 
method required the execution of more JS, BUT: 
I can color these SVG's by simply setting the
text color of their parent element. Can't do
that with .svg image files.-bottom-0

The other option were to have one image for each 
color. But that would lead to overhead in other
areas and transitionig colors is not that simple. */

function SVG(props: {children: React.ReactNode}) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
            className='cursor-events-none'
        >
            <path d='M0 0h24v24H0V0z' fill='none' />
            {props.children}
        </svg>
    );
}

const icons = {
    add: (
        <SVG>
            <path
                className='secondary'
                fill-rule='evenodd'
                d='M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z'
            />
        </SVG>
    ),
    addSquare: (
        <SVG>
            <rect width='18' height='18' x='3' y='3' className='primary' rx='2' />
            <path
                className='secondary'
                d='M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4z'
            />
        </SVG>
    ),
    calendar: (
        <SVG>
            <path
                className='primary'
                d='M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 5v10h14V9H5z'
            />
            <path
                className='secondary'
                d='M13 13h3v3h-3v-3zM7 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm10 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1z'
            />
        </SVG>
    ),
    checkCircle: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z'
            />
        </SVG>
    ),
    chevronDown: (
        <SVG>
            <path
                className='secondary'
                fillRule='evenodd'
                d='M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'
            />
        </SVG>
    ),
    chevronLeftCircle: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M13.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L10.42 12l3.3 3.3z'
            />
        </SVG>
    ),
    chevronSelection: (
        <SVG>
            <path
                className='secondary'
                fillRule='evenodd'
                d='M8.7 9.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.4L12 6.42l-3.3 3.3zm6.6 4.6a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'
            />
        </SVG>
    ),
    close: (
        <SVG>
            <path
                className='secondary'
                d='M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z'
            />
        </SVG>
    ),
    closeCircle: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z'
            />
        </SVG>
    ),
    cloudDownload: (
        <SVG>
            <path
                className='primary'
                d='M15 15v-3a3 3 0 0 0-6 0v3H6a4 4 0 0 1-.99-7.88 5.5 5.5 0 0 1 10.86-.82A4.49 4.49 0 0 1 22 10.5a4.5 4.5 0 0 1-4.5 4.5H15z'
            />
            <path
                className='secondary'
                d='M11 18.59V12a1 1 0 0 1 2 0v6.59l1.3-1.3a1 1 0 0 1 1.4 1.42l-3 3a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l1.3 1.3z'
            />
        </SVG>
    ),
    collection: (
        <SVG>
            <rect width='20' height='12' x='2' y='10' className='primary' rx='2' />
            <path
                className='secondary'
                d='M20 8H4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2zm-2-4H6c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z'
            />
        </SVG>
    ),
    compass: (
        <SVG>
            <g>
                <path
                    className='secondary'
                    d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
                />
                <path
                    className='primary'
                    d='M13.71 13.03a2 2 0 0 0-2.75-2.75l5.39-4.03c.92-.7 2.1.48 1.4 1.4l-4.04 5.38zm-.3.38zm-.38.3l-5.38 4.04c-.92.7-2.1-.48-1.4-1.4l4.04-5.38a2 2 0 0 0 2.75 2.75zM10.6 10.6z'
                />
            </g>
        </SVG>
    ),
    duplicate: (
        <SVG>
            <rect width='14' height='14' x='3' y='3' className='secondary' rx='2' />
            <rect width='14' height='14' x='7' y='7' className='primary' rx='2' />
        </SVG>
    ),
    edit: (
        <SVG>
            <path
                className='primary'
                d='M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z'
            />
            <rect width='20' height='2' x='2' y='20' className='secondary' rx='1' />
        </SVG>
    ),
    email: (
        <SVG>
            <path
                className='primary'
                d='M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z'
            />
            <path
                className='secondary'
                d='M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z'
            />
        </SVG>
    ),
    exit: (
        <SVG>
            <path
                className='transform scale-x-[-1] origin-center primary'
                d='M11 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6h-2v12h2v-2a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1h-3v1a1 1 0 0 1-1.27.96l-6.98-2A1 1 0 0 1 2 19V5a1 1 0 0 1 .75-.97l6.98-2A1 1 0 0 1 11 3v1z'
            />
            <path
                className='transform scale-x-[-1] origin-center secondary'
                d='M18.59 11l-1.3-1.3c-.94-.94.47-2.35 1.42-1.4l3 3a1 1 0 0 1 0 1.4l-3 3c-.95.95-2.36-.46-1.42-1.4l1.3-1.3H14a1 1 0 0 1 0-2h4.59z'
            />
        </SVG>
    ),
    gear: (
        <SVG>
            <path
                className='primary'
                d='M6.8 3.45c.87-.52 1.82-.92 2.83-1.17a2.5 2.5 0 0 0 4.74 0c1.01.25 1.96.65 2.82 1.17a2.5 2.5 0 0 0 3.36 3.36c.52.86.92 1.8 1.17 2.82a2.5 2.5 0 0 0 0 4.74c-.25 1.01-.65 1.96-1.17 2.82a2.5 2.5 0 0 0-3.36 3.36c-.86.52-1.8.92-2.82 1.17a2.5 2.5 0 0 0-4.74 0c-1.01-.25-1.96-.65-2.82-1.17a2.5 2.5 0 0 0-3.36-3.36 9.94 9.94 0 0 1-1.17-2.82 2.5 2.5 0 0 0 0-4.74c.25-1.01.65-1.96 1.17-2.82a2.5 2.5 0 0 0 3.36-3.36zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
            />
            <circle cx='12' cy='12' r='2' className='secondary' />
        </SVG>
    ),
    information: (
        <SVG>
            <path className='primary' d='M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z' />
            <path
                className='secondary'
                d='M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'
            />
        </SVG>
    ),
    key: (
        <SVG>
            <path
                className='secondary'
                d='M8.23 10.77a7.01 7.01 0 1 1 5 5L11 18H9v2H7v2.03H2V17l6.23-6.23zM17 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
            />
            <path
                className='primary'
                d='M6.2 18.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 1 1 1.4 1.4l-4 4z'
            />
        </SVG>
    ),
    menu: (
        <SVG>
            <path
                className='secondary'
                d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
            />
        </SVG>
    ),
    pageSplit: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 417 417'>
            <path
                className='primary'
                d='M131.942,52.146c19.05,-0 34.725,15.671 34.725,34.721l-0,242.933c-0,19.096 -15.625,34.721 -34.725,34.721l-62.496,-0c-19.05,-0 -34.725,-15.671 -34.725,-34.721l-0,-242.933c-0,-19.096 15.625,-34.721 34.725,-34.721l62.496,-0Zm215.279,-0c19.05,-0 34.725,15.671 34.725,34.721l-0,242.933c-0,19.096 -15.625,34.721 -34.725,34.721l-62.496,-0c-19.05,-0 -34.725,-15.671 -34.725,-34.721l0,-242.933c0,-19.096 15.625,-34.721 34.725,-34.721l62.496,-0Z'
            />
            <path
                className='secondary'
                d='M208.396,329.863l-0.125,-0c-9.521,-0 -17.358,-7.838 -17.358,-17.363l0.12,-208.333c0,-9.525 7.838,-17.363 17.363,-17.363c9.521,0 17.358,7.838 17.358,17.363l0,208.333c0,9.525 -7.837,17.363 -17.358,17.363Z'
            />
        </svg>
    ),
    paragraph: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
            <path
                className='primary'
                d='M91.667,79.152c-0,4.583 -3.75,8.333 -8.334,8.333l-66.666,0c-4.572,0 -8.334,-3.761 -8.334,-8.333l0,-58.304c0,-4.583 3.75,-8.333 8.334,-8.333l66.666,-0c4.572,-0 8.334,3.761 8.334,8.333l-0,58.304Z'
            />
            <path
                className='secondary'
                d='M25,62.515l33.333,-0c2.286,-0 4.167,1.881 4.167,4.166c0,2.286 -1.881,4.167 -4.167,4.167l-33.333,-0c-2.286,-0 -4.167,-1.881 -4.167,-4.167c0,-2.285 1.881,-4.166 4.167,-4.166Zm-4.167,-12.5l0,-0.03c0,-2.285 1.881,-4.166 4.167,-4.166l33.333,-0c0.166,-0 0.33,0.01 0.491,0.029l16.176,-0c2.286,-0 4.167,1.881 4.167,4.167c-0,2.285 -1.881,4.166 -4.167,4.166l-50,0c-2.286,0 -4.167,-1.881 -4.167,-4.166Zm4.167,-20.863l50,0c2.286,0 4.167,1.881 4.167,4.167c-0,2.285 -1.881,4.166 -4.167,4.166l-50,0c-2.286,0 -4.167,-1.881 -4.167,-4.166c0,-2.286 1.881,-4.167 4.167,-4.167Z'
            />
        </svg>
    ),
    pause: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M9 8h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm5 0h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z'
            />
        </SVG>
    ),
    pieChart: (
        <SVG>
            <path
                className='primary'
                d='M14 13h6.78a1 1 0 0 1 .97 1.22A10 10 0 1 1 9.78 2.25a1 1 0 0 1 1.22.97V10a3 3 0 0 0 3 3z'
            />
            <path
                className='secondary'
                d='M20.78 11H14a1 1 0 0 1-1-1V3.22a1 1 0 0 1 1.22-.97c3.74.85 6.68 3.79 7.53 7.53a1 1 0 0 1-.97 1.22z'
            />
        </SVG>
    ),
    play: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M15.51 11.14a1 1 0 0 1 0 1.72l-5 3A1 1 0 0 1 9 15V9a1 1 0 0 1 1.51-.86l5 3z'
            />
        </SVG>
    ),
    refresh: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M8.52 7.11a5.98 5.98 0 0 1 8.98 2.5 1 1 0 1 1-1.83.8 4 4 0 0 0-5.7-1.86l.74.74A1 1 0 0 1 10 11H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1.7-.7l.82.81zm5.51 8.34l-.74-.74A1 1 0 0 1 14 13h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1.7.7l-.82-.81A5.98 5.98 0 0 1 6.5 14.4a1 1 0 1 1 1.83-.8 4 4 0 0 0 5.7 1.85z'
            />
        </SVG>
    ),
    remove: (
        <SVG>
            <path
                className='secondary'
                fill-rule='evenodd'
                d='M17 11a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h10z'
            />
        </SVG>
    ),
    search: (
        <SVG>
            <circle cx='10' cy='10' r='7' className='primary' />
            <path
                className='secondary'
                d='M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'
            />
        </SVG>
    ),
    survey: (
        <SVG>
            <path
                className='primary'
                d='M5 5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2zm3 7a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H8zm0 4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8z'
            />
            <path
                className='secondary'
                d='M15 4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6c0-1.1.9-2 2-2 0-1.1.9-2 2-2h2a2 2 0 0 1 2 2z'
            />
        </SVG>
    ),
    textCursor: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M12 7.35A3.99 3.99 0 0 1 15 6a1 1 0 0 1 0 2 2 2 0 0 0-2 2v4c0 1.1.9 2 2 2a1 1 0 0 1 0 2c-1.2 0-2.27-.52-3-1.35A3.99 3.99 0 0 1 9 18a1 1 0 0 1 0-2 2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2 1 1 0 1 1 0-2c1.2 0 2.27.52 3 1.35z'
            />
        </SVG>
    ),
    time: (
        <SVG>
            <circle cx='12' cy='12' r='10' className='primary' />
            <path
                className='secondary'
                d='M13 11.59l3.2 3.2a1 1 0 0 1-1.4 1.42l-3.5-3.5A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.59z'
            />
        </SVG>
    ),
    trash: (
        <SVG>
            <path
                className='primary'
                d='M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z'
            />
            <path
                className='secondary'
                d='M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z'
            />
        </SVG>
    ),
    tune: (
        <SVG>
            <path
                className='primary'
                d='M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm11 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
            />
            <path
                className='secondary'
                d='M9.73 14H17a1 1 0 0 1 0 2H9.73a2 2 0 0 0 0-2zm4.54-6a2 2 0 0 0 0 2H7a1 1 0 1 1 0-2h7.27z'
            />
        </SVG>
    ),
    uploadCloud: (
        <SVG>
            <path
                className='primary'
                d='M18 14.97c0-.76-.3-1.51-.88-2.1l-3-3a3 3 0 0 0-4.24 0l-3 3A3 3 0 0 0 6 15a4 4 0 0 1-.99-7.88 5.5 5.5 0 0 1 10.86-.82A4.49 4.49 0 0 1 22 10.5a4.5 4.5 0 0 1-4 4.47z'
            />
            <path
                className='secondary'
                d='M11 14.41V21a1 1 0 0 0 2 0v-6.59l1.3 1.3a1 1 0 0 0 1.4-1.42l-3-3a1 1 0 0 0-1.4 0l-3 3a1 1 0 0 0 1.4 1.42l1.3-1.3z'
            />
        </SVG>
    ),
    user: (
        <SVG>
            <path className='primary' d='M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z' />
            <path
                className='secondary'
                d='M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z'
            />
        </SVG>
    ),

    userCircle: (
        <SVG>
            <g>
                <path
                    className='primary'
                    d='M3.66 17.52a10 10 0 1 1 16.68 0C19.48 16.02 17.86 16 16 16H8c-1.86 0-3.48.01-4.34 1.52z'
                />
                <path
                    className='secondary'
                    d='M3.66 17.52A5 5 0 0 1 8 15h8a5 5 0 0 1 4.34 2.52 10 10 0 0 1-16.68 0zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'
                />
            </g>
        </SVG>
    ),
    viewHidden: (
        <SVG>
            <path
                className='primary'
                d='M15.1 19.34a8 8 0 0 1-8.86-1.68L1.3 12.7a1 1 0 0 1 0-1.42l2.88-2.88 2.8 2.8a5 5 0 0 0 5.73 5.73l2.4 2.4zM8.84 4.6a8 8 0 0 1 8.7 1.74l4.96 4.95a1 1 0 0 1 0 1.42l-2.78 2.78-2.87-2.87a5 5 0 0 0-5.58-5.58L8.85 4.6z'
            />
            <path
                className='secondary'
                d='M3.3 4.7l16 16a1 1 0 0 0 1.4-1.4l-16-16a1 1 0 0 0-1.4 1.4z'
            />
        </SVG>
    ),
    viewVisible: (
        <SVG>
            <path
                className='primary'
                d='M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'
            />
            <circle cx='12' cy='12' r='3' className='secondary' />
        </SVG>
    ),
    widgetAdd: (
        <SVG>
            <path
                className='primary'
                d='M5 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zm10 0h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zM5 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2z'
            />
            <path
                className='secondary'
                d='M18 6h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0V8h-2a1 1 0 0 1 0-2h2V4a1 1 0 0 1 2 0v2z'
            />
        </SVG>
    ),
};

export default icons;
