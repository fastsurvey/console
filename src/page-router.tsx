import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import {types} from '/src/types';

import {NotFoundPage} from '/src/pages';
import {
    Login,
    Register,
    Verify,
    RequestPasswordForm,
    SetPasswordForm,
    SurveyList,
    EditorRouter,
    ResultsRouter,
    AccountPage,
} from '/src/pages';

import {MessageQueue, Modal, MainWrapper, DashboardPage} from '/src/components';

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
                    <Route path='(/surveys|/editor|/results|/account)'>
                        {!props.loggingIn && props.loggedIn && (
                            <DashboardPage>
                                <Switch>
                                    <Route exact path='/surveys'>
                                        <SurveyList />
                                    </Route>
                                    <Route exact path='/editor/:survey_name'>
                                        <EditorRouter />
                                    </Route>
                                    <Route exact path='/results/:survey_name'>
                                        <ResultsRouter />
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
                    <Route path='(/login|/register|/request-password)'>
                        <MainWrapper>
                            {!props.loggingIn && !props.loggedIn && (
                                <Switch>
                                    <Route exact path='/login'>
                                        <Login />
                                    </Route>
                                    <Route exact path='/register'>
                                        <Register />
                                    </Route>
                                    <Route exact path='/request-password'>
                                        <RequestPasswordForm />
                                    </Route>
                                </Switch>
                            )}
                        </MainWrapper>
                        {!props.loggingIn && props.loggedIn && (
                            <Redirect to='/surveys' />
                        )}
                    </Route>
                    <Route exact path='/set-password'>
                        <MainWrapper>
                            <SetPasswordForm />
                        </MainWrapper>
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
