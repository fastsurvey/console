import React from 'react';
import {reduxUtils, backend} from '/src/utilities';
import {connect} from 'react-redux';
import {types} from '/src/types';
import VisualRegularNavbar from './visual-regular-navbar';
import VisualMobileNavbar from './visual-mobile-navbar';

function Navbar(props: {
    logOut(): void;
    accessToken: types.AccessToken;
    navbarState: types.NavbarState;
    openNavbar(): void;
    closeNavbar(): void;
}) {
    function handleLogout() {
        backend.logout(props.accessToken, props.logOut);
    }

    return (
        <React.Fragment>
            <div className='z-30 hidden lg:block'>
                <VisualRegularNavbar logOut={handleLogout} />
            </div>
            <div className='z-30 block lg:hidden'>
                <VisualMobileNavbar
                    logOut={handleLogout}
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
    accessToken: state.accessToken,
});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: reduxUtils.dispatchers.logOut(dispatch),
    openNavbar: reduxUtils.dispatchers.openNavbar(dispatch),
    closeNavbar: reduxUtils.dispatchers.closeNavbar(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
