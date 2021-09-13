import React from 'react';
import Logo from './logo-banner';

function MainWrapper(props: {children: React.ReactNode; className?: string}) {
    return (
        <React.Fragment>
            <header className='z-40'>
                <Logo />
            </header>
            <main
                className={`w-screen px-2 min-h-screen centering-col bg-gray-100 ${props.className}`}
            >
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default MainWrapper;
