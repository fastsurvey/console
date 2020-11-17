import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

import {stateTypes} from 'utilities';

import {FormPage, NotFoundPage, DashboardPage} from 'pages';
import {
    LoginForm,
    RegisterForm,
    RequestPasswordForm,
    SetPasswordForm,
    VerifyForm,
    VerifyWall,
} from 'pages/authentication';
import {ConfigList, ConfigEditor} from 'pages/configuration';

import {LoaderOverlay, MessageQueue} from 'components';

import {SecureImage, LetterImage} from 'assets';

interface RouterProps {
    loggingIn: boolean;
    loggedIn: boolean;
    account: undefined | stateTypes.Account;
}
function Router(props: RouterProps) {
    return (
        <BrowserRouter>
            <LoaderOverlay />
            <MessageQueue />
            <Route>
                <Switch>
                    <Route exact strict path='/'>
                        <Redirect to='/login' />
                    </Route>
                    <Route path='(/configurations|/results|/account|/configuration)'>
                        {!props.loggingIn && props.loggedIn && (
                            <React.Fragment>
                                {props.account?.email_verified !== true && (
                                    <FormPage image={LetterImage}>
                                        <VerifyWall />
                                    </FormPage>
                                )}
                                {props.account?.email_verified && (
                                    <DashboardPage>
                                        <Switch>
                                            <Route exact path='/configurations'>
                                                <ConfigList />
                                            </Route>
                                            <Route
                                                exact
                                                path='/configuration/:survey_name'
                                            >
                                                <ConfigList />
                                                <ConfigEditor />
                                            </Route>
                                            <Route exact path='/results'>
                                                <h3>Results</h3>
                                            </Route>
                                            <Route exact path='/account'>
                                                <h3>Account</h3>
                                            </Route>
                                        </Switch>
                                    </DashboardPage>
                                )}
                            </React.Fragment>
                        )}
                        {!props.loggingIn && !props.loggedIn && (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route path='(/login|/register)'>
                        {!props.loggingIn && !props.loggedIn && (
                            <FormPage image={SecureImage}>
                                <Switch>
                                    <Route exact path='/login'>
                                        <LoginForm />
                                    </Route>
                                    <Route exact path='/register'>
                                        <RegisterForm />
                                    </Route>
                                </Switch>
                            </FormPage>
                        )}
                        {!props.loggingIn && props.loggedIn && (
                            <Redirect to='/configurations' />
                        )}
                    </Route>
                    <Route path='/verify'>
                        <FormPage image={LetterImage}>
                            <VerifyForm />
                        </FormPage>
                    </Route>
                    <Route path='(/request-password|/set-password)'>
                        <FormPage image={SecureImage}>
                            <Switch>
                                <Route exact path='/request-password'>
                                    <RequestPasswordForm />
                                </Route>
                                <Route exact path='/set-password'>
                                    <SetPasswordForm />
                                </Route>
                            </Switch>
                        </FormPage>
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Route>
        </BrowserRouter>
    );
}

const mapStateToProps = (state: stateTypes.ReduxState) => ({
    loggingIn: state.loggingIn,
    loggedIn: state.loggedIn,
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Router);
