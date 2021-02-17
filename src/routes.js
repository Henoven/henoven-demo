import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from "./App"

// Containers
import TeamsContainer from "./containers/TeamsContainer";
import HomeContainer from './containers/HomeContainer';
import Settings from './views/Settings/Settings';
import DeviceContainer from './containers/DeviceContainer';
import TravelContainer from './containers/TravelContainer';

const AppRoutes = () => {

    return (
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            <App>
                <Switch>
                    <Route exact path="/travels" component={TravelContainer} />
                    <Route exact path="/teams" component={TeamsContainer} />
                    <Route exact path="/devices" component={DeviceContainer} />
                    <Route exact path="/settings" component={Settings} />
                </Switch>
            </App>
        </Switch>
    );
};

export default AppRoutes;