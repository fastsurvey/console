import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

import {ReduxState, Account} from '../utilities/types';

import LoginForm from '../pages/general/accountForms/LoginForm';
import RegisterForm from '../pages/general/accountForms/RegisterForm';
import RequestPasswordForm from '../pages/general/accountForms/RequestPasswordForm';
import SetPasswordForm from '../pages/general/accountForms/SetPasswordForm';
import VerifyForm from '../pages/general/accountForms/VerifyForm';
import VerifyWall from '../pages/general/accountForms/VerifyWall';
import FormPage from '../pages/general/FormPage';
import NotFoundPage from '../pages/general/NotFoundPage';
import DashBoardPage from '../pages/dashboard/DashboardPage';

import LoginImage from '../assets/images/secure.svg';
import VerifyImage from '../assets/images/letter.svg';
import LoaderOverlay from '../components/overlays/LoaderOverlay';
import MessageQueue from '../components/messages/MessageQueue';
import ConfigList from '../pages/dashboard/editor/ConfigList';
import ConfigEditor from '../pages/dashboard/editor/ConfigEditor';

interface RouterProps {
    loggingIn: boolean;
    loggedIn: boolean;
    account: undefined | Account;
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
                                    <FormPage image={VerifyImage}>
                                        <VerifyWall />
                                    </FormPage>
                                )}
                                {props.account?.email_verified && (
                                    <DashBoardPage>
                                        <Switch>
                                            <Route exact path='/configurations'>
                                                <ConfigList />
                                            </Route>
                                            <Route
                                                exact
                                                path='/configuration/:survey_name'
                                            >
                                                <ConfigEditor />
                                            </Route>
                                            <Route exact path='/results'>
                                                <h3>Results</h3>
                                            </Route>
                                            <Route exact path='/account'>
                                                <h3>Account</h3>
                                            </Route>
                                        </Switch>
                                    </DashBoardPage>
                                )}
                            </React.Fragment>
                        )}
                        {!props.loggingIn && !props.loggedIn && (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route path='(/login|/register)'>
                        {!props.loggingIn && !props.loggedIn && (
                            <FormPage image={LoginImage}>
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
                        <FormPage image={VerifyImage}>
                            <VerifyForm />
                        </FormPage>
                    </Route>
                    <Route path='(/request-password|/set-password)'>
                        <FormPage image={LoginImage}>
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

const mapStateToProps = (state: ReduxState) => ({
    loggingIn: state.loggingIn,
    loggedIn: state.loggedIn,
    account: state.account,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Router);
