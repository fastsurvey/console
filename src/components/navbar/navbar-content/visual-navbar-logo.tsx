import React from 'react';
import {RocketLogo} from 'assets';

function VisualNavbarLogo() {
    return (
        <div
            className={
                'flex flex-row items-center justify-start ' +
                'lg:w-42 xl:w-52 2xl:w-58 mx-3 mb-4 p-2'
            }
        >
            <div className='lg:w-10 lg:h-10 lg:mr-2 xl:w-11 xl:h-11 xl:mr-3 2xl:mr-3 2xl:w-12 2xl:h-12'>
                <img src={RocketLogo} alt='FastSurvey' />
            </div>
            <div className='text-gray-700 lg:text-lg xl:text-xl 2xl:text-2xl font-weight-700'>
                FastSurvey
            </div>
        </div>
    );
}

export default VisualNavbarLogo;
