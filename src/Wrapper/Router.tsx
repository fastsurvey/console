import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import NavbarComponent from '../components/navbar';
import LoginPageComponent from '../pages/LoginPage';
import {ReduxState} from '../utilities/types';

interface DashboardWrapperComponentProps {
    children: React.ReactChild;
}
function DashboardWrapperComponent(props: DashboardWrapperComponentProps) {
    return (
        <main>
            <NavbarComponent>{props.children}</NavbarComponent>
        </main>
    );
}

interface RouterComponentProps {
    loggingIn: boolean;
    loggedIn: boolean;
}
function RouterComponent(props: RouterComponentProps) {
    return (
        <BrowserRouter>
            <Route>
                <Switch>
                    <Route path='(/configurations|/results|/account)'>
                        {props.loggingIn && <h3>Loading ...</h3>}
                        {!props.loggingIn && props.loggedIn && (
                            <DashboardWrapperComponent>
                                <Switch>
                                    <Route exact path='/configurations'>
                                        <div>Configurations</div>
                                    </Route>
                                    <Route exact path='/results'>
                                        <div>Results</div>
                                    </Route>
                                    <Route exact path='/account'>
                                        <div>Account</div>
                                    </Route>
                                </Switch>
                            </DashboardWrapperComponent>
                        )}
                        {!props.loggingIn && !props.loggedIn && (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route exact path='/login'>
                        <LoginPageComponent />
                    </Route>
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </Route>
        </BrowserRouter>
    );
}

const mapStateToProps = (state: ReduxState) => ({
    loggingIn: state.loggingIn,
    loggedIn: state.loggedIn,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
