import React from 'react';
import {connect} from 'react-redux';
import {types} from '/src/types';
import {Navbar} from '/src/components';

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
            <div className='relative'>
                <main className='relative z-0 block'>{props.children}</main>
                <footer className='absolute bottom-0 left-0 z-0 w-full flex-row-center'>
                    <div className='py-1 text-sm text-gray-400 font-weight-500'>
                        {import.meta.env.MODE === 'development' && (
                            <>development</>
                        )}
                        {import.meta.env.MODE === 'production' && (
                            <>version {import.meta.env.VITE_COMMIT_SHA}</>
                        )}
                    </div>
                </footer>
            </div>
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
