import React from 'react';
import '../styles/loader.scss';

const Loader = () => (
    <main className='fixed w-100vw h-100vh center-content'>
        <div className='lds-ripple'>
            <div />
            <div />
        </div>
    </main>
);

export default Loader;
