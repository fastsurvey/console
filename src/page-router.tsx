import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

import {stateTypes} from 'utilities';

import {FormPage, NotFoundPage, DashboardPage} from 'pages';
import {
    Login,
    Register,
    RequestPassword,
    SetPassword,
    Verify,
    VerifyWall,
} from 'pages/authentication';
import {ConfigList, EditorRouter} from 'pages/configuration';

import {LoaderOverlay, MessageQueue, Modal} from 'components';

import {SecureImage, LetterImage} from 'assets';

interface RouterProps {
    loggingIn: boolean;
    loggedIn: boolean;
    account: undefined | stateTypes.Account;
}
function PageRouter(props: RouterProps) {
    return (
        <BrowserRouter>
            <LoaderOverlay />
            <MessageQueue />
            <Modal />
            <Route>
                <Switch>
                    <Route exact strict path='/'>
                        <Redirect to='/login' />
                    </Route>
                    <Route path='(/configurations|/results|/account|/configuration)'>
                        {!props.loggingIn && props.loggedIn && (
                            <React.Fragment>
                                {props.account?.verified !== true && (
                                    <FormPage image={LetterImage}>
                                        <VerifyWall />
                                    </FormPage>
                                )}
                                {props.account?.verified && (
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
                                                <EditorRouter />
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
                                        <Login />
                                    </Route>
                                    <Route exact path='/register'>
                                        <Register />
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
                            <Verify />
                        </FormPage>
                    </Route>
                    <Route path='(/request-password|/set-password)'>
                        <FormPage image={SecureImage}>
                            <Switch>
                                <Route exact path='/request-password'>
                                    <RequestPassword />
                                </Route>
                                <Route exact path='/set-password'>
                                    <SetPassword />
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
export default connect(mapStateToProps, mapDispatchToProps)(PageRouter);
