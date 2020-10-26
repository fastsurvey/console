import React from 'react';
import LogoBanner from '../logos/LogoBanner';

interface MainWrapperProps {
    children: React.ReactNode;
    flexDirection: 'flex-row' | 'flex-col';
}

function MainWrapper(props: MainWrapperProps) {
    return (
        <React.Fragment>
            <header>
                <LogoBanner />
            </header>
            <main className='flex-col center-content w-100vw h-100vh'>
                <div
                    className={props.flexDirection + ' center-content w-100vw'}
                >
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
}

export default MainWrapper;
