import React from 'react';
import NavbarContent from './navbar-content/navbar-content';

function VisualRegularNavbar(props: {logOut(): void}) {
    return (
        <React.Fragment>
            <div
                className={
                    'fixed -left-2 top-0 pl-4 pr-2 pt-3 pb-1 h-100vh group ' +
                    'bg-gray-900 flex-col-left shadow no-selection'
                }
                data-cy='navbar'
            >
                <NavbarContent closeNavbar={() => {}} logOut={props.logOut} />
            </div>
        </React.Fragment>
    );
}

export default VisualRegularNavbar;
