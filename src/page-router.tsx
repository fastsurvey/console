import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {types} from '@types';

import {NotFoundPage, DashboardPage} from '@pages';
import {Login, Register, Verify} from '@pages/authentication';
import {ConfigList, EditorRouter} from '@pages/configuration';

import {LoaderOverlay, MessageQueue, Modal, MainWrapper} from '@components';

import {ResultsList} from '@pages/results';
import {AccountPage} from '@pages/account';

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
                                        <ResultsList />
                                    </Route>
                                    <Route exact path='/account'>
                                        <AccountPage />
                                    </Route>
                                </Switch>
                            </DashboardPage>
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
