import React from 'react';
import NavbarContent from './navbar-content/navbar-content';

interface VisualRegularNavbarProps {
    logOut(): void;
}
function VisualRegularNavbar(props: VisualRegularNavbarProps) {
    return (
        <React.Fragment>
            <div
                className={
                    'no-selection fixed left-0 top-0 w-64 pt-4 pb-1 h-100vh bg-gray-900 flex flex-col shadow'
                }
            >
                <NavbarContent closeModal={() => {}} logOut={props.logOut} />
            </div>
        </React.Fragment>
    );
}

export default VisualRegularNavbar;
