import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import MobileNavbar from '../../components/navbar/MobileNavbar';
import Navbar from '../../components/navbar/RegularNavbar';
import dispatcher from '../../utilities/dispatcher';
import {fetchSurveys} from '../../utilities/surveyCommunication';
import {ReduxState, SurveyConfig, OAuth2Token} from '../../utilities/types';
import './DashboardPage.scss';

interface DashBoardPageProps {
    children: React.ReactNode;
    modalOpen: boolean;
    loggedIn: boolean;
    oauth2_token: OAuth2Token | undefined;
    addConfigs(configs: SurveyConfig[]): void;
}
function DashBoardPage(props: DashBoardPageProps) {
    useEffect(() => {
        async function fetch(oauth2_token: OAuth2Token) {
            await fetchSurveys(oauth2_token, (configs: SurveyConfig[]) => {
                props.addConfigs(configs);
            });
        }
        if (props.loggedIn && props.oauth2_token !== undefined) {
            fetch(props.oauth2_token);
        }
        // eslint-disable-next-line
    }, [props.loggedIn, props.oauth2_token]);

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
    loggedIn: state.loggedIn,
    oauth2_token: state.oauth2_token,
});
const mapDispatchToProps = (dispatch: any) => ({
    addConfigs: dispatcher.addConfigs(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
