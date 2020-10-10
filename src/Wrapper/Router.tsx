import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

interface RouterComponentProps {}

function RouterComponent(props: RouterComponentProps) {
    return (
        <BrowserRouter>
            <Route>
                <Switch>
                    <Route exact path={'/'}>
                        <div>Index</div>
                    </Route>
                    <Route exact path={'/profile'}>
                        <div>Profile</div>
                    </Route>
                    <Route>
                        <div>404</div>
                    </Route>
                </Switch>
            </Route>
        </BrowserRouter>
    );
}

export default RouterComponent;
