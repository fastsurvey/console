import React from 'react';
import NavbarContent from './regular-navbar/navbar-content';

interface Props {
    logOut(): void;
}
function VisualRegularNavbar(props: Props) {
    return (
        <React.Fragment>
            <div
                className={
                    'fixed left-0 top-0 px-2 pt-3 pb-1 h-100vh group ' +
                    'bg-gray-900 flex-col-start shadow no-selection'
                }
            >
                <NavbarContent closeNavbar={() => {}} logOut={props.logOut} />
            </div>
        </React.Fragment>
    );
}

export default VisualRegularNavbar;
