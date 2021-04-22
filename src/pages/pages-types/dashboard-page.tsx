import React from 'react';
import {connect} from 'react-redux';
import {stateTypes} from 'utilities';
import {Navbar} from 'components';
import 'styles/dashboard-page.css';

function DashBoardPage(props: {
    children: React.ReactNode;
    navbarState: stateTypes.NavbarState;
    loggedIn: boolean;
    authToken: stateTypes.AuthToken | undefined;
}) {
    return (
        <React.Fragment>
            <header>
                <Navbar />
            </header>
            <main>
                <div id='RegularContent' className={'hidden lg:block'}>
                    {props.children}
                </div>
                <div id='MobileContent' className={'block lg:hidden '}>
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    navbarState: state.navbarState,
    loggedIn: state.loggedIn,
    authToken: state.authToken,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
