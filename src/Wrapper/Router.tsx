import React from 'react';
import assert from 'assert';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import NavbarComponent from '../components/navbar';

import {ReduxState, Account} from '../utilities/types';

import LoginPageComponent from '../pages/LoginPage';
import RegisterPageComponent from '../pages/RegisterPage';
import VerifyPageComponent from '../pages/VerifyPage';

import VerifyWallComponent from '../pages/VerifyWall';

import FormPageWrapperComponent from '../pages/FormPageWrapper';
import LoginImage from '../assets/images/secure.svg';
import VerifyImage from '../assets/images/letter.svg';
import NotFoundPage from '../pages/NotFoundPage';
import SetPasswordPage from '../pages/forgotPassword/SetPasswordPage';

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
                        {!props.loggingIn && props.loggedIn && (
                            <React.Fragment>
                                {verifyWall && (
                                    <FormPageWrapperComponent
                                        image={VerifyImage}
                                    >
                                        <VerifyWallComponent />
                                    </FormPageWrapperComponent>
                                )}
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
                    <Route path='(/login|/register)'>
                        {!props.loggingIn && !props.loggedIn && (
                            <FormPageWrapperComponent image={LoginImage}>
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
                    <Route path='(/verify)'>
                        <FormPageWrapperComponent image={VerifyImage}>
                            <VerifyPageComponent />
                        </FormPageWrapperComponent>
                    </Route>
                    <Route path='(/request-password|/set-password)'>
                        <FormPageWrapperComponent image={LoginImage}>
                            <Switch>
                                <Route exact path='/request-password'>
                                    request password
                                </Route>
                                <Route exact path='/set-password'>
                                    <SetPasswordPage />
                                </Route>
                            </Switch>
                        </FormPageWrapperComponent>
                    </Route>
                    <Route>
                        <NotFoundPage />
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
