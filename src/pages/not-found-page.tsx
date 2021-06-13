import React from 'react';
import {MainWrapper} from 'components';
import EmptyImage from 'assets/images/empty.svg';
import {Link} from 'react-router-dom';

function NotFoundPage() {
    return (
        <MainWrapper>
            <h3 className='text-center'>Oops! Nothing here ...</h3>
            <div className='mt-12 mb-8 center-content w-35vw'>
                <div className='w-20vw no-selection'>
                    <img src={EmptyImage} alt='Not Found' />
                </div>
            </div>
            <Link
                to='/'
                className={
                    'w-full text-center text-gray-500 ' +
                    'font-weight-500 no-selection cursor-pointer '
                }
            >
                Return to main page
            </Link>
        </MainWrapper>
    );
}

export default NotFoundPage;
