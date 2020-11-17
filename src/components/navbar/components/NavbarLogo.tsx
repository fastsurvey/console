import React from 'react';

import {RocketLogoLight} from 'assets';

function LogoComponent() {
    return (
        <div
            className={
                'w-58 mx-3 flex flex-row items-center justify-start mb-4 font-weight-600 p-2'
            }
        >
            <div className={'h-12 w-12 mr-3'}>
                <img src={RocketLogoLight} alt='FastSurvey' />
            </div>
            <div className={'text-white text-2xl'}>FastSurvey</div>
        </div>
    );
}

export default LogoComponent;
