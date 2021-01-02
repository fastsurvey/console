import React from 'react';
import {icons} from 'assets';
import NavbarContent from './navbar-content/navbar-content';
import {stateTypes} from 'utilities';

interface Props {
    logOut(): void;
    navbarState: stateTypes.NavbarState;
    openNavbar(): void;
    closeNavbar(): void;
}
function VisualMobileNavbar(props: Props) {
    return (
        <React.Fragment>
            <div
                onClick={props.closeNavbar}
                className={
                    'fixed z-40 w-full h-full overflow-y-hidden ' +
                    'bg-gray-900 transition-opacity duration-300 ' +
                    (props.navbarState.open
                        ? 'opacity-75 pointer-events-auto'
                        : 'opacity-0 pointer-events-none')
                }
            />
            <div
                onClick={props.closeNavbar}
                className={
                    'fixed top-0 right-0 z-40 w-16 h-16 p-3 m-1 ' +
                    'transition-opacity duration-300 text-white ' +
                    (props.navbarState.open
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none')
                }
            >
                {icons.close}
            </div>
            <div
                onClick={props.openNavbar}
                className={
                    'fixed top-0 left-0 z-30 w-16 h-16 p-3 m-1 ' +
                    'text-gray-900 pointer-events-auto'
                }
            >
                {icons.menu}
            </div>
            <div
                className={
                    'fixed shadow z-50 left-0 top-0 pt-4 pb-1 h-full ' +
                    'bg-gray-900 flex flex-col transition-width ' +
                    'duration-300 overflow-hidden ' +
                    (props.navbarState.open ? 'w-64' : 'w-0')
                }
            >
                <NavbarContent
                    closeNavbar={props.closeNavbar}
                    logOut={props.logOut}
                />
            </div>
        </React.Fragment>
    );
}

export default VisualMobileNavbar;
