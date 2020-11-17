import React from 'react';
import {connect} from 'react-redux';

import stateTypes from 'utilities/types/stateTypes';
import dispatcher from 'utilities/dispatcher';

import NavbarContent from './components/NavbarContent';

import icons from 'assets/icons/icons';

interface MobileNavbarProps {
    modalOpen: boolean;
    logOut(): void;
    openModal(): void;
    closeModal(): void;
}
function MobileNavbar(props: MobileNavbarProps) {
    return (
        <React.Fragment>
            <div
                onClick={props.closeModal}
                className={
                    'fixed z-40 w-full h-full overflow-y-hidden ' +
                    'bg-gray-900 transition-opacity duration-300 ' +
                    (props.modalOpen
                        ? 'opacity-75 pointer-events-auto'
                        : 'opacity-0 pointer-events-none')
                }
            />
            <div
                onClick={props.closeModal}
                className={
                    'fixed top-0 right-0 z-40 w-16 h-16 p-3 m-1 ' +
                    'transition-opacity duration-300 text-white ' +
                    (props.modalOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none')
                }
            >
                {icons.close}
            </div>
            <div
                onClick={props.openModal}
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
                    (props.modalOpen ? 'w-64' : 'w-0')
                }
            >
                <NavbarContent
                    closeModal={props.closeModal}
                    logOut={props.logOut}
                />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    modalOpen: state.modalOpen,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: dispatcher.logOut(dispatch),
    openModal: dispatcher.openModal(dispatch),
    closeModal: dispatcher.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MobileNavbar);
