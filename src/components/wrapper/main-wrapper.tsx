import React from 'react';
import Logo from './logo-banner';

function MainWrapper(props: {children: React.ReactNode; className?: string}) {
    return (
        <React.Fragment>
            <header className='z-40'>
                <Logo />
            </header>
            <div className='relative'>
                <main
                    className={`w-screen px-2 min-h-screen centering-col bg-gray-100 ${props.className}`}
                >
                    {props.children}
                </main>
                <footer className='absolute bottom-0 left-0 z-0 w-full flex-row-center'>
                    <div className='py-1 text-sm text-gray-400 font-weight-500'>
                        {import.meta.env.MODE === 'development' && (
                            <>development</>
                        )}
                        {import.meta.env.MODE === 'production' && (
                            <>version {import.meta.env.VITE_COMMIT_SHA}</>
                        )}
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}

export default MainWrapper;
