import React from 'react';
import {MainWrapper} from 'components';

interface Props {
    children: React.ReactNode;
    image: string;
}
function FormPage(props: Props) {
    return (
        <MainWrapper flexDirection='flex-row' className='bg-gray-100'>
            <div
                className={
                    'hidden w-0 center-content ' +
                    'lg:block lg:w-30vw lg:mr-5vw xl:w-30vw'
                }
            >
                <div className='lg:30vw xl:w-25vw no-selection'>
                    <img src={props.image} alt='Fast Surveys' />
                </div>
            </div>
            <div
                className={
                    'flex-col w-90vw center-content ' +
                    'md:w-40vw lg:w-30vw xl:w-20vw lg:ml-5vw lg:mx-5vw'
                }
            >
                {props.children}
            </div>
        </MainWrapper>
    );
}

export default FormPage;
