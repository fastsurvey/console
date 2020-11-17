import React from 'react';
import {connect} from 'react-redux';

import stateTypes from 'utilities/types/stateTypes';
import dispatcher from 'utilities/dispatcher';

import NavbarContent from './components/NavbarContent';

interface RegularNavbarProps {
    logOut(): void;
}
function RegularNavbar(props: RegularNavbarProps) {
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

const mapStateToProps = (state: stateTypes.ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: dispatcher.logOut(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegularNavbar);
