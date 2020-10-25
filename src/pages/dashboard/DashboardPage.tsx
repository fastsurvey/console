import React from 'react';
import NavbarComponent from '../../components/navbar';

interface DashBoardPageProps {
    children: React.ReactNode;
}
function DashBoardPage(props: DashBoardPageProps) {
    return (
        <main>
            <NavbarComponent>{props.children}</NavbarComponent>
        </main>
    );
}

export default DashBoardPage;
