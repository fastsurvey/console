import React from 'react';
import NavbarComponent from '../../components/navbar';

interface DashBoardPageProps {
    children: React.ReactNode;
}
function DashBoardPage(props: DashBoardPageProps) {
    return (
        <main>
            <NavbarComponent />
            <main className={'relative admin-content bg-red-500'}>
                {props.children}
            </main>
        </main>
    );
}

export default DashBoardPage;
