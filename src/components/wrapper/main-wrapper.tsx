import React from 'react';
import {LogoBanner} from 'components';

interface Props {
    children: React.ReactNode;
    flexDirection: 'flex-row' | 'flex-col';
}

function MainWrapper(props: Props) {
    return (
        <React.Fragment>
            <header className='z-40'>
                <LogoBanner />
            </header>
            <main className='fixed z-0 flex-col h-100vh w-100vw center-content'>
                <div className={props.flexDirection + ' py-24 center-content'}>
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
}

export default MainWrapper;
