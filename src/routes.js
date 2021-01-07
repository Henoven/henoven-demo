import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from "./App"

// Containers
import TeamsContainer from "./containers/TeamsContainer";
import HomeContainer from './containers/HomeContainer';
import Settings from './views/Settings/Settings';
import Travels from "./views/Travels/Travels";
import DeviceContainer from './containers/DeviceContainer';

const AppRoutes = () => {

    return (
        <Switch>
            <Route exact path="/" component={HomeContainer} />
            {/* <Route exact path="/redirect" component={RedirectContainer} />
            <Route exact path="/forgot/:token/:IdUser" component={ForgotContainer} /> */}
            {/* <Route exact path="/carta/:id" component={LetterContainer} /> */}
            <App>
                <Switch>
                    <Route exact path="/teams" component={TeamsContainer} />
                    <Route exact path="/travels" component={Travels} />
                    <Route exact path="/devices" component={DeviceContainer} />
                    <Route exact path="/settings" component={Settings} />
                    {/* <Route path="/pendientes" component={ToDoContainer} />
                    <Route path="/a-continuacion" exact component={ComingUpNextContainer} />
                    <Route path="/plantillas" exact component={TemplatesContainer} />
                    <Route path="/tablas" exact component={TablesContainer} />
                    <Route path="/tablas/:id/:IdTeam" component={CreateTableContainer} />
                    <Route path="/reportes" component={ReportsContainer} />
                    <Route path="/ajustes" exact component={SettingsContainer} />
                    {
                        !isProd &&
                        <Route path="/premium" exact component={PremiumContainer} />
                    }
                    {/* <Route path="/consulta" exact component={QueryContainer} /> }
                    <Route path="/equipos" exact component={TeamsContainer} />
                    <Route path="/configurador/:id/:idTeam" exact component={CreateContainer} />
                    <Route render={() => <h1>ERROR 404 Not found</h1>} /> */}
                </Switch>
            </App>
        </Switch>
    );
};

export default AppRoutes;