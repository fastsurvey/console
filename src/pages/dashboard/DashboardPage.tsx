import React from 'react';
import {connect} from 'react-redux';
import MobileNavbar from '../../components/navbar/MobileNavbar';
import Navbar from '../../components/navbar/RegularNavbar';
import {ReduxState} from '../../utilities/types';
import './DashboardPage.scss';

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
            <main>
                <div id='RegularContent' className={'hidden lg:block'}>
                    {props.children}
                </div>
                <div
                    id='MobileContent'
                    className={
                        'block lg:hidden ' +
                        (props.modalOpen
                            ? 'overflow-y-hidden'
                            : 'overflow-y-scroll')
                    }
                >
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    modalOpen: state.modalOpen,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
