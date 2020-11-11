import React from 'react';
import {logOutAction} from '../../utilities/reduxActions';
import {connect} from 'react-redux';
import {ReduxState} from '../../utilities/types';
import NavbarContent from './components/NavbarContent';

interface RegularNavbarProps {
    logOut(): void;
}
function RegularNavbar(props: RegularNavbarProps) {
    return (
        <React.Fragment>
            <div
                className={
                    'fixed left-0 top-0 w-64 pt-4 pb-1 h-100vh bg-gray-900 flex flex-col shadow'
                }
            >
                <NavbarContent closeModal={() => {}} logOut={props.logOut} />
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state: ReduxState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    logOut: () => dispatch(logOutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegularNavbar);
