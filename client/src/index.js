import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/main.scss'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';

render(
<Router>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</Router>, document.getElementById('app'));