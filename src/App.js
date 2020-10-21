import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes';

const renderRoutes = () => routes.map(({ path, component }, key) => (
  <Route
    path={path}
    component={component}
    key={key}
    exact
  />
))

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
            {renderRoutes()}
            <Redirect from="/" to="/" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

