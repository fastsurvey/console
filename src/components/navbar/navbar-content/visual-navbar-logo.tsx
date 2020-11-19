import React from 'react';
import {RocketLogoLight} from 'assets';

function VisualNavbarLogo() {
    return (
        <div
            className={
                'flex flex-row items-center justify-start ' +
                'w-58 mx-3 mb-4 p-2'
            }
        >
            <div className='w-12 h-12 mr-3'>
                <img src={RocketLogoLight} alt='FastSurvey' />
            </div>
            <div className='text-2xl text-white font-weight-600'>
                FastSurvey
            </div>
        </div>
    );
}

export default VisualNavbarLogo;
