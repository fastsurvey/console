import React from 'react';
import EmptyImage from '../../assets/images/empty.svg';
import LogoBanner from '../../components/logoBanner';

function NotFoundPage() {
    return (
        <React.Fragment>
            <LogoBanner />
            <main className='flex-col center-content w-100vw h-100vh'>
                <div className='flex-col center-content w-100vw'>
                    <h3 className='mb-12 text-center'>
                        Oops! Nothing here ...
                    </h3>
                    <div className='center-content w-35vw'>
                        <div className='w-20vw no-selection'>
                            <img src={EmptyImage} alt='Not Found' />
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default NotFoundPage;
