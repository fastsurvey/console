import React from 'react';
import {connect} from 'react-redux';
import {types} from '@types';
import {Navbar} from '@components';

// TODO: Avoid plain css
import '@styles/dashboard-page.css';

function DashBoardPage(props: {
    children: React.ReactNode;
    navbarState: types.NavbarState;
    loggedIn: boolean;
    authToken: types.AuthToken | undefined;
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

const mapStateToProps = (state: types.ReduxState) => ({
    navbarState: state.navbarState,
    loggedIn: state.loggedIn,
    authToken: state.authToken,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
