import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {types} from 'types';

import {NotFoundPage, DashboardPage} from 'pages';
import {
    Login,
    Register,
    RequestPassword,
    SetPassword,
    Verify,
} from 'pages/authentication';
import {ConfigList, EditorRouter} from 'pages/configuration';

import {LoaderOverlay, MessageQueue, Modal} from 'components';

import MainWrapper from './components/wrapper/main-wrapper';

interface RouterProps {
    loggingIn: boolean;
    loggedIn: boolean;
    account: undefined | types.Account;
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
                        <MainWrapper>
                            {!props.loggingIn && !props.loggedIn && (
                                <Switch>
                                    <Route exact path='/login'>
                                        <Login />
                                    </Route>
                                    <Route exact path='/register'>
                                        <Register />
                                    </Route>
                                </Switch>
                            )}
                        </MainWrapper>
                        {!props.loggingIn && props.loggedIn && (
                            <Redirect to='/configurations' />
                        )}
                    </Route>
                    <Route path='/verify'>
                        <MainWrapper>
                            <Verify />
                        </MainWrapper>
                    </Route>
                    <Route path='(/request-password|/set-password)'>
                        <MainWrapper>
                            <Switch>
                                <Route exact path='/request-password'>
                                    <RequestPassword />
                                </Route>
                                <Route exact path='/set-password'>
                                    <SetPassword />
                                </Route>
                            </Switch>
                        </MainWrapper>
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Route>
        </BrowserRouter>
    );
}

const mapStateToProps = (state: types.ReduxState) => ({
    loggingIn: state.loggingIn,
    loggedIn: state.loggedIn,
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PageRouter);
