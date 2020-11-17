import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {stateTypes, configTypes, dispatcher, fetchSurveys} from 'utilities';

import {MobileNavbar, RegularNavbar} from 'components';

import './DashboardPage.scss';

interface DashBoardPageProps {
    children: React.ReactNode;
    modalOpen: boolean;
    loggedIn: boolean;
    oauth2_token: stateTypes.OAuth2Token | undefined;
    addConfigs(configs: configTypes.SurveyConfig[]): void;
}
function DashBoardPage(props: DashBoardPageProps) {
    useEffect(() => {
        async function fetch(oauth2_token: stateTypes.OAuth2Token) {
            await fetchSurveys(
                oauth2_token,
                (configs: configTypes.SurveyConfig[]) => {
                    props.addConfigs(configs);
                },
            );
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
                    <RegularNavbar />
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

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    modalOpen: state.modalOpen,
    loggedIn: state.loggedIn,
    oauth2_token: state.oauth2_token,
});
const mapDispatchToProps = (dispatch: any) => ({
    addConfigs: dispatcher.addConfigs(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
