import React from 'react';
import EmptyImage from '../../assets/images/empty.svg';
import LogoBanner from '../../components/logos/LogoBanner';
import TextLink from '../../components/links/TextLink';

function NotFoundPage() {
    return (
        <React.Fragment>
            <LogoBanner />
            <main className='flex-col center-content w-100vw h-100vh'>
                <div className='flex-col center-content w-100vw'>
                    <h3 className='text-center'>Oops! Nothing here ...</h3>
                    <div className='mt-12 mb-8 center-content w-35vw'>
                        <div className='w-20vw no-selection'>
                            <img src={EmptyImage} alt='Not Found' />
                        </div>
                    </div>
                    <TextLink to='/'>Return to main page</TextLink>
                </div>
            </main>
        </React.Fragment>
    );
}

export default NotFoundPage;
