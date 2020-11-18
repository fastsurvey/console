import React from 'react';
import VisualRegularNavbar from './visual-regular-navbar';
import VisualMobileNavbar from './visual-mobile-navbar';
import {dispatchers, stateTypes} from 'utilities';
import {connect} from 'react-redux';

interface Props {
    modalOpen: boolean;
    logOut(): void;
    openModal(): void;
    closeModal(): void;
}
function Navbar(props: Props) {
    return (
        <React.Fragment>
            <div id='RegularNavbar' className='hidden lg:block'>
                <VisualRegularNavbar logOut={props.logOut} />
            </div>
            <div id='MobileNavbar' className='block lg:hidden'>
                <VisualMobileNavbar
                    modalOpen={props.modalOpen}
                    logOut={props.logOut}
                    openModal={props.openModal}
                    closeModal={props.closeModal}
                />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    modalOpen: state.modalOpen,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: dispatchers.logOut(dispatch),
    openModal: dispatchers.openModal(dispatch),
    closeModal: dispatchers.closeModal(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
