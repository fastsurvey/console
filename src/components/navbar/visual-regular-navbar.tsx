import React from 'react';
import NavbarContent from './navbar-content/navbar-content';

interface Props {
    logOut(): void;
}
function VisualRegularNavbar(props: Props) {
    return (
        <React.Fragment>
            <div
                className={
                    'fixed left-0 top-0 pt-4 pb-1 h-100vh ' +
                    'lg:w-44 xl:w-54 2xl:w-64 ' +
                    'bg-gray-900 flex flex-col shadow no-selection'
                }
            >
                <NavbarContent closeModal={() => {}} logOut={props.logOut} />
            </div>
        </React.Fragment>
    );
}

export default VisualRegularNavbar;
