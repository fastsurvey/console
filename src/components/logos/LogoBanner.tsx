import React from 'react';
import FastSurveyIcon from '../../assets/branding/rocket.svg';
import {Link} from 'react-router-dom';

interface LogoBannerProps {
    slim?: boolean;
}
function LogoBanner(props: LogoBannerProps) {
    return (
        <div className='fixed top-0 left-0 z-40 mt-6 ml-5'>
            <Link to='/'>
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
                        FastSurvey{' '}
                        {!props.slim && (
                            <span className='hidden text-magenta md:inline'>
                                Admin Panel
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default LogoBanner;
