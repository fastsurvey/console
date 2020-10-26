import React from 'react';
import MainWrapper from '../../components/wrapper/MainWrapper';

interface FormPageProps {
    children: React.ReactNode;
    image: string;
}

function FormPage(props: FormPageProps) {
    return (
        <MainWrapper flexDirection='flex-row'>
            <div className='center-content w-35vw'>
                <div className='w-25vw no-selection'>
                    <img src={props.image} alt='Fast Surveys' />
                </div>
            </div>
            <div className='flex-col center-content w-35vw'>
                {props.children}
            </div>
        </MainWrapper>
    );
}

export default FormPage;
