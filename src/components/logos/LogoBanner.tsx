import React from 'react';
import {Link} from 'react-router-dom';
import {RocketLogo} from 'assets';

interface Props {
    slim?: boolean;
}
function LogoBanner(props: Props) {
    return (
        <div className='fixed top-0 left-0 z-40 p-2 m-1 md:ml-5 md:p-0 md:mt-6'>
            <Link to='/'>
                <div
                    className={
                        'flex flex-row items-center justify-start ' +
                        'font-weight-600'
                    }
                >
                    <div className={'h-12 w-12 mr-3 no-selection'}>
                        <img src={RocketLogo} alt='FastSurvey' />
                    </div>
                    <div className={'text-gray-700 text-2xl no-selection'}>
                        FastSurvey{' '}
                        {!props.slim && (
                            <span className='hidden text-magenta md:inline'>
                                Admin Dashboard
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default LogoBanner;
