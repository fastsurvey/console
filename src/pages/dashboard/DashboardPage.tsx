import React from 'react';
import MobileNavbar from '../../components/navbar/MobileNavbar';
import Navbar from '../../components/navbar/Navbar';

interface DashBoardPageProps {
    children: React.ReactNode;
}
function DashBoardPage(props: DashBoardPageProps) {
    return (
        <React.Fragment>
            <header>
                <div id='RegularNavbar' className='hidden lg:block'>
                    <Navbar />
                </div>
                <div id='MobileNavbar' className='block lg:hidden'>
                    <MobileNavbar />
                </div>
            </header>
            <main className={'relative admin-content'}>{props.children}</main>
        </React.Fragment>
    );
}

export default DashBoardPage;
