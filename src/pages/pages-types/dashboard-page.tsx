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
    accessToken: types.AccessToken | undefined;
}) {
    return (
        <React.Fragment>
            <header className='relative z-10 block'>
                <Navbar />
            </header>
            <main className='relative z-0 block'>{props.children}</main>
        </React.Fragment>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    navbarState: state.navbarState,
    loggedIn: state.loggedIn,
    accessToken: state.accessToken,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
