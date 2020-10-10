import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { ReduxState } from '../utilities/types';

interface RouterComponentProps {
    fetching: boolean;
    loggedIn: boolean;
}

function RouterComponent(props: RouterComponentProps) {
    let RedirectComponent: React.ReactChild = props.fetching ? (
        <h3>Loading</h3>
    ) : (
        <Redirect to='/login' />
    );

    let LoginComponent: React.ReactChild = props.fetching ? (
        <h3>Loading</h3>
    ) : props.loggedIn ? (
        <Redirect to='/profile' />
    ) : (
        <h1>Login</h1>
    );

    return (
        <BrowserRouter>
            <Route>
                <Switch>
                    <Route exact path='/'>
                        <div>Index</div>
                    </Route>
                    <Route exact path='/profile'>
                        {!props.loggedIn && RedirectComponent}
                        {props.loggedIn && <div>Profile</div>}
                    </Route>
                    <Route exact path='/login'>
                        {LoginComponent}
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
    fetching: state.fetching,
    loggedIn: state.loggedIn,
});
const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
