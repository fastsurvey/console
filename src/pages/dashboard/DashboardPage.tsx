import React from 'react';
import Navbar from '../../components/navbar/Navbar';

interface DashBoardPageProps {
    children: React.ReactNode;
}
function DashBoardPage(props: DashBoardPageProps) {
    return (
        <React.Fragment>
            <header>
                <Navbar />
            </header>
            <main className={'relative admin-content'}>{props.children}</main>
        </React.Fragment>
    );
}

export default DashBoardPage;
