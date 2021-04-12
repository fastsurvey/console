import React from 'react';
import {LogoBanner} from 'components';

interface Props {
    children: React.ReactNode;
    flexDirection: 'flex-row' | 'flex-col';
    className?: string;
}

function MainWrapper(props: Props) {
    return (
        <React.Fragment>
            <header className='z-40'>
                <LogoBanner />
            </header>
            <main
                className={
                    'left-0 right-0 top-0 bottom-0 min-h-screen center-content' +
                    ` ${props.className}`
                }
            >
                <div className={props.flexDirection + ' py-24 center-content'}>
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
}

export default MainWrapper;
