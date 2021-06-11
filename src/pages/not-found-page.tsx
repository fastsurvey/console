import React from 'react';
import {TextLink, MainWrapper} from 'components';
import EmptyImage from 'assets/images/empty.svg';

function NotFoundPage() {
    return (
        <MainWrapper>
            <h3 className='text-center'>Oops! Nothing here ...</h3>
            <div className='mt-12 mb-8 center-content w-35vw'>
                <div className='w-20vw no-selection'>
                    <img src={EmptyImage} alt='Not Found' />
                </div>
            </div>
            <TextLink to='/'>Return to main page</TextLink>
        </MainWrapper>
    );
}

export default NotFoundPage;
