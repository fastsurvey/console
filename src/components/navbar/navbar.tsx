import React from 'react';
import VisualRegularNavbar from './visual-regular-navbar';
import VisualMobileNavbar from './visual-mobile-navbar';
import {reduxUtils, stateTypes} from 'utilities';
import {connect} from 'react-redux';

interface Props {
    logOut(): void;
    navbarState: stateTypes.NavbarState;
    openNavbar(): void;
    closeNavbar(): void;
}
function Navbar(props: Props) {
    return (
        <React.Fragment>
            <div id='RegularNavbar' className='hidden lg:block'>
                <VisualRegularNavbar logOut={props.logOut} />
            </div>
            <div id='MobileNavbar' className='block lg:hidden'>
                <VisualMobileNavbar
                    logOut={props.logOut}
                    navbarState={props.navbarState}
                    openNavbar={props.openNavbar}
                    closeNavbar={props.closeNavbar}
                />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    navbarState: state.navbarState,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: reduxUtils.dispatchers.logOut(dispatch),
    openNavbar: reduxUtils.dispatchers.openNavbar(dispatch),
    closeNavbar: reduxUtils.dispatchers.closeNavbar(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
