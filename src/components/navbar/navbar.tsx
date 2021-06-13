import React from 'react';
import VisualRegularNavbar from './visual-regular-navbar';
import VisualMobileNavbar from './visual-mobile-navbar';
import {reduxUtils} from 'utilities';
import {connect} from 'react-redux';
import {types} from 'types';
interface Props {
    logOut(): void;
    navbarState: types.NavbarState;
    openNavbar(): void;
    closeNavbar(): void;
}
function Navbar(props: Props) {
    return (
        <React.Fragment>
            <div id='RegularNavbar' className='z-30 hidden lg:block'>
                <VisualRegularNavbar logOut={props.logOut} />
            </div>
            <div id='MobileNavbar' className='z-30 block lg:hidden'>
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

const mapStateToProps = (state: types.ReduxState) => ({
    navbarState: state.navbarState,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: reduxUtils.dispatchers.logOut(dispatch),
    openNavbar: reduxUtils.dispatchers.openNavbar(dispatch),
    closeNavbar: reduxUtils.dispatchers.closeNavbar(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
