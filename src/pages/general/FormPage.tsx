import React from 'react';
import LogoBanner from '../../components/logoBanner';

interface FormPageProps {
    children: React.ReactNode;
    image: string;
}

function FormPage(props: FormPageProps) {
    return (
        <React.Fragment>
            <LogoBanner />
            <main className='flex-col center-content w-100vw h-100vh'>
                <div className='flex-row center-content w-100vw'>
                    <div className='center-content w-35vw'>
                        <div className='w-25vw no-selection'>
                            <img src={props.image} alt='Fast Surveys' />
                        </div>
                    </div>
                    <div className='flex-col center-content w-35vw'>
                        {props.children}
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default FormPage;
