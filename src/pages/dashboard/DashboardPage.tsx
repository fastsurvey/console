import React from 'react';
import {connect} from 'react-redux';
import MobileNavbar from '../../components/navbar/MobileNavbar';
import Navbar from '../../components/navbar/Navbar';
import {ReduxState} from '../../utilities/types';

interface DashBoardPageProps {
    children: React.ReactNode;
    modalOpen: boolean;
}
function DashBoardPage(props: DashBoardPageProps) {
    return (
        <React.Fragment>
            <header>
                <div id='RegularNavbar' className='hidden lg:block'>
                    <Navbar />
                </div>
                <div id='MobileNavbar' className='block lg:hidden'>
                    <MobileNavbar />
                </div>
            </header>
            <main
                className={
                    'relative admin-content ' +
                    (props.modalOpen
                        ? 'overflow-y-hidden'
                        : 'overflow-y-scroll')
                }
            >
                {props.children}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    modalOpen: state.modalOpen,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
