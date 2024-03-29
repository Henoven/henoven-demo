import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "./index.css"

import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'antd/dist/antd.css';

import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store = {store}>
        {/* <Router basename="/geest_back/tests/beta/app"> */}
        <Router>
            <AppRoutes/>
        </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
