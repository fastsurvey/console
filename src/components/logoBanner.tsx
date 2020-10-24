import React from 'react';
import FastSurveyIcon from '../assets/branding/rocket.svg';

function LogoBanner() {
    return (
        <div className='fixed top-0 left-0 m-4'>
            <div
                className={
                    'flex flex-row items-center justify-start ' +
                    'font-weight-600'
                }
            >
                <div className={'h-12 w-12 mr-3 no-selection'}>
                    <img src={FastSurveyIcon} alt='FastSurvey' />
                </div>
                <div className={'text-gray-700 text-2xl no-selection'}>
                    FastSurvey <span className='text-magenta'>Admin Panel</span>
                </div>
            </div>
        </div>
    );
}

export default LogoBanner;
