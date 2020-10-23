import React from 'react';
import assert from 'assert';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import NavbarComponent from '../components/navbar';
import LoginPageComponent from '../pages/LoginPage';
import {ReduxState, Account} from '../utilities/types';
import RegisterPageComponent from '../pages/RegisterPage';
import FormPageWrapperComponent from '../pages/FormPageWrapper';
import Loader from '../components/loader';

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
    account: undefined | Account;
}
function RouterComponent(props: RouterComponentProps) {
    let verifyWall = false;
    if (props.loggedIn) {
        assert(props.account !== undefined);
        verifyWall = !props.account.email_verified;
    }

    return (
        <BrowserRouter>
            <Route>
                <Switch>
                    <Route path='(/configurations|/results|/account)'>
                        {props.loggingIn && <Loader />}
                        {!props.loggingIn && props.loggedIn && (
                            <React.Fragment>
                                {verifyWall && <Redirect to='/verify' />}
                                {!verifyWall && (
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
                            </React.Fragment>
                        )}
                        {!props.loggingIn && !props.loggedIn && (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route exact path='/verify'>
                        Please verify your account first!
                    </Route>
                    <Route path='(/login|/register)'>
                        {props.loggingIn && <Loader />}
                        {!props.loggingIn && !props.loggedIn && (
                            <FormPageWrapperComponent>
                                <Switch>
                                    <Route exact path='/login'>
                                        <LoginPageComponent />
                                    </Route>
                                    <Route exact path='/register'>
                                        <RegisterPageComponent />
                                    </Route>
                                </Switch>
                            </FormPageWrapperComponent>
                        )}
                        {!props.loggingIn && props.loggedIn && (
                            <Redirect to='/configurations' />
                        )}
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
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
