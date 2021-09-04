import React from 'react';
import {Link} from 'react-router-dom';
import {RocketLogo} from '@assets';

function LogoBanner(props: {slim?: boolean}) {
    return (
        <div className='fixed top-0 left-0 z-40 p-2 m-1 md:ml-5 md:p-0 md:mt-6'>
            <Link
                to='/'
                className='flex-row-left ringable p-1.5 -m-1.5 rounded'
            >
                <div className={'h-12 w-12 mr-2 no-selection'}>
                    <img src={RocketLogo} alt='FastSurvey' />
                </div>
                <div
                    className={
                        'text-gray-800 font-weight-700 text-2xl no-selection ml-2'
                    }
                >
                    FastSurvey{' '}
                    {!props.slim && (
                        <span className='hidden md:inline font-weight-500'>
                            Console
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
}

export default LogoBanner;
