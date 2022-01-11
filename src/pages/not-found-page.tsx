import React from 'react';
import {Button, MainWrapper} from '/src/components';
import Gif from '/src/assets/gifs/computer.webp';
import {useHistory} from 'react-router';

function NotFoundPage() {
    const history = useHistory();
    return (
        <MainWrapper>
            <h1
                className={
                    'flex-row-center font-weight-600 text-lg text-gray-900 dark:text-gray-100 ' +
                    'no-selection mb-3'
                }
            >
                404: Page not found
            </h1>
            <div className='w-full max-w-md mx-auto mb-5 overflow-hidden rounded-lg shadow-md'>
                <img src={Gif} className='w-full h-auto' alt='Monkey with a cash' />
            </div>
            <Button
                text='Back to Main Page'
                onClick={() => {
                    history.push('/');
                }}
            />
        </MainWrapper>
    );
}

export default NotFoundPage;
