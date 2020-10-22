import React from 'react';
import LoginImage from '../assets/images/secure.svg';
import FastSurveyIcon from '../assets/branding/rocket.svg';

function LogoComponent() {
    return (
        <div
            className={
                'mx-3 flex flex-row items-center justify-start mb-4 font-weight-600 p-2'
            }
        >
            <div className={'h-12 w-12 mr-3'}>
                <img src={FastSurveyIcon} alt='FastSurvey' />
            </div>
            <div className={'text-gray-700 text-2xl'}>
                FastSurvey <span className='text-magenta'>Admin Panel</span>
            </div>
        </div>
    );
}

interface FormPageWrapperComponentProps {
    children: React.ReactNode;
}

function FormPageWrapperComponent(props: FormPageWrapperComponentProps) {
    return (
        <React.Fragment>
            <div className='fixed pt-4 pb-1 left top'>
                <LogoComponent />
            </div>
            <main className='flex-col center-content w-100vw h-100vh'>
                <div className='flex-row center-content w-100vw'>
                    <div className='center-content w-35vw'>
                        <div className='w-25vw'>
                            <img src={LoginImage} alt='Fast Surveys' />
                        </div>
                    </div>
                    <div className='center-content w-35vw'>
                        <div className='w-20vw'>{props.children}</div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default FormPageWrapperComponent;
