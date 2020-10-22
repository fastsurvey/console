import React from 'react';
import RocketImage from '../assets/branding/rocket.svg';
import LoginImage from '../assets/images/secure.svg';

interface FormPageWrapperComponentProps {
    children: React.ReactNode;
}

function FormPageWrapperComponent(props: FormPageWrapperComponentProps) {
    return (
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
    );
}

export default FormPageWrapperComponent;
