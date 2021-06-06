import React from 'react';
import Logo from './logo-banner';

function MainWrapper(props: {
    children: React.ReactNode;
    flexDirection: 'flex-row' | 'flex-col';
    className?: string;
}) {
    return (
        <React.Fragment>
            <header className='z-40'>
                <Logo />
            </header>
            <main
                className={
                    'left-0 right-0 top-0 bottom-0 min-h-screen centering-row' +
                    ` ${props.className}`
                }
            >
                <div className={props.flexDirection + ' py-24 centering-row '}>
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
}

export default MainWrapper;
