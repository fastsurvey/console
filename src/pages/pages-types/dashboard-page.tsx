import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {stateTypes, configTypes, dispatchers, fetchSurveys} from 'utilities';
import {Navbar} from 'components';
import 'styles/dashboard-page.css';

interface Props {
    children: React.ReactNode;
    modalOpen: boolean;
    loggedIn: boolean;
    oauth2_token: stateTypes.OAuth2Token | undefined;
    addConfigs(configs: configTypes.SurveyConfig[]): void;
}
function DashBoardPage(props: Props) {
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
                <Navbar />
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
    addConfigs: dispatchers.addConfigs(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
