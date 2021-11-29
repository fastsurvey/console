import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {types} from '/src/types';

import {NotFoundPage, DashboardPage} from '/src/pages';
import {
    Login,
    Register,
    Verify,
    ForgotPassword,
} from '/src/pages/authentication';

import {ConfigList, EditorRouter} from '/src/pages/configuration';
import {ResultsList, SummaryRouter} from '/src/pages/results';
import {AccountPage} from '/src/pages/account';

import {MessageQueue, Modal, MainWrapper} from '/src/components';

interface RouterProps {
    loggingIn: boolean;
    loggedIn: boolean;
    account: undefined | types.Account;
}
function PageRouter(props: RouterProps) {
    return (
        <BrowserRouter>
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
                                    <Route exact path='/results/:survey_name'>
                                        <SummaryRouter />
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
                    <Route path='(/login|/register|/forgot-password)'>
                        <MainWrapper>
                            {!props.loggingIn && !props.loggedIn && (
                                <Switch>
                                    <Route exact path='/login'>
                                        <Login />
                                    </Route>
                                    <Route exact path='/register'>
                                        <Register />
                                    </Route>
                                    <Route exact path='/forgot-password'>
                                        <ForgotPassword />
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
